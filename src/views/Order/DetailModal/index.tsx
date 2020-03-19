import React from "react"
import {Dialog, TableRow, useTheme} from "@material-ui/core"
import {S} from "@/views/AddProduct/WaitListModal/style"
import DialogTitle from "@material-ui/core/DialogTitle"
import {StyleTableBox} from "@/common/style/tableBox"
import TableHead from "@material-ui/core/TableHead"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import TableBody from "@material-ui/core/TableBody"
import {useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {orderListModel} from "@/views/Order/List/model"

export const OrderProductModal = () => {
  const theme = useTheme()
  const listModel = useStoreModelByType__Graphql(orderListModel)
  const {actions, state} = listModel
  const {open, modalData} = state
  const handleClose = actions.onClose
  const productList = modalData.productList

  return (
      <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
      >
        <DialogTitle>订单详情列表</DialogTitle>
        <S.Content>
          <StyleTableBox.Table theme={theme}>
            <TableHead>
              <TableRow>
                {['商品编号', '中文名称', '库存', '进货价格', '市场价格', '售卖价格', '重量']
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
                  <TableCell>
                    {e?.stock}
                  </TableCell>
                  <TableCell>{e?.priceIn}</TableCell>
                  <TableCell>{e?.priceOut}</TableCell>
                  <TableCell>{e?.priceMarket}</TableCell>
                  <TableCell>{e?.weight}</TableCell>
                </TableRow>;
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
