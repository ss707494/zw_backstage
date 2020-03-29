declare module '@loadable/component';
declare var ssLog: any

declare type ParamType<T> = T extends (param: infer P) => any ? P : T;

declare interface CommonModalState {
  open
  setOpen
  modalData
  setModalData
  openClick

  [key: string]: any
}

declare interface DictType {
  id?: string
  name: string
  code: string
  sort?: number
}

declare interface DictItem {
  id: string
  name: string
  code: string
  sort: string
  dict_type_code: string
  is_disable: number
}

declare interface DataConfig {
  type?: string
  value?: object
}

declare interface ConfigFreight {
  name: string
  orderMin: number
  orderMax: number
  freightPay: number
}


declare type showConfirm = (option?: { message?: string; title?: string; open?: boolean; callBack?: (any) => any; oneButton?: boolean | number }) => any


declare interface Problem {
  problem: string
  answer: string
  sort: number
}

