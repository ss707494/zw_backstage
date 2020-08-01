import {dealDealPageModel, pickPageParam} from "@/component/Pagination"
import {productSupplementListGraphql} from "@/views/AddProduct/List/addProductGraphql"
import {fpMergePre} from "@/common/utils"
import {showMessage} from "@/component/Message"
import {productGraphql} from "@/views/Product/List/productGraphql"

export const listModel = dealDealPageModel('AddProductList', {
  listData: [],
}, {
  getList: async (value, {setData, query, data}) => {
    const res = await query(productSupplementListGraphql, {
      ...pickPageParam(data),
      ...value ?? {},
    })
    if (res) {
      const { product_supplement_list: listData, product_supplement_list_total: total } = res
      setData(fpMergePre({
        total,
        listData,
      }))
    }
  },
  getAddProductList: async (value, {query}) => {
    const res = await query(productGraphql.getList, {
      ...value,
    })
    const _waitList = res?.product_list?.filter((v: any) => v.stock < 0)
    if (!_waitList?.length) {
      showMessage({message: '暂无需要补货的商品'})
      return
    }
    return  _waitList
  }
})
