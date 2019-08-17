import React, { useState } from 'react'
import { TablePagination } from '@material-ui/core'

export const useInitState = () => {
  const [pageData, setPageData] = useState({
    page: 0,
    rows_per_page: 10,
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
      // refresh = () => {
      // },
    }) => {

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
