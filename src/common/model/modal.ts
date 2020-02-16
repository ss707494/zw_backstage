import {fpMerge} from "@/common/utils"
import {modelFactory} from "@/common/context"

export interface ModalModel<T> {
  open: boolean,
  modalData: T,
}

export const modalModelFactory = <T>(initData: T) => modelFactory({
  modalData: initData,
  open: false,
  isEdit: -1,
}, {
  openClick: (value, data) => {
    return fpMerge(data, {
      open: true,
      modalData: value,
      isEdit: -1,
    })
  },
  openEditClick: (value: {data: any, index: number}, data) => fpMerge(data, {
    open: true,
    modalData: value.data,
    isEdit: value.index,
  }),
  onClose: (value, data) => fpMerge(data, {
    modalData: {},
    open: false,
  }),
  setModal: (value, data) => fpMerge(data, {
    modalData: value,
  }),
}, {})
