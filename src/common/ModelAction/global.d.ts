type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

declare type HelpObj<T = any> = {
  [key: string]: T
}

declare type OriginStore = HelpObj<{
  keys: string
  state: any
  actions: HelpObj<ModelActionResult>
  setData: any[]
}>

declare type FetchObj = {
  fetchLoad: HelpObj
  fetchError: HelpObj
}

declare type ModelData<A, E extends HelpObj<ModelAction<any, A>>> = {
  state: A
  actions: E
}

declare type ModelResult<T, E extends HelpObj<ModelAction>> = {
  state: T
  actions: DealFunObj<E>
}

declare type ModelAction<T = any, A = any> = (value: T, option: ModelActionOption<A>) => any

declare type ModelActionResult<T = any> = (value: T) => any

declare type DealFunObj<T extends HelpObj<ModelAction>> =  {
  [P in keyof T]: (ModelActionResult<Parameters<T[P]>[0]>)
}

declare type GraphqlQuery = (query: string, params?: any, option?: any) => any
declare type GraphqlMutate = (mutation: string, params?: any, option?: any) => any

declare type BaseModelActionOption<T = any> = {
  data: T
  setData: Dispatch<SetStateAction<T>>
  notice: (a: any) => any
  query: GraphqlQuery
  mutate: GraphqlMutate
  store: OriginStore
}

declare type ModelActionOption<T = any> = BaseModelActionOption<T> & HelpObj
