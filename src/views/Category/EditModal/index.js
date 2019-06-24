import React, { useState } from 'react'
import { S } from './style'
import DialogTitle from "@material-ui/core/DialogTitle";
import { CusTextField } from "@/component/CusTextField";
import { CusSelectField } from "@/component/CusSelectField";
import MenuItem from "@material-ui/core/MenuItem";
import { CusButton } from "@/component/CusButton";
import { api } from "@/common/api";
import { showMessage } from "@/component/Message";

const useLinkage = () => {
  const [data, setData] = useState({
    oneCode: '',
    twoCode: '',
  })
  const [getOne, { data: one = [] }] = api.post('/Products/QueryCommodityTypeChildren')
  const [getTwo, { data: two = [] }] = api.post('/Products/QueryCommodityTypeChildren')
  React.useEffect(() => {
    getOne()
  }, [getOne])
  React.useEffect(() => {
    setData(pre => ({
      ...pre,
      twoCode: ''
    }))
    getTwo()
  }, [data.oneCode, getTwo])
  return [{...data,  one, two }, setData]
}

export const useInitState = () => {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => () => {
    setEditData(item)
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

export const EditModal = (
    {
      open,
      setOpen,
      editData,
      setEditData,
      refreshData = () => {
      }
    }) => {
  const [{ oneCode, twoCode, one, two }, setLinkData] = useLinkage()
  const [updateData, , updateLoading] = api.post('/Products/UpdateCommodityType')
  const handleSave = async () => {
    const res = await updateData(editData)
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
        <DialogTitle>编辑产品类别</DialogTitle>
        <S.Content>
          <form>
            <CusTextField
                label="中文名称"
                value={editData.name || ''}
                onChange={e => setEditData({
                  ...editData,
                  name: window.ssLog(e.target.value)
                })}
            />
            <CusSelectField
                label="产品类别"
                placeholder="选择类别"
                value={oneCode}
                onChange={e => setLinkData(pre => ({
                  ...pre,
                  oneCode: e.target.value
                }))}
            >
              {one.map(e => (
                  <MenuItem
                      key={`typeOptionOne${e.F_CTID}`}
                      value={e.F_CTID}
                  >{e.F_CTNameC}</MenuItem>
              ))}
            </CusSelectField>
            <CusSelectField
                label=""
                placeholder="选择类别"
                value={twoCode}
                onChange={e => setLinkData(pre => ({
                  ...pre,
                  twoCode: e.target.value
                }))}
            >
              {two.map(e => (
                  <MenuItem
                      key={`typeOptionOne${e.F_CTID}`}
                      value={e.F_CTID}
                  >{e.F_CTNameC}</MenuItem>
              ))}
            </CusSelectField>
            <CusButton
                loadingsdf={updateLoading ? 1 : 0}
                color="primary"
                variant="contained"
                fullWidth
                onClick={handleSave}
            >
              保存{twoCode}
            </CusButton>
          </form>
        </S.Content>
      </S.Box>
  )
};

export default {
  EditModal
}
