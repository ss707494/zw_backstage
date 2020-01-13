
declare interface CommonModalState {
  open,
  setOpen,
  modalData,
  setModalData,
  openClick,
}

declare interface DictType {
  name: string,
  code: string,
}

declare interface DictItem {
  id: string,
  name: string,
  code: string,
  sort: string,
  dict_type_code: string,
  is_disable: number,

}

declare type showConfirm = (option?: { message?: string, title?: string, open?: boolean, callBack?: (any) => any, oneButton?: boolean|number }) => any
