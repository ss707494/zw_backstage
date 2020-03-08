import React, { useState } from 'react'
import { TablePagination } from '@material-ui/core'
import {mergeModel, modelFactory} from "@/common/ModelAction/modelUtil"
import {fpMergePre} from "@/common/utils"

export const useInitState = () => {
  const [pageData, setPageData] = useState({
    page: 0,
    rows_per_page: 10,
  })
  return {
    pageData,
    setPageData: (data: any) => setPageData({
      ...pageData,
      ...data
    }),
  }
}

export type PageType = {
  page: number
  rows_per_page: number
}

type PageModelResult = ModelResult<{
  total: number
  [key: string]: any
} & PageType | any, {
  getList: ModelActionResult
  setPageData: ModelActionResult
  [key: string]: any
}>

export const pageModel = modelFactory('pageModel', {
  page: 0,
  rows_per_page: 10,
  total: 0,
}, {
  setPageData: (value: {
    page?: number,
    rows_per_page?: number,
  }, {setData}  ) => {
    setData(fpMergePre({
      ...value,
    }))
  }
})

export const pickPageParam = (model: PageType) => ({
  page: model.page,
  rows_per_page: model.rows_per_page,
})

type PageModelState = typeof pageModel.state

export const dealDealPageModel = <A, E extends { getList: ModelAction<any, A & PageModelState> } & {[key: string]: ModelAction<any, A & PageModelState>}>(name: string, state: A, actions: E) => {
  return mergeModel(pageModel, name, state, actions)
}

// dealDealPageModel({
//   ss: ''
// }, {
//   getList: (value, option) => {}
// }).state.ss

export const PaginationByModel = ({pageModel}: {pageModel: PageModelResult}) => {
  const {state, actions} = pageModel

  return (
      <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={state.total}
          rowsPerPage={state.rows_per_page || 10}
          page={state.page || 0}
          onChangePage={(e, page) => {
            actions.setPageData({page})
            actions.getList(pageModel.state)
          }}
          onChangeRowsPerPage={e => {
            actions.setPageData({
              page: 0,
              rows_per_page: e.target.value
            })
            actions.getList(pageModel.state)
          }}
      />
  )
}

export const Pagination = (
    {
      pageData,
      setPageData,
      count,
      // refresh = () => {
      // },
    }: any) => {

  return (
      <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={count}
          rowsPerPage={pageData.rows_per_page || 10}
          page={pageData.page || 0}
          onChangePage={(e, page) => {
            setPageData({
              page,
            })
            // refresh({ Page })
          }}
          onChangeRowsPerPage={e => {
            setPageData({
              rows_per_page: e.target.value
            })
            // refresh({
            //   FloatPageCount: e.target.value
            // })
          }}
      />
  )
}
