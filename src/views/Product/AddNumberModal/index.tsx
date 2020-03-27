import React, {useEffect} from 'react'
import {addProductHistoryModel} from "@/views/Product/model/addProductHistory"
import {Dialog, DialogContent, DialogTitle, Table, TableBody, TableHead, TableRow} from "@material-ui/core"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import {PaginationByModel} from '@/component/Pagination'
import {formatDate} from "@/common/utils"
import {useStoreModel} from "@/common/ModelAction/useStore"

export const AddNumberModal = () => {
  const addNumberModal = useStoreModel(addProductHistoryModel)
  const {state: {open, modalData, historyList}, actions} = addNumberModal
  const {getList} = actions
  // ssLog(historyList)
  useEffect(() => {
    if (open) {
      (getList)({
        page: addProductHistoryModel.state.page,
        rows_per_page: addProductHistoryModel.state.rows_per_page,
        modalData: {
          id: modalData?.id,
        }
      })
    }
  }, [getList, modalData.id, open])

  return (
      <Dialog
          open={open}
          onClose={() => actions.onClose({})}
          maxWidth={"lg"}
          fullWidth
      >
        <DialogTitle>补货历史</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                {['补货日期', '补货时销售价格', '补货单号', '补货数量', '补货单价']
                    .map(e => <TableCell key={`TableHead${e}`}>
                      {e}
                    </TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {historyList.map(value => <TableRow key={`historyList${value.id}`}>
                <TableCell>{formatDate(new Date(value.create_time), 'yyyy/MM/dd HH:mm')}</TableCell>
                <TableCell>{value.lastOutAmount}</TableCell>
                <TableCell>{value.number}</TableCell>
                <TableCell>{value.count}</TableCell>
                <TableCell>{value.amount}</TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
          <PaginationByModel
              pageModel={addNumberModal}
          />
        </DialogContent>
      </Dialog>
  )
}

export default {
  AddNumberModal
}
