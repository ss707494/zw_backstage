import React from "react"
import {Dialog, TableRow, useTheme} from "@material-ui/core"
import {S} from "@/views/AddProduct/WaitListModal/style"
import DialogTitle from "@material-ui/core/DialogTitle"
import {StyleTableBox} from "@/common/style/tableBox"
import TableHead from "@material-ui/core/TableHead"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import TableBody from "@material-ui/core/TableBody"
import {CusButton} from "@/component/CusButton"
import {addProductGraphql} from "@/views/AddProduct/List/addProductGraphql"
import {useStoreModel} from '@/common/ModelAction/useStore'
import {waitListModel} from '@/views/AddProduct/WaitListModal/model'

export const dealWaitItem = (item: any) => ({
  ...item.product,
  lastOutAmount: item.lastOutAmount,
  addNumber: item.count,
  addPrice: item.amount,
  addSupplier: item.supplier,
  addRemark: item.remark,
  id: item.id,
  product_id: item.product?.id,
})

export const WaitListModal = () => {
  const theme = useTheme()
  const {state, actions} = useStoreModel(waitListModel)
  const setEditData = actions.setModal
  const editData = state.modalData
  const saveLoading = state.fetchLoad[addProductGraphql.save_product_supplement]

  const handleSave = async (value: { state?: number }) => {
    if (await actions.addOneProductSupplement(value)) {
      actions.onClose({})
    }
  }

  return (
      <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={state.open}
          onClose={() => actions.onClose({})}
      >
        <DialogTitle>补货列表</DialogTitle>
        <S.Content>
          <StyleTableBox.Table theme={theme}>
            <TableHead>
              <TableRow>
                {['商品编号', '是否拼团', '中文名称', '库存', '市场价格', '售卖价格', '订单销售价格']
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
              {editData?.waitList?.map((e: any, i) => <TableRow
                  key={`TableBody${e?.id}`}>
                <TableCell>{e?.number}</TableCell>
                <TableCell>{e?.is_group ? '是' : '否'}</TableCell>
                <TableCell>{e?.name}</TableCell>
                <TableCell>{e?.stock}</TableCell>
                <TableCell>{e?.price_market}</TableCell>
                <TableCell>{e?.price_out}</TableCell>
                <TableCell>{e?.lastOutAmount}</TableCell>
                <TableCell>
                  <S.TextFieldBox
                      label=""
                      type="number"
                      disabled={actions.isFinish()}
                      value={e?.addNumber ?? ''}
                      onChange={event => setEditData({
                        ...editData,
                        waitList: editData.waitList.map((waitV: any, waitI) => waitI !== i ? (waitV) : ({
                          ...waitV,
                          addNumber: parseFloat(event.target.value),
                        }))
                      })}
                  />
                </TableCell>
                <TableCell>
                  <S.TextFieldBox
                      disabled={actions.isFinish()}
                      label=""
                      type="number"
                      value={e?.addPrice ?? ''}
                      onChange={event => {
                        return setEditData({
                          ...editData,
                          waitList: editData.waitList.map((waitV: object, waitI) => waitI !== i ? (waitV) : ({
                            ...waitV,
                            addPrice: parseFloat(event.target.value),
                          }))
                        })
                      }}
                  />
                </TableCell>
                <TableCell>
                  <S.TextFieldBox
                      disabled={actions.isFinish()}
                      label=""
                      value={e?.addSupplier ?? ''}
                      onChange={event => {
                        return setEditData({
                          ...editData,
                          waitList: editData.waitList.map((waitV: object, waitI) => waitI !== i ? (waitV) : ({
                            ...waitV,
                            addSupplier: (event.target.value),
                          }))
                        })
                      }}
                  />
                </TableCell>
                <TableCell>
                  <S.TextFieldBox
                      disabled={actions.isFinish()}
                      label=""
                      value={e?.addRemark ?? ''}
                      onChange={event => {
                        return setEditData({
                          ...editData,
                          waitList: editData.waitList.map((waitV: object, waitI) => waitI !== i ? (waitV) : ({
                            ...waitV,
                            addRemark: (event.target.value),
                          }))
                        })
                      }}
                  />
                </TableCell>
              </TableRow>)
              }
            </TableBody>
          </StyleTableBox.Table>
          <footer>
            {editData.id ? <>
              <CusButton
                  loading={saveLoading ? 1 : 0}
                  disabled={actions.isFinish()}
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => handleSave({})}
              >
                更新数量
              </CusButton>
              <CusButton
                  loading={saveLoading ? 1 : 0}
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={() => handleSave({state: actions.isFinish() ? 1 : 2})}
              >
                {actions.isFinish() ? '撤销补货' : '确定补货完成'}
              </CusButton>
            </> : <CusButton
                loading={saveLoading ? 1 : 0}
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => handleSave({})}
            >
              保存
            </CusButton>}
          </footer>
        </S.Content>
      </Dialog>
  )

}
