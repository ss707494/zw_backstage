import {fpMerge} from "@/common/utils"
import {modelFactory} from "@/common/ModelAction/modelUtil"

export interface ModalModel<T> {
  open: boolean
  modalData: T
}

export const modalModelFactory = <T>(initData: T) => modelFactory({
  modalData: initData,
  open: false,
  isEdit: -1,
}, {
  openClick: (value, {setData}) => {
    return setData(preData => fpMerge(preData, {
      open: true,
      modalData: value,
      isEdit: -1,
    }))
  },
  openEditClick: (value: { data: any; index: number }, {setData}) => setData(pre => fpMerge(pre, {
    open: true,
    modalData: value.data,
    isEdit: value.index,
  })),
  onClose: (value, {setData}) => setData(pre => fpMerge(pre, {
    modalData: {},
    open: false,
  })),
  setModal: (value, {setData}) => setData(data => fpMerge(data, {
    modalData: value,
  })),
})
