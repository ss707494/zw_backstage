declare type ModelData<A, E> = {
  state: A
  actions: E
}

declare type GraphqlQuery = (query: string, params?: any, option?: any) => any
declare type GraphqlMutate = (mutation: string, params?: any, option?: any) => any

type ModelDispatch<A> = (value: A) => void
type ModelSetData<A> = ((prevData: A) => A)

type ModelActionOption = {
  data?: T
  setData?: any
  fetch?: any
  query?: GraphqlQuery | any
  mutate?: GraphqlMutate | any
  store?: any
  [key: string]: any
}

declare type ModelActionFun<A = any, T = any> = (value: T, setData: ModelDispatch<ModelSetData<A>>, option: ModelActionOption) => any

declare type ModelActionFunSimple<A, T = any> = {
  (value: T, prevData: A, option: ModelActionOption): A
}
declare type ModelActionObj<T = any, E = string> = {
  [key in E]: ModelActionFun<T>
}

declare type HandleAction<A> = {
  <T>(action: ModelActionFun<A, T>): ((value?: T) => any)
}

declare type ModelResult<T, E> = {
  state: T
  actions: E
  handleAction: HandleAction<T>
}
