import React, { useState } from 'react'
import { S } from './style'
import DialogTitle from "@material-ui/core/DialogTitle";
import { CusTextField } from "@/component/CusTextField";
import { CusSelectField } from "@/component/CusSelectField";
import MenuItem from "@material-ui/core/MenuItem";
import { CusButton } from "@/component/CusButton";
import { showMessage } from "@/component/Message";
import { categoryGraphql } from "@/views/Category/List";
import { useMutationGraphql, useQueryGraphql } from "@/component/ApolloQuery";
import { gql } from "apollo-boost";

const useLinkage = () => {
  const [data, setData] = useState({
    oneCode: '',
    twoCode: '',
  })
  const [getOne, { category_list: one = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [getTwo, { category_list: two = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)

  // const [getOne, { data: one }] = postQueryCommodityTypeChildren()
  // const [getTwo, { data: two }] = postQueryCommodityTypeChildren()
  React.useEffect(() => {
    if (!data.oneCode) return
    getTwo({
      parent_id: data.oneCode
    })
  }, [data.oneCode, getTwo])
  return [{ ...data, one, two }, setData, getOne]
}

const dealItemToForm = item => !item?.Entry ? ({
  // Active: 1,
  // F_CTRemarkC: '',
  // ID: '',
}) : ({
  // Active: 2,
  // ID: item?.Entry?.id || '',
  // parent_id: item?.Entry?.F_CTParentID || '',
  // F_CTNameC: item?.Entry?.F_CTNameC || '',
  // F_CTRemarkC: item?.Entry?.F_CTRemarkC || '',
})

export const useInitState = () => {
  const [linkageData, setLinkData, getOne] = useLinkage()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => async () => {
    const newItem = dealItemToForm(item)
    setEditData(newItem)
    setOpen(true)
    const { data: oneList } = await getOne({
      parent_id: ''
    })
    // 存在父类id
    if (newItem.parent_id) {
      const gradeArr = item.DisplayNumber.split('-');
      if (gradeArr.length === 3) {
        setLinkData({
          oneCode: oneList?.data?.find(e => e.F_CTNumber === gradeArr[0])?.id,
          twoCode: newItem.parent_id,
        })
      } else {
        setLinkData({
          oneCode: newItem.parent_id,
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
  const [updateData, , updateLoading] = useMutationGraphql(gql`
      mutation ($data: CategoryInput){
          addCategory(Category: $data) {
              flag
              msg
              category {
                  id
                  name
              }
          }
      }
  `)

  const handleClose = () => {
    setOpen(false)
    setEditData({})
    setLinkData({
      oneCode: '',
      twoCode: '',
    })
  }
  const handleSave = async () => {
    const parent_id = twoCode || oneCode || ''
    const full_parent_id = [
            ...twoCode ? two.find(e => e.id === twoCode).full_parent_id.split(',')
                : oneCode ? one.find(e => e.id === oneCode).full_parent_id.split(',')
                    : [],
      parent_id
    ].join(',')
    const {
      addCategory: {
        flag,
        msg,
      }
    } = await updateData({
      data: {
        ...editData,
        parent_id,
        full_parent_id,
      }
    })
    if (flag) {
      showMessage({ message: msg || '操作成功' })
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
                value={editData.name}
                onChange={e => setEditData({
                  ...editData,
                  name: e.target.value
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
                      key={`typeOptionOne${e.id}`}
                      value={e.id}
                  >{e.name}</MenuItem>
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
                      key={`typeOptionOne${e.id}`}
                      value={e.id}
                  >{e.name}</MenuItem>
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
