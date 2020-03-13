import {mergeModel, mergeTwoModel} from "@/common/ModelAction/modelUtil"
import {modalModelFactory} from "@/common/model/modal"
import { gql } from "apollo-boost"
import {fpSet} from "@/common/utils"
import {pageModel} from "@/component/Pagination"

type HistoryItem = {
  id: string
  name: string
  create_time: number
  update_time: number
  is_delete: number
  supplement_id: string
  number: string
  supplier: string
  product_id: string
  count: number
  amount: number
}

const add_history_list_by_product = gql`
    query($data: AddHistoryInput){
        add_history_list_total(addHistoryInput: $data)
        add_history_list_by_product(addHistoryInput: $data) {
            id
            name
            create_time
            update_time
            is_delete
            supplement_id
            number
            supplier
            product_id
            count
            amount
        }
    }
`
export const addProductHistoryModel = mergeModel(mergeTwoModel(modalModelFactory('addModal', {
  list: [],
  id: '',
}), pageModel), 'addProductHistoryModel', {
  historyList: [] as HistoryItem[],
}, {
  getList: async (value, {setData, query}) => {
    const {add_history_list_by_product: res, add_history_list_total: total} = await query(add_history_list_by_product, {
      product_id: value.modalData.id,
      rows_per_page: value.rows_per_page,
      page: value.page,
    })
    setData(pre => fpSet(fpSet(pre, 'total', total), 'historyList', res))
  },

})
