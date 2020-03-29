import {mergeModel, mergeThreeModel} from "@/common/ModelAction/modelUtil"
import {pageModel} from "@/component/Pagination"
import {modalModelFactory} from "@/common/model/modal"
import {OrderInfo, OrderInput, Product, ROrderProduct} from "@/common/graphqlTypes/types"
import {getOrderListDoc, saveOrderListDoc} from "@/common/graphqlTypes/graphql/doc"
import {fpMergePre, fpSetPre} from "@/common/utils"
import {listSelectModel} from '@/common/model/listSelect'

const initSearch = {
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
  pickUpType: '',
} as Omit<OrderInput, 'rows_per_page' | 'page'>

export const orderListModel = mergeModel(mergeThreeModel(modalModelFactory('orderListModal', {
  productList: [] as (Product & ROrderProduct)[],
  orderDetail: {} as OrderInfo,
}), pageModel, listSelectModel), 'orderList', {
  searchParams: initSearch as Omit<OrderInput, 'rows_per_page' | 'page'>,
  list: [] as OrderInfo[],
  total: 0,
  orderStateOption: {} as HelpObj<string>,
  orderStateSelected: '',
  selfAddressConfig: {} as HelpObj,
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
      selfAddressConfig: res?.selfAddressConfig?.value,
    }))
  },
  clearSearch: (value, option) => option.setData(fpSetPre('searchParams', initSearch)),
  setSearch: (value: OrderInput, option) => {
    option.setData(fpMergePre({searchParams: value}))
  },
  setOrderStateSelected: (value, option) => {
    option.setData(fpMergePre({orderStateSelected: value}))
  },
  saveOrderState: async (value, option) => {
    return await option.mutate(saveOrderListDoc, option.data.selectItems.map(value1 => ({
      id: value1,
      state: (option.data.orderStateSelected),
    })))
  },
  saveOneOrderState: async (value: { id: string, state: string }, option) => {
    return await option.mutate(saveOrderListDoc, [value])
  },
})
