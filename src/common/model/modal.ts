import {fpMerge, fpSet} from "@/common/utils"
import {modelFactory} from "@/common/ModelAction/modelUtil"

export interface ModalModel<T> {
  open: boolean
  modalData: T
}

export const modalModelFactory = <T>(name: string, initData: T) => modelFactory(`${name}_modalModelFactory`, {
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
  onClose: (value, {setData}) => setData(pre => fpMerge(fpSet(pre, 'modalData', {}), {
    modalData: initData,
    open: false,
  })),
  setModal: (value: T | any, {setData}) => setData(data => fpMerge(data, {
    modalData: value,
  })),
})
