import React, { useState } from 'react'
import { TablePagination } from '@material-ui/core'

export const useInitState = () => {
  const [pageData, setPageData] = useState({
    page: 0,
    pagesize: 10,
  })
  return {
    pageData,
    setPageData: data => setPageData({
      ...pageData,
      ...data
    }),
  }
}

export const Pagination = (
    {
      pageData,
      setPageData,
      count,
      refresh = () => {
      },
    }) => {

  return (
      <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          count={count}
          rowsPerPage={pageData.pagesize || 10}
          page={pageData.page || 0}
          onChangePage={(e, page) => {
            setPageData({
              page,
            })
            refresh({ page })
          }}
          onChangeRowsPerPage={e => {
            setPageData({
              rowsPerPage: e.target.value
            })
            refresh({
              rowsPerPage: e.target.value
            })
          }}
      />
  )
}
