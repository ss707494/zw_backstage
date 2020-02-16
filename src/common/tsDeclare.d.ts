declare module '@loadable/component';
declare var ssLog: any

declare type ParamType<T> = T extends (param: infer P) => any ? P : T;

declare interface CommonModalState {
  open,
  setOpen,
  modalData,
  setModalData,
  openClick,

  [key: string]: any,
}

declare interface DictType {
  name: string,
  code: string,
  sort?: number,
}

declare interface DictItem {
  id: string,
  name: string,
  code: string,
  sort: string,
  dict_type_code: string,
  is_disable: number,
}

declare interface DataConfig {
  type?: string,
  value?: object,
}

declare interface ConfigFreight {
  name: string,
  orderMin: number,
  orderMax: number,
  freightPay: number,
}


declare type showConfirm = (option?: { message?: string, title?: string, open?: boolean, callBack?: (any) => any, oneButton?: boolean | number }) => any


declare interface Problem {
  problem: string,
  answer: string,
  sort: number,
}

declare type SetStateActionStore<S> = S | ((prevState: S, store?: any) => S);

type Dispatch<A> = (value: A) => void;

declare type ActionFun<T = any, E = any> = (value: E, data: T, option?: { data?: T, setData?: any, store?: any }) => any | Promise<any>

declare type GraphqlQuery = (query: string, params?: any, option?: any) => any
declare type GraphqlMutate = (mutation: string, params?: any, option?: any) => any

declare type AsyncActionFun<T = any, E = any> = (value: E, setData: Dispatch<SetStateActionStore<T>>, option: { data?: T, setData?: any, query: GraphqlQuery, mutate: GraphqlMutate, store?: any }) => any | Promise<any>

declare type ActionObj<T> = {
  [key: string]: ActionFun<T>
}

declare type AsyncActionObj<T> = {
  [key: string]: AsyncActionFun<T>
}

declare interface ContextModel<T, E extends ActionObj<T> = any, Y extends AsyncActionObj<T> = any> {
  state: T,
  actions: E,
  asyncActions: Y,
}

