import React, { useState } from 'react'
import { S } from './style'
import DialogTitle from "@material-ui/core/DialogTitle";
import { CusTextField } from "@/component/CusTextField";
import { CusSelectField } from "@/component/CusSelectField";
import MenuItem from "@material-ui/core/MenuItem";
import { CusButton } from "@/component/CusButton";
import { api } from "@/common/api";
import { showMessage } from "@/component/Message";
import { postQueryCommodityTypeChildren } from "@/views/Category/List";

const useLinkage = () => {
  const [data, setData] = useState({
    oneCode: '',
    twoCode: '',
  })
  const [getOne, { data: one }] = postQueryCommodityTypeChildren()
  const [getTwo, { data: two }] = postQueryCommodityTypeChildren()
  React.useEffect(() => {
    if (!data.oneCode) return
    getTwo({
      ParentID: data.oneCode
    })
  }, [data.oneCode, getTwo])
  return [{ ...data, one, two }, setData, getOne]
}

const dealItemToForm = item => !item?.Entry ? ({
  Active: 1,
  F_CTRemarkC: '',
  ID: '',
}) : ({
  Active: 2,
  ID: item?.Entry?.F_CTID || '',
  ParentID: item?.Entry?.F_CTParentID || '',
  F_CTNameC: item?.Entry?.F_CTNameC || '',
  F_CTRemarkC: item?.Entry?.F_CTRemarkC || '',
})

export const useInitState = () => {
  const [linkageData, setLinkData, getOne] = useLinkage()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => async () => {
    const newItem = dealItemToForm(item)
    setEditData(newItem)
    setOpen(true)
    const oneList = await getOne()
    // 存在父类id
    if (newItem.ParentID) {
      const gradeArr = item.DisplayNumber.split('-');
      if (gradeArr.length === 3) {
        setLinkData({
          oneCode: oneList?.data?.find(e => e.F_CTNumber === gradeArr[0])?.F_CTID,
          twoCode: newItem.ParentID,
        })
      } else {
        setLinkData({
          oneCode: newItem.ParentID,
        })
      }
    }
  }
  return {
    ...linkageData,
    setLinkData,
    editClick,
    open,
    setOpen,
    editData,
    setEditData
  }
}

export const EditModal = (
    {
      oneCode, twoCode, one, two,
      setLinkData,
      open,
      setOpen,
      editData,
      setEditData,
      refreshData = () => {
      }
    }) => {
  const [updateData, , updateLoading] = api.post('/Products/UpdateCommodityType')

  const handleClose = () => {
    setOpen(false)
    setEditData({})
    setLinkData({
      oneCode: '',
      twoCode: '',
    })
  }
  const handleSave = async () => {
    const res = await updateData({
      ...editData,
      ParentID: twoCode || oneCode || ''
    })
    if (res?.msg) {
      showMessage({ message: res?.msg ?? '操作成功' })
    }
    if (res.result && res?.data) {
      showMessage({ message: res.msg ?? '操作成功' })
      refreshData()
      handleClose()
    }
  }

  return (
      <S.Box
          open={open}
          onClose={handleClose}
          maxWidth={false}
      >
        <DialogTitle>编辑产品类别</DialogTitle>
        <S.Content>
          <form>
            <CusTextField
                label="中文名称"
                value={editData.F_CTNameC}
                onChange={e => setEditData({
                  ...editData,
                  F_CTNameC: e.target.value
                })}
            />
            <CusSelectField
                label="产品类别"
                placeholder="选择类别"
                value={oneCode}
                onChange={e => {
                  setLinkData(pre => ({
                    ...pre,
                    oneCode: e.target.value,
                    twoCode: ''
                  }))
                }}
            >
              {one?.map(e => (
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
              {two?.map(e => (
                  <MenuItem
                      key={`typeOptionOne${e.F_CTID}`}
                      value={e.F_CTID}
                  >{e.F_CTNameC}</MenuItem>
              ))}
            </CusSelectField>
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
  EditModal
}
