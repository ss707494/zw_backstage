import React, { useState } from "react";
import { Dialog, TableRow } from "@material-ui/core";
import { S } from "@/views/AddProduct/WaitListModal/style";
import DialogTitle from "@material-ui/core/DialogTitle";
import { StyleTableBox } from "@/common/style/tableBox";
import TableHead from "@material-ui/core/TableHead";
import { CusTableCell as TableCell } from "@/component/CusTableCell";
import TableBody from "@material-ui/core/TableBody";

export const useAddProductModalInitState = () => {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => () => {
    setEditData(item)
    setOpen(true)
  }
  const handleClose = () => {
    setEditData({})
    setOpen(false)
  }
  return {
    editClick,
    open,
    setOpen,
    editData,
    setEditData,
    handleClose
  }
}

export const AddProductDetailModal = (
    {
      theme,
      open,
      editData,
      handleClose,
    }) => {

  return (
      <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={open}
          onClose={handleClose}
      >
        <DialogTitle>补货列表</DialogTitle>
        <S.Content>
          <StyleTableBox.Table theme={theme}>
            <TableHead>
              <TableRow>
                {['商品编号', '中文名称', '补货数量', '补货价格', '库存', '进货价格', '市场价格', '售卖价格', '重量']
                    .map(e => <TableCell key={`TableHead${e}`}>
                      {e}
                    </TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {editData?.addItemList?.map((addItem) => {
                const e = addItem.product
                return <TableRow
                    key={`TableBody${e?.id}`}>
                  <TableCell>{e?.number}</TableCell>
                  <TableCell>{e?.name}</TableCell>
                  <TableCell>{addItem?.count}</TableCell>
                  <TableCell>{addItem?.amount}</TableCell>
                  <TableCell>
                    {e?.stock}
                  </TableCell>
                  <TableCell>{e?.price_in}</TableCell>
                  <TableCell>{e?.price_out}</TableCell>
                  <TableCell>{e?.price_market}</TableCell>
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
