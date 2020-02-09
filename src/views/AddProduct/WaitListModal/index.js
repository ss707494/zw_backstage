import React, { useState } from "react";
import { Dialog, TableRow } from "@material-ui/core";
import { S } from "@/views/AddProduct/WaitListModal/style";
import DialogTitle from "@material-ui/core/DialogTitle";
import { StyleTableBox } from "@/common/style/tableBox";
import TableHead from "@material-ui/core/TableHead";
import { CusTableCell as TableCell } from "@/component/CusTableCell";
import TableBody from "@material-ui/core/TableBody";
import { CusButton } from "@/component/CusButton";
import { addProductGraphql } from "@/views/AddProduct/List/addProductGraphql";
import { useMutationGraphql } from "@/component/ApolloQuery";
import { pick } from "lodash";
import { showMessage } from "@/component/Message";

export const useInitState = () => {
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

export const WaitListModal = (
    {
      theme,
      open,
      editData,
      setEditData,
      handleClose,
      refreshData = () => {
      }
    }) => {

  const [saveProductSupplement, , ] = useMutationGraphql(addProductGraphql.save_product_supplement)

  const saveLoading = false
  const handleSave = async () => {
    const { save_product_supplement } = await saveProductSupplement({
      data: {
        addList: editData.waitList.map(v => ({
          ...pick(v, ['addNumber', 'addPrice']),
          product_id: v.id
        })),
      }
    })
    if (save_product_supplement.flag) {
      showMessage({ message: save_product_supplement?.msg || '操作成功' })
      handleClose()
      refreshData()
    }
  }

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
                {['商品编号', '是否拼团', '中文名称', '库存', '进货价格', '市场价格', '售卖价格', '重量']
                    .map(e => <TableCell key={`TableHead${e}`}>
                      {e}
                    </TableCell>)
                }
                <TableCell width={80}>补货数量</TableCell>
                <TableCell width={80}>补货价格</TableCell>
                <TableCell width={100}>供应商</TableCell>
                <TableCell width={100}>备注</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editData?.waitList?.map((e, i) => <TableRow
                  key={`TableBody${e?.id}`}>
                <TableCell>{e?.number}</TableCell>
                <TableCell>{e?.is_group ? '是' : '否'}</TableCell>
                <TableCell>{e?.name}</TableCell>
                <TableCell>
                  {e?.stock}
                </TableCell>
                <TableCell>{e?.price_in}</TableCell>
                <TableCell>{e?.price_out}</TableCell>
                <TableCell>{e?.price_market}</TableCell>
                <TableCell>{e?.weight}</TableCell>
                <TableCell>
                  <S.TextFieldBox
                      label=""
                      type="number"
                      value={e?.addNumber}
                      onChange={event => setEditData({
                        ...editData,
                        waitList: editData.waitList.map((waitV, waitI) => waitI !== i ? (waitV) : ({
                          ...waitV,
                          addNumber: parseFloat(event.target.value),
                        }))
                      })}
                  />
                </TableCell>
                <TableCell>
                  <S.TextFieldBox
                      label=""
                      type="number"
                      value={e?.addPrice}
                      onChange={event => {
                        return setEditData({
                          ...editData,
                          waitList: editData.waitList.map((waitV, waitI) => waitI !== i ? (waitV) : ({
                            ...waitV,
                            addPrice: parseFloat(event.target.value),
                          }))
                        });
                      }}
                  />
                </TableCell>
                <TableCell>
                  <S.TextFieldBox
                      label=""
                      value={e?.addSupplier}
                      onChange={event => {
                        return setEditData({
                          ...editData,
                          waitList: editData.waitList.map((waitV, waitI) => waitI !== i ? (waitV) : ({
                            ...waitV,
                            addSupplier: (event.target.value),
                          }))
                        });
                      }}
                  />
                </TableCell>
                <TableCell>
                  <S.TextFieldBox
                      label=""
                      value={e?.addRemark}
                      onChange={event => {
                        return setEditData({
                          ...editData,
                          waitList: editData.waitList.map((waitV, waitI) => waitI !== i ? (waitV) : ({
                            ...waitV,
                            addRemark: (event.target.value),
                          }))
                        });
                      }}
                  />
                </TableCell>
              </TableRow>)
              }
            </TableBody>
          </StyleTableBox.Table>
          <footer>
            <CusButton
                loading={saveLoading ? 1 : 0}
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleSave}
            >
              确定补货
            </CusButton>
          </footer>
        </S.Content>
      </Dialog>
  )

}
