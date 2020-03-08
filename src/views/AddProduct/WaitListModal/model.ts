import {mergeModel} from "@/common/ModelAction/modelUtil"
import {modalModelFactory} from "@/common/model/modal"
import {addProductGraphql} from "@/views/AddProduct/List/addProductGraphql"
import {pick} from "lodash"
import {showMessage} from "@/component/Message"
import {ProductSupplement} from "ss_common/enum"
import {fpMergePre} from "@/common/utils"

export const waitListModel = mergeModel(modalModelFactory('wait', {
  id: '',
  waitList: [],
  state: 1,
}), 'waitListModal', {
  refreshData: () => {},
}, {
  setRefreshCall: (value, {setData}) => setData(fpMergePre({
    refreshData: value,
  })),
  addOneProductSupplement: async (value: { state: number }, {data, mutate}) => {
    const res = await mutate(addProductGraphql.save_product_supplement, {
      addList: data.modalData.waitList.map((v: any) => ({
        ...pick(v, ['addRemark', 'addNumber', 'addPrice', 'addSupplier']),
        ...data.modalData.id ? {
          id: v.id,
          product_id: v.product_id,
        } : {
          product_id: v.id,
        },
      })),
      id: data.modalData.id,
      state: value.state ?? 1,
    })
    if (res.save_product_supplement.flag) {
      showMessage({
        message: '操作成功'
      })
      data.refreshData()
      // data.refreshData()
    }
    return res
  },
  isFinish: (value, option) => {
    return option.data.modalData.state === ProductSupplement.Finish
  },
})
