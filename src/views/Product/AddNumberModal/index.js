import React, { useState } from 'react'
import { S } from './style'
import DialogTitle from "@material-ui/core/DialogTitle";
import { CusTextField } from "@/component/CusTextField";
import { CusButton } from "@/component/CusButton";
import { api } from "@/common/api";
import { showMessage } from "@/component/Message";

const dealItemToForm = item => ({
  ...item
})

export const useInitState = () => {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => () => {
    const newItem = dealItemToForm(item)
    setEditData(newItem)
    setOpen(true)
  }
  return {
    editClick,
    open,
    setOpen,
    editData,
    setEditData
  }
}

export const AddNumberModal = (
    {
      open,
      setOpen,
      editData,
      setEditData,
      refreshData = () => {
      }
    }) => {
  const [updateData, , updateLoading] = api.post('/Products/UpdateCommodityType')
  const handleSave = async () => {
    const res = await updateData({
      ...editData,
    })
    if (res.result) {
      showMessage({ message: '操作成功' })
      refreshData()
      setOpen(false)
    }
  }

  return (
      <S.Box
          open={open}
          onClose={() => setOpen(false)}
          maxWidth={false}
      >
        <DialogTitle>补货</DialogTitle>
        <S.Content>
          <form>
            <CusTextField
                label="补货数量"
                value={editData.F_CTNameC}
                onChange={e => setEditData({
                  ...editData,
                  name: e.target.value
                })}
            />
            <CusTextField
                label="价格"
                value={editData.F_CTNameC}
                onChange={e => setEditData({
                  ...editData,
                  name: e.target.value
                })}
            />
            <CusButton
                loading={updateLoading ? 1 : 0}
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleSave}
            >
              保存
            </CusButton>
          </form>
        </S.Content>
      </S.Box>
  )
};

export default {
  AddNumberModal
}
