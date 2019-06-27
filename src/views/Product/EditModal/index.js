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
    threeCode: '',
  })
  const [getOne, { data: one }] = api.post('/Products/QueryCommodityTypeChildren')
  const [getTwo, { data: two }] = api.post('/Products/QueryCommodityTypeChildren')
  const [getThree, { data: three }] = api.post('/Products/QueryCommodityTypeChildren')
  React.useEffect(() => {
    getOne()
  }, [getOne])
  React.useEffect(() => {
    if (!data.oneCode) return
    setData(pre => ({
      ...pre,
      twoCode: '',
      threeCode: ''
    }))
    getTwo({
      ParentID: data.oneCode
    })
  }, [data.oneCode, getTwo])
  React.useEffect(() => {
    if (!data.twoCode) return
    setData(pre => ({
      ...pre,
      threeCode: ''
    }))
    getThree({
      ParentID: data.twoCode
    })
  }, [data.twoCode, getThree])
  return [{ ...data, one, two }, setData]
}

const dealItemToForm = item => !item?.Entry ? ({
  Active: 1,
}) : ({
  Active: 2,
  ID: item?.Entry?.F_CTID || '',
  ParentID: item?.Entry?.F_CTParentID || '',
  F_CTNameC: item?.Entry?.F_CTNameC || '',
  F_CTRemarkC: item?.Entry?.F_CTRemarkC || '',
})

export const useInitState = () => {
  const [linkageData, setLinkData] = useLinkage()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => () => {
    const newItem = dealItemToForm(item)
    setEditData(newItem)
    // 存在父类id
    if (newItem.ParentID) {
      const gradeArr = item.GradeName.split('-');
      if (gradeArr.length === 3) {
        setLinkData({
          oneCode: linkageData.one.find(e => e.F_CTNumber === gradeArr[0])?.F_CTID,
          twoCode: newItem.ParentID,
        })
      } else {
        setLinkData({
          oneCode: newItem.ParentID,
        })
      }
    }
    setOpen(true)
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
      threeCode, three,
      setLinkData,
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
      ParentID: twoCode || oneCode || ''
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
        <DialogTitle>新增产品</DialogTitle>
        <S.Content>
          <form>
            <CusTextField
                InputProps={{
                  readOnly: true,
                }}
                label="产品编号"
                value={editData.F_CTNameC}
                onChange={e => setEditData({
                  ...editData,
                  name: e.target.value
                })}
            />
            <CusSelectField
                label=""
                placeholder="选择类别"
                value={oneCode}
                onChange={e => setLinkData(pre => ({
                  ...pre,
                  oneCode: e.target.value
                }))}
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
            <CusSelectField
                label=""
                placeholder="选择类别"
                value={threeCode}
                onChange={e => setLinkData(pre => ({
                  ...pre,
                  threeCode: e.target.value
                }))}
            >
              {three?.map(e => (
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
