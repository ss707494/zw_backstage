import React, {useState, useContext, useCallback, useEffect} from 'react'
import merge from 'lodash/merge'
import {Dispatch, SetStateAction} from "react"
import {fpMerge} from "@/common/utils"
import _ from "lodash"
import {graphQLMutate, graphQLQuery} from "@/component/ApolloQuery"

export enum ModuleEnum {
  FetchLoad = 'FetchLoad',
  FetchError = 'FetchError',
  ConfigHelpDocumentation = 'ConfigHelpDocumentation',
  Test = 'Test',
}

export const context = React.createContext<any[]>([])

export const useCustomContext: () => [any, any, Dispatch<SetStateAction<{ [key: string]: any }>>] = () => {
  const [context1, setContext, setContextOri] = useContext(context)
  return [context1, useCallback(setContext, []), setContextOri]
}

type UseStoreResult<T, E, Y> = {
  store: any,
  state: T,
  setState: Dispatch<SetStateAction<T>>,
  setContext: Dispatch<SetStateAction<any>>,
  dealStoreAction: <S>(action: ActionFun<T, S>) => ((value?: S) => any),
  dealActionAsync: <S>(asyncAction: AsyncActionFun<T, S>) => ((value?: S) => any),
  actions: E,
  asyncActions: Y,
}

const setStateBySet = (setCon: Dispatch<SetStateAction<object>>, key: ModuleEnum) => {
  return (data: any) => setCon(prevState => fpMerge(prevState, {
    store: {
      [key]: data,
    }
  }))
}
export const useGraphqlStoreByKey = (key: ModuleEnum) => {
  const [con, , setCon] = useCustomContext()
  const data = con?.store?.[ModuleEnum.FetchLoad]
  const setData = useCallback((prop, newValue) => setStateBySet(setCon, key)({
    [prop?.loc?.source?.body]: newValue
  }), [key, setCon])
  const getData = (query: any) => {
    return data?.[query?.loc?.source?.body]
  }
  return {
    data,
    setData,
    getData,
  }
}
export const useGetLoad = () => useGraphqlStoreByKey(ModuleEnum.FetchLoad)
export const useGetError = () => useGraphqlStoreByKey(ModuleEnum.FetchError)

export const useStore = <T, E extends ActionObj<T>, Y extends AsyncActionObj<T>>(key: ModuleEnum | string, newModel: ContextModel<T, E, Y>): UseStoreResult<T, E, Y> => {
  const {asyncActions, actions, state} = newModel
  const [con, , setCon] = useCustomContext()
  const {setData: setLoad} = useGetLoad()
  const {setData: setError} = useGetError()

  const setState = useCallback((data) => {
    setCon(prevState => fpMerge(prevState, {
      store: {
        [key]: _.isFunction(data) ? data(prevState?.store?.[key]) : data,
      },
    }))
  }, [key, setCon]) as Dispatch<SetStateAction<T>>

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

  const dealStoreAction = useCallback((action) => (value?: any) => {
    return setState(data => {
      return action(value, data)
    })
  }, [setState])
  const dealActionAsync = useCallback((asyncAction: AsyncActionFun) => async (value?: any) => {
    return asyncAction(value, setState, {query, mutate})
  }, [mutate, query, setState])
  useEffect(() => {
    if (!con?.store?.[key]) {
      setCon((preState: any) => (fpMerge(preState, {
        store: {
          [key]: state,
          action: {
            [key]: actions,
          }
        },
      })))
    }
  }, [con.store, key, actions, state, setCon])
  return {
    store: con?.store,
    state: con?.store?.[key] ?? state,
    setState,
    setContext: setCon,
    dealStoreAction,
    dealActionAsync,
    actions: actions,
    asyncActions: asyncActions,
  }
}

export const WrapperContext = (el: any) => {
  const [cont, setContext] = useState({})

  return (
      <context.Provider value={[cont, (data: any) => {
        return setContext((prevState => ({
          ...merge(prevState, data)
        })))
      }, setContext]}>
        {el}
      </context.Provider>
  )
}

export const dealNameSpace = (key: ModuleEnum, nameSpace: string) => {
  if (nameSpace) {
    return `${key}_${nameSpace}`
  }
  return `${key}`
}

export default {
  context,
  WrapperContext,
  useCustomContext,
}
