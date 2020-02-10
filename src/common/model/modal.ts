import {fpMerge} from "@/common/utils"

export interface ModalModel {
  open: boolean,
  modalData: any,
}

export const modalModel: ContextModel<ModalModel, {
  onClose: ActionFun,
  openClick: ActionFun<ModalModel>,
  setModal: ActionFun<ModalModel, { [key: string]: any }>,
}> = {
  state: {
    modalData: {},
    open: false,
  },
  actions: {
    openClick: (value, data) => {
      return fpMerge(data, {
        open: true,
        modalData: value,
      })
    },
    onClose: (value, data) => fpMerge(data, {
      modalData: {},
      open: false,
    }),
    setModal: (value, data) => fpMerge(data, {
      modalData: value,
    }),
  },
  asyncActions: {}
}
