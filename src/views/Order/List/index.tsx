import React, {useEffect} from 'react'
import {S} from './style'
import Button from "@material-ui/core/Button"
import {StyleTableBox} from "@/common/style/tableBox"
import {PaginationByModel} from "@/component/Pagination"
import CircularProgress from "@material-ui/core/CircularProgress"
import {MenuItem, styled, TableRow, TextField, useTheme} from "@material-ui/core"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {formatDate} from "@/common/utils"
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {orderListModel} from '@/views/Order/List/model'
import {getOrderListDoc} from "@/common/graphqlTypes/graphql/doc"
import {OrderProductModal} from "@/views/Order/DetailModal"
import {KeyboardDateTimePicker} from "@material-ui/pickers"
import {CusButton} from "@/component/CusButton"

const SearchBox = styled('div')({
  display: "grid",
  gridTemplateColumns: 'repeat(3, 340px)',
  gridTemplateRows: 'min-content',
  gridGap: '16px',
})

export const OrderList = () => {
  const theme = useTheme()
  const listModel = useStoreModelByType__Graphql(orderListModel)
  const {state, actions, getLoad} = listModel
  useEffect(() => {
    actions.getList()
  }, [actions])
  const {searchParams} = state

  return (
      <StyleTableBox.Box
          // @ts-ignore
          headerColumn={1}>
        <header>
          <StyleTableBox.HeaderBox>
            <header>订单列表</header>
            <section>您可以进行管理</section>
            <main
            >
              {searchParams.startTime?.toString()}
            </main>
          </StyleTableBox.HeaderBox>
          <SearchBox>
            <KeyboardDateTimePicker
                label={'开始时间'}
                format={'yyyy/MM/dd HH:mm'}
                value={searchParams.startTime}
                onChange={(date) => actions.setSearch({
                  startTime: date,
                })}
            />
            <KeyboardDateTimePicker
                label={'结束时间'}
                format={'yyyy/MM/dd HH:mm'}
                value={searchParams.endTime}
                onChange={(date) => actions.setSearch({
                  endTime: date,
                })}
            />
            <TextField
                select
                label={'订单状态'}
                value={searchParams.state}
                onChange={(event) =>
                    actions.setSearch({
                      state: event.target?.value,
                    })}
            >
              {[['全部', 0], ['代付款', 1], ['已完成', 2]].map(value => (
                  <MenuItem key={`${value[1]}`} value={value[1]}>
                    {value[0]}
                  </MenuItem>
              ))}
            </TextField>
            <CusButton
                variant={'outlined'}
                onClick={() => actions.getList()}
            >
              搜索
            </CusButton>
          </SearchBox>
        </header>
        <main>
          {(getLoad(getOrderListDoc)) ? <S.Loading><CircularProgress/></S.Loading>
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
                  {state.list?.map(e => <TableRow key={`TableBody${e?.id}`}>
                    <TableCell>{e?.number}</TableCell>
                    <TableCell>{formatDate(new Date(e.createTime), 'yyyy/MM/dd HH:mm')}</TableCell>
                    <TableCell>{e?.state}</TableCell>
                    <TableCell>{e?.subtotal}</TableCell>
                    {/* todo */}
                    <TableCell>{0}</TableCell>
                    <TableCell>{0}</TableCell>
                    <TableCell>{ }</TableCell>
                    <TableCell>{e.user?.name}</TableCell>
                    <TableCell>{e?.userAddress?.city}</TableCell>
                    <TableCell>{e?.userAddress?.province}</TableCell>
                    <TableCell>{e?.userAddress?.zip}</TableCell>
                    <TableCell>{ }</TableCell>
                    <TableCell>{!e?.finishTime ? '' : formatDate(new Date(e?.finishTime), 'yyyy/MM/dd HH:mm')}</TableCell>
                    {/*<TableCell>{JSON.stringify(e)}</TableCell>*/}
                    <TableCell>
                      <StyleTableBox.ActionTableCell>
                        <Button
                            color="secondary"
                            onClick={() => {
                              actions.openEditClick({
                                data: {
                                  productList: e?.rOrderProduct?.map(v => ({
                                    ...v,
                                    ...v.product,
                                  })),
                                },
                              })
                              // orderProductModalOpen({
                              //   productList: e?.product
                              // })()
                            }}
                            variant="contained"
                        >详情</Button>
                      </StyleTableBox.ActionTableCell>
                    </TableCell>
                  </TableRow>)}
                </TableBody>
              </StyleTableBox.Table>
          }
          <PaginationByModel pageModel={listModel}/>
        </main>
        <OrderProductModal />
      </StyleTableBox.Box>
  )
}

export default OrderList

