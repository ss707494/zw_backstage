import React, { useState } from 'react'
import { TablePagination } from '@material-ui/core'

export const useInitState = () => {
  const [pageData, setPageData] = useState({
    Page: 0,
    FloatPageCount: 10,
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
          rowsPerPage={pageData.FloatPageCount || 10}
          page={pageData.Page || 0}
          onChangePage={(e, Page) => {
            setPageData({
              Page,
            })
            refresh({ Page })
          }}
          onChangeRowsPerPage={e => {
            setPageData({
              FloatPageCount: e.target.value
            })
            refresh({
              FloatPageCount: e.target.value
            })
          }}
      />
  )
}
