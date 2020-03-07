import {dealDealPageModel, pickPageParam} from "@/component/Pagination"
import {productSupplementListGraphql} from "@/views/AddProduct/List/addProductGraphql"
import {fpMergePre} from "@/common/utils"

export const listModel = dealDealPageModel({
  listData: []
}, {
  getList: async (value, {setData, query, data}) => {
    const res = await query(productSupplementListGraphql, pickPageParam(data))
    const { product_supplement_list: listData, product_supplement_list_total: total } = res
    setData(fpMergePre({
      total,
      listData,
    }))
    // debugger
  }
})
