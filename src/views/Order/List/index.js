import React from 'react'
import { S } from './style'

import Button from "@material-ui/core/Button";
import { StyleTableBox } from "@/common/style/tableBox";
import { useQueryGraphql } from "@/component/ApolloQuery";
import { orderGraphql } from "@/views/Order/List/orderGraphql";
import { Pagination, useInitState as useInitPageData } from "@/component/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TableRow } from "@material-ui/core";
import { CusTableCell as TableCell } from "@/component/CusTableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { formatDate } from "@/common/utils";

export const OrderList = ({ theme }) => {
  const pageState = useInitPageData()
  const [getList, { all_order_list: listData, all_order_list_total: total }, listLoad] = useQueryGraphql(orderGraphql.getListByPage)

  React.useEffect(() => {
    getList({
      data: {
        ...pageState.pageData,
      }
    })
  }, [getList, pageState.pageData])

  return (
      <StyleTableBox.Box>
        <header>
          <StyleTableBox.HeaderBox>
            <header>订单列表</header>
            <section>您可以进行管理</section>
            <main>
            </main>
          </StyleTableBox.HeaderBox>
        </header>
        <main>
          {(listLoad) ? <S.Loading><CircularProgress/></S.Loading>
              : <StyleTableBox.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    {['订单编号', '创建时间', '订单详情']
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listData?.map(e => <TableRow key={`TableBody${e?.id}`}>
                    <TableCell>{e?.number}</TableCell>
                    <TableCell>{formatDate(new Date(e?.create_time), 'yyyy/MM/dd HH:mm')}</TableCell>
                    <TableCell>
                      <StyleTableBox.ActionTableCell>
                        <Button
                            color="secondary"
                            onClick={() => {
                            }}
                            variant="contained"
                        >详情</Button>
                      </StyleTableBox.ActionTableCell>
                    </TableCell>
                  </TableRow>)}
                </TableBody>
              </StyleTableBox.Table>
          }
          <Pagination
              {...pageState}
              count={~~total}
              refresh={getList}
          />
        </main>
      </StyleTableBox.Box>
  )
}

export default OrderList

