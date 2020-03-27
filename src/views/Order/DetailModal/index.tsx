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
import {green, grey} from '@material-ui/core/colors'
import printJs from 'print-js'
import {CusButton} from '@/component/CusButton'
import {PrintRounded} from '@material-ui/icons'
import html2canvas from 'html2canvas'

const OrderInfo = styled('div')`
  display: grid;
  grid-template-columns: 120px max-content;
  grid-auto-rows: min-content;
  > * {
    padding: 8px;
  }
`
const SendInfo = styled(OrderInfo)`
`
const UserInfo = styled(OrderInfo)`
`
const Table = styled(StyleTableBox.Table)`
  thead tr th,
  tbody tr td {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const DetailBox = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, max-content));
  > * {
    padding: 8px;
  }
`
const TopAction = styled('div')`
  position: absolute;
  right: 30px;
  top: 30px;
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
        <DialogTitle>订单详情</DialogTitle>
        <S.Content
            id={'orderDetail'}
        >
          <TopAction
              id={'ignoreElement'}
          >
            <CusButton
                variant={'contained'}
                onClick={() => {
                  html2canvas(window.document.querySelector("#orderDetail") as HTMLElement, {
                    ignoreElements: (e) => (e.id === 'ignoreElement'),
                  }).then((canvas: any) => {
                    const dataUrl = canvas.toDataURL()
                    const imageFoo = document.createElement('img')
                    imageFoo.src = dataUrl
                    printJs({
                      printable: dataUrl,
                      type: 'image',
                    })
                  })
                }}
            >
              <PrintRounded/>
              打印</CusButton>
          </TopAction>
          <DetailBox>
            <OrderInfo>
              <aside>订单号</aside>
              <main>{orderDetail.number}</main>
              <aside>创建日期</aside>
              <main>{orderDetail.createTime}</main>
              <aside>订单状态</aside>
              <main>{orderStateOption[OrderState[orderDetail?.state ?? 0]]}</main>
            </OrderInfo>
            <SendInfo>
              <aside>{'运送方式'}</aside>
              <main>{dictAllListState?.deliveryTypeList?.find(value => value.code === orderDetail?.pickUpType)?.name}</main>
              <aside>{'运送地址'}</aside>
              <main>{orderDetail?.userAddress?.combineAddress}</main>
              <aside>{'邮编'}</aside>
              <main>{orderDetail?.userAddress?.zip}</main>
              <aside>{'电话'}</aside>
              <main>{orderDetail?.user?.userInfo?.phone}</main>
              <aside>{'邮件'}</aside>
              <main>{orderDetail?.user?.userInfo?.email}</main>
            </SendInfo>
            <UserInfo>
              <aside>{'姓名'}</aside>
              <main>{orderDetail?.user?.userInfo?.name}</main>
              <aside>{'支付方式'}</aside>
              <main>{'信用卡'}</main>
              <aside>{'支付信用卡'}</aside>
              <main>{orderDetail.userPayCard?.number}</main>
            </UserInfo>
          </DetailBox>
          <Table theme={theme}>
            <TableHead>
              <TableRow>
                {['商品编号', '中文名称', '售卖价格', '购买数量', '合计']
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
                  <TableCell>{(e?.count ?? 0) * (e?.dealPrice ?? 0)}</TableCell>
                </TableRow>
              })}
              <TableRow>
                <TableCell colSpan={3}/>
                <TableCell>产品总计</TableCell>
                <TableCell>{orderDetail.subtotal}</TableCell>
              </TableRow>
              <TableRow
                  style={{background: grey[200]}}
              >
                <TableCell>优惠名称</TableCell>
                <TableCell colSpan={3}/>
                <TableCell>折扣金额</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}/>
                <TableCell>折扣合计</TableCell>
                <TableCell>{0}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}/>
                <TableCell>达人币抵扣</TableCell>
                <TableCell>{orderDetail.deductCoin}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}/>
                <TableCell>消费税</TableCell>
                <TableCell>{orderDetail.saleTax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}/>
                <TableCell>运费</TableCell>
                <TableCell>{orderDetail.transportationCosts}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}/>
                <TableCell>实际支付</TableCell>
                <TableCell>{orderDetail.actuallyPaid}</TableCell>
              </TableRow>
              <TableRow
                  style={{background: green[100]}}
              >
                <TableCell colSpan={3}/>
                <TableCell>获得达人币</TableCell>
                <TableCell>{orderDetail.generateCoin}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <footer>
          </footer>
        </S.Content>
      </Dialog>
  )
}