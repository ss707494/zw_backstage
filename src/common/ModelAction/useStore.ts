import {useCallback, useEffect, useState} from "react"
import {graphQLMutate, graphQLQuery} from "@/component/ApolloQuery"
import {baseActionOption} from "@/common/ModelAction/modelUtil"

export enum ModuleEnum {
  AddProduct = 'AddProduct',
  AddProductHistory = 'AddProductHistory',
  FetchLoad = 'FetchLoad',
  FetchError = 'FetchError',
  ConfigHelpDocumentation = 'ConfigHelpDocumentation',
  ConfigThemeSelect = 'ConfigThemeSelect',
  SelectProduct = 'SelectProduct',
  Test = 'Test',
}

const originStore: OriginStore = {}

const isFunction = (functionToCheck: any) => {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

type UseModelState = <T extends FetchObj, E extends HelpObj<ModelAction<any, T>>>(key: ModuleEnum | [ModuleEnum, string], model: ModelData<T, E>) => ModelResult<T, E> & {
  store: OriginStore
}

export const dealNameSpace = (key: ModuleEnum, nameSpace: string) => {
  if (nameSpace) {
    return `${key}_${nameSpace}`
  }
  return `${key}`
}

export const useStoreModel: UseModelState = (key: ModuleEnum | [ModuleEnum, string], model) => {
  const _key = Array.isArray(key) ? dealNameSpace(key[0], key[1]) : key
  const {actions, state} = model
  const [, setState] = useState(Object.create(null))
  if (!originStore[_key]) {
    originStore[_key] = {
      keys: _key,
      state,
      actions: {},
      setData: [],
    }
  }
  const notice = useCallback((data: any) => {
    originStore[_key].setData.forEach(value => {
      value?.(data)
    })
  }, [_key])
  const setData: Dispatch<SetStateAction<& typeof state>> = useCallback((data) => {
    const oldState = originStore[_key].state
    const newData = isFunction(data) ? (data as (v: typeof oldState) => void)(oldState) : data
    originStore[_key].state = newData
    notice(newData)
  }, [_key, notice])

  const setLoad = useCallback((query: string, flag: boolean) => {
    setData(prevState => ({
      ...prevState,
      fetchLoad: {
        ...prevState.fetchLoad ?? {},
        [query]: flag,
      }
    }))
  }, [setData])
  const setError = useCallback((query: string, err: any) => {
    setData(prevState => ({
      ...prevState,
      fetchError: {
        ...prevState.fetchError ?? {},
        [query]: err,
      }
    }))
  }, [setData])

  const query: GraphqlQuery = useCallback(async (query, params, option) => {
    setLoad(query, true)
    const res = await graphQLQuery(query, params, option).catch(e => {
      setError(query, e)
    }).finally(() => {
      setLoad(query, false)
    })
    return res?.data
  }, [setError, setLoad])
  const mutate: GraphqlMutate = useCallback(async (mutation, params, option) => {
    setLoad(mutation, true)
    const res = await graphQLMutate(query, params, option).catch(e => {
      setError(mutation, e)
    }).finally(() => {
      setLoad(mutation, false)
    })
    return res?.data
  }, [query, setError, setLoad])

  // Object.keys(actions).forEach(value => {
  //   originStore[_key].actions[value] = async (v: any) => actions[value](v, {
  //     ...baseActionOption,
  //     data: originStore[_key].state,
  //     notice,
  //     setData,
  //     query,
  //     mutate,
  //     store: originStore,
  //   })
  // })

  useEffect(() => {
    Object.keys(actions).forEach(value => {
      originStore[_key].actions[value] = async (v: any) => actions[value](v, {
        ...baseActionOption,
        data: originStore[_key].state,
        notice,
        setData,
        query,
        mutate,
        store: originStore,
      })
    })
  }, [_key, actions, mutate, notice, query, setData])
  useEffect(() => {
    originStore[_key].setData = [
      ...originStore[_key].setData ?? [],
      setState,
    ]
    return () => {
      originStore[_key].setData = originStore[_key].setData.filter(value => value !== setState)
    }
  }, [_key])

  return {
    state: originStore[_key].state,
    actions: (originStore[_key].actions) as DealFunObj<typeof actions>,
    store: originStore,
  }
}
