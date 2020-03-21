import {mergeModel, mergeTwoModel} from "@/common/ModelAction/modelUtil"
import {pageModel} from "@/component/Pagination"
import {modalModelFactory} from "@/common/model/modal"
import {OrderInfo, OrderInput, Product, ROrderProduct} from "@/common/graphqlTypes/types"
import {getOrderListDoc} from "@/common/graphqlTypes/graphql/doc"
import {fpMergePre} from "@/common/utils"

export const orderListModel = mergeModel(mergeTwoModel(modalModelFactory('orderListModal', {
  productList: [] as (Product & ROrderProduct)[],
}), pageModel), 'orderList', {
  searchParams: {
    number: '',
    startTime: null,
    endTime: null,
    address: '',
    city: '',
    district: '',
    province: '',
    state: 0,
    zip: '',
    registerName: '',
    userName: '',
    pickUpTime: null,
    pickUpType: 0,
  } as Omit<OrderInput, 'rows_per_page' | 'page'>,
  list: [] as OrderInfo[],
  total: 0,
  orderStateOption: {} as HelpObj<string>,
}, {
  getList: async (value, option) => {
    const res = await option.query(getOrderListDoc, {
      ...option.data.searchParams,
      rows_per_page: option.data.rows_per_page,
      page: option.data.page,
    })
    option.setData(fpMergePre({
      ...res?.orderList,
      orderStateOption: res?.getDataConfig?.value,
    }))
  },
  setSearch: (value: OrderInput, option) => {
    option.setData(fpMergePre({searchParams: value}))
  },
})
