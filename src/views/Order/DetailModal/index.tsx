import React, {useEffect} from "react"
import {Dialog, TableRow, useTheme} from "@material-ui/core"
import {S} from "@/views/AddProduct/WaitListModal/style"
import DialogTitle from "@material-ui/core/DialogTitle"
import {StyleTableBox} from "@/common/style/tableBox"
import TableHead from "@material-ui/core/TableHead"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import TableBody from "@material-ui/core/TableBody"
import {useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {orderListModel} from "@/views/Order/List/model"
import styled from 'styled-components'
import {dictAllListModel} from '@/views/Dictionary/dictAllListModel'
import {OrderState} from 'ss_common/enum'

const DetailBox = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 100px minmax(200px, max-content));
  > * {
    padding: 8px;
  }
`

export const OrderProductModal = () => {
  const {actions: dictAllListActions, state: dictAllListState} = useStoreModelByType__Graphql(dictAllListModel)
  useEffect(() => {
    dictAllListActions.getDictList()
  }, [dictAllListActions])
  const theme = useTheme()
  const listModel = useStoreModelByType__Graphql(orderListModel)
  const {actions, state} = listModel
  const {open, modalData, orderStateOption} = state
  const handleClose = actions.onClose
  const {productList, orderDetail} = modalData

  return (
      <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
      >
        <DialogTitle>订单详情列表</DialogTitle>
        <S.Content>
          <DetailBox>
            {[
              ['订单号', orderDetail.number],
              ['运送方式', dictAllListState?.deliveryType?.find(value => value.code === orderDetail?.pickUpType)?.name],
              ['订单状态', orderStateOption[OrderState[orderDetail?.state ?? 0]]],
              ['地址信息', orderDetail?.userAddress?.address],
              ['信用卡信息', orderDetail.userPayCard?.number],
              ['累计达人币', orderDetail.generateCoin],
              ['运费', orderDetail.transportationCosts],
              ['优惠折扣', orderDetail.couponDiscount],
              ['达人币抵用', orderDetail.deductCoin],
              ['消费税', orderDetail.saleTax],
              ['订单总额', orderDetail.subtotal],
              ['实际支付', orderDetail.actuallyPaid],
            ].map(value => <React.Fragment key={`orderDetail_${value[0]}`}>
              <aside>{value[0]}</aside>
              <section>{value[1]}</section>
            </React.Fragment>)}
          </DetailBox>
          <StyleTableBox.Table theme={theme}>
            <TableHead>
              <TableRow>
                {['商品编号', '中文名称', '售卖价格', '购买数量']
                    .map(e => <TableCell key={`TableHead${e}`}>
                      {e}
                    </TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {productList?.map((addItem) => {
                const e = addItem
                return <TableRow
                    key={`TableBody${e?.id}`}>
                  <TableCell>{e?.number}</TableCell>
                  <TableCell>{e?.name}</TableCell>
                  <TableCell>{e?.dealPrice}</TableCell>
                  <TableCell>{e?.count}</TableCell>
                </TableRow>
              })
              }
            </TableBody>
          </StyleTableBox.Table>
          <footer>
          </footer>
        </S.Content>
      </Dialog>
  )
}
