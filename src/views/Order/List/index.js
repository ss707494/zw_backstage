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
import { useOrderProductModalInitState, OrderProductModal } from "@/views/Order/DetailModal";

export const OrderList = ({ theme }) => {
  const pageState = useInitPageData()
  const orderProductModalState = useOrderProductModalInitState()
  const { editClick: orderProductModalOpen } = orderProductModalState
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
                    {['订单编号', '创建时间', '订单状态', '金额', '抵扣达人币', '新增达人币', '注册id', '用户名', '城市', '州', '邮政编码', '取货方式', '取货日期', '订单详情']
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
                    <TableCell>{e?.state}</TableCell>
                    <TableCell>{e?.subtotal}</TableCell>
                    {/* todo */}
                    <TableCell>{0}</TableCell>
                    <TableCell>{0}</TableCell>
                    <TableCell>{ }</TableCell>
                    <TableCell>{e?.user?.name}</TableCell>
                    <TableCell>{e?.address?.city}</TableCell>
                    <TableCell>{e?.address?.province}</TableCell>
                    <TableCell>{e?.address?.zip}</TableCell>
                    <TableCell>{ }</TableCell>
                    <TableCell>{!e?.finish_time ? '' : formatDate(new Date(e?.finish_time), 'yyyy/MM/dd HH:mm')}</TableCell>
                    {/*<TableCell>{JSON.stringify(e)}</TableCell>*/}
                    <TableCell>
                      <StyleTableBox.ActionTableCell>
                        <Button
                            color="secondary"
                            onClick={() => {
                              orderProductModalOpen({
                                productList: e?.product
                              })()
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
        <OrderProductModal
            theme={theme}
            {...orderProductModalState}
        />
      </StyleTableBox.Box>
  )
}

export default OrderList

