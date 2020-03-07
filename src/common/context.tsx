import React, {useState, useContext, useCallback, SetStateAction, Dispatch} from 'react'
import {fpMerge} from "@/common/utils"

export const context = React.createContext<any[]>([])

export const useCustomContext: () => [any, any, Dispatch<SetStateAction<{ [key: string]: any }>>] = () => {
  const [context1, setContext, setContextOri] = useContext(context)
  return [context1, useCallback(setContext, []), setContextOri]
}

// type SetStateActionStore<S> = S | ((prevState: S, store?: any) => S);
//
// type UseStoreResult<T, E> = {
//   store: any
//   setState: ModelDispatch<SetStateActionStore<T>>
//   setContext: ModelDispatch<SetStateAction<any>>
// } & ModelResult<T, E>
//
// const setStateBySet = (setCon: ModelDispatch<SetStateAction<object>>, key: ModuleEnum) => {
//   return (data: any) => setCon(prevState => fpSet(prevState, ['store', key, 'state'], data))
// }
// export const useGraphqlStoreByKey = (key: ModuleEnum) => {
//   const [con, , setCon] = useCustomContext()
//   const data = con?.store?.[ModuleEnum.FetchLoad]
//   const setData = useCallback((prop, newValue) => setStateBySet(setCon, key)({
//     [prop?.loc?.source?.body]: newValue
//   }), [key, setCon])
//   const getData = (query: any) => {
//     return data?.[query?.loc?.source?.body]
//   }
//   return {
//     data,
//     setData,
//     getData,
//   }
// }
// export const useGetLoad = () => useGraphqlStoreByKey(ModuleEnum.FetchLoad)
// export const useGetError = () => useGraphqlStoreByKey(ModuleEnum.FetchError)
//
// export const dealNameSpace = (key: ModuleEnum, nameSpace: string) => {
//   if (nameSpace) {
//     return `${key}_${nameSpace}`
//   }
//   return `${key}`
// }
//
// export const useStore = <T, E, B extends keyof E>(key: ModuleEnum | string | [ModuleEnum, string], newModel: {
//   state: T
//   actions: E
// }): UseStoreResult<T, E> => {
//   const {actions, state} = newModel
//   const [con, , setCon] = useCustomContext()
//   const {setData: setLoad} = useGetLoad()
//   const {setData: setError} = useGetError()
//   const _key = Array.isArray(key) ? dealNameSpace(key[0], key[1]) : key
//
//   const setState = useCallback((data) => {
//     setCon(prevState => fpSet(prevState, ['store', _key, 'state'], _.isFunction(data) ? data(prevState?.store?.[_key]?.state as T, prevState?.store) : data))
//   }, [_key, setCon]) as ModelDispatch<SetStateActionStore<T>>
//
//   const query: GraphqlQuery = useCallback(async (query, params, option) => {
//     setLoad(query, true)
//     const res = await graphQLQuery(query, params, option).catch(e => {
//       setError(query, e)
//     }).finally(() => {
//       setLoad(query, false)
//     })
//     return res?.data
//   }, [setError, setLoad])
//   const mutate: GraphqlMutate = useCallback(async (mutation, params, option) => {
//     setLoad(mutation, true)
//     const res = await graphQLMutate(query, params, option).catch(e => {
//       setError(mutation, e)
//     }).finally(() => {
//       setLoad(mutation, false)
//     })
//     return res?.data
//   }, [query, setError, setLoad])
//
//   const handleAction = useCallback((action) => async (value?: any) => {
//     return action(value, setState, {query, mutate})
//   }, [mutate, query, setState])
//
//   useEffect(() => {
//     if (!con?.store?.[_key]) {
//       setCon((preState: any) => (fpSet(preState, ['store', _key], {
//         store: con?.store,
//         state: con?.store?.[_key]?.state ?? state,
//         setState,
//         setContext: setCon,
//         handleAction,
//         actions: actions,
//       })))
//     }
//   }, [_key, actions, con.store, setCon, setState, state, handleAction])
//   return {
//     store: con?.store,
//     state: con?.store?.[_key]?.state ?? state,
//     setState,
//     setContext: setCon,
//     handleAction,
//     actions: actions,
//   }
// }

export const WrapperContext = (el: any) => {
  const [cont, setContext] = useState({})

  return (
      <context.Provider value={[cont, (data: any) => {
        return setContext((prevState => ({
          ...fpMerge(prevState, data)
        })))
      }, setContext]}>
        {el}
      </context.Provider>
  )
}

export default {
  context,
  WrapperContext,
  useCustomContext,
}
