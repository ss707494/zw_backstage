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
import {KeyboardDatePicker, KeyboardDateTimePicker} from "@material-ui/pickers"
import {CusButton} from "@/component/CusButton"
import {OrderState, orderStateKeys} from 'ss_common/enum'

const SearchBox = styled('div')({
  display: "grid",
  gridTemplateColumns: 'repeat(4, 300px)',
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
                onChange={(event) => {
                  actions.setSearch({
                    state: event.target.value,
                  })
                }}
            >
              <MenuItem
                  value={0}>
                全部
              </MenuItem>
              {orderStateKeys.map(value => (
                  <MenuItem
                      key={`orderStateKeys_${value}`}
                      // @ts-ignore
                      value={OrderState[value]}>
                    {state.orderStateOption[value]}
                  </MenuItem>
              ))}
            </TextField>
            <div/>
            <TextField
                label="订单号"
                value={searchParams.number}
                onChange={(event) => {
                  actions.setSearch({
                    number: event.target.value,
                  })
                }}
            />
            <TextField
                label="注册id"
                value={searchParams.registerName}
                onChange={(event) => {
                  actions.setSearch({
                    registerName: event.target.value,
                  })
                }}
            />
            <TextField
                label="客户名称"
                value={searchParams.userName}
                onChange={(event) => {
                  actions.setSearch({
                    userName: event.target.value,
                  })
                }}
            />
            <KeyboardDatePicker
                label={'取货日期'}
                format={'yyyy/MM/dd'}
                value={searchParams.pickUpTime}
                onChange={(date) => actions.setSearch({
                  pickUpTime: date,
                })}
            />
            <TextField
                label="城市"
                value={searchParams.city}
                onChange={(event) => {
                  actions.setSearch({
                    city: event.target.value,
                  })
                }}
            />
            <TextField
                label="州"
                value={searchParams.province}
                onChange={(event) => {
                  actions.setSearch({
                    province: event.target.value,
                  })
                }}
            />
            <TextField
                label="邮政编码"
                value={searchParams.zip}
                onChange={(event) => {
                  actions.setSearch({
                    zip: event.target.value,
                  })
                }}
            />
            <TextField
                select
                label="取货方式"
                value={searchParams.pickUpType}
                onChange={(event) => {
                  actions.setSearch({
                    pickUpType: event.target.value,
                  })
                }}
            >
              <MenuItem
                  value={0}>
                全部
              </MenuItem>
              {[[1, '自提'], [2, '配送']].map(value => (
                  <MenuItem
                      key={`orderStateKeys_${value[1]}`}
                      value={value[0]}>
                    {value[1]}
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
                    <TableCell>
                      {state.orderStateOption[OrderState?.[e?.state ?? 1]]}
                    </TableCell>
                    <TableCell>{e?.subtotal}</TableCell>
                    {/* todo */}
                    <TableCell>{0}</TableCell>
                    <TableCell>{0}</TableCell>
                    <TableCell>{}</TableCell>
                    <TableCell>{e.user?.name}</TableCell>
                    <TableCell>{e?.userAddress?.city}</TableCell>
                    <TableCell>{e?.userAddress?.province}</TableCell>
                    <TableCell>{e?.userAddress?.zip}</TableCell>
                    <TableCell>{}</TableCell>
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
        <OrderProductModal/>
      </StyleTableBox.Box>
  )
}

export default OrderList

