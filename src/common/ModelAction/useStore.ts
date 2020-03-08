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

type StoreStateResult<T, E extends ModelActionObjHelp<any, T>> = ModelResult<T, E> & {
  store: OriginStore
  getLoad: (query: any) => number
}

type UseModelState = <T extends FetchObj, E extends ModelActionObjHelp<any, T>>(model: ModelData<T, E>, key?: ModuleEnum | [ModuleEnum, string]) => StoreStateResult<T, E>

export const dealNameSpace = (key: ModuleEnum, nameSpace: string) => {
  if (nameSpace) {
    return `${key}_${nameSpace}`
  }
  return `${key}`
}

export const useStoreModel: UseModelState = (model, key?: ModuleEnum | [ModuleEnum, string]) => {
  const _key = model.name ?? (!key ? '' : Array.isArray(key) ? dealNameSpace(key[0], key[1]) : key)
  const {actions, state} = model
  const [, setState] = useState(Object.create(null))
  if (!_key) {
    throw Error('no key')
  }
  if (!originStore[_key]) {
    originStore[_key] = {
      keys: _key,
      state,
      actions: {},
      setData: []
    }
  }
  const notice = useCallback((data: any) => {
    originStore[_key].setData.forEach(value => {
      value?.(data)
    })
  }, [_key])
  const setData: Dispatch<SetStateAction<typeof state>> = useCallback((data) => {
    const oldState = originStore[_key].state
    const newData = isFunction(data) ? (data as (v: typeof oldState) => void)(oldState) : data
    originStore[_key].state = newData
    notice(newData)
  }, [_key, notice])

  const setLoad = useCallback((query: any, flag: boolean) => {
    setData(prevState => ({
      ...prevState,
      fetchLoad: {
        ...prevState.fetchLoad ?? {},
        [query?.loc?.source?.body]: flag,
      }
    }))
  }, [setData])
  const setError = useCallback((query: any, err: any) => {
    setData(prevState => ({
      ...prevState,
      fetchError: {
        ...prevState.fetchError ?? {},
        [query?.loc?.source?.body]: err,
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
    const res = await graphQLMutate(mutation, params, option).catch(e => {
      setError(mutation, e)
    }).finally(() => {
      setLoad(mutation, false)
    })
    return res?.data
  }, [setError, setLoad])

  if (Object.keys(originStore[_key].actions).length === 0 && originStore[_key].actions.constructor === Object) {
    Object.keys(actions).forEach(value => {
      originStore[_key].actions[value] = (v: any) => actions[value](v, {
        ...baseActionOption,
        data: originStore[_key].state,
        notice,
        setData,
        query,
        mutate,
        store: originStore,
      })
    })
  }
  useEffect(() => {
    Object.keys(actions).forEach(value => {
      originStore[_key].actions[value] = (v: any) => actions[value](v, {
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
    getLoad: query => originStore[_key].state.fetchLoad[query?.loc?.source?.body] ? 1 : 0
  }
}
