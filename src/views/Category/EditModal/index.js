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

const dealItemToForm = item => ({
  ...item
  // Active: 1,
  // F_CTRemarkC: '',
  // ID: '',
})

export const useInitState = () => {
  const [linkageData, setLinkData, getOne] = useLinkage()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => async () => {
    const newItem = dealItemToForm(item)
    setEditData(newItem)
    setOpen(true)
    await getOne({
      parent_id: ''
    })
    if (newItem?.c3_id) {
      setLinkData({
        oneCode: newItem.c3_id,
        twoCode: newItem.c2_id,
      })
    } else {
      setLinkData({
        oneCode: newItem.c2_id
      })
    }
    // 存在父类id
    // if (newItem.full_parent_id) {
    //   console.log(oneList)
    //   const gradeArr = newItem.full_parent_id.split(',');
    //   if (gradeArr.length === 3) {
    //   } else {
    //     setLinkData({
    //       oneCode: newItem.parent_id,
    //     })
    //   }
    // }
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
          save_category(Category: $data) {
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
    const {
      save_category: {
        flag,
        msg,
      }
    } = await updateData({
      data: {
        ...editData,
        parent_id,
        // full_parent_id,
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
        <DialogTitle>编辑产品类别{editData.id}</DialogTitle>
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
                      disabled={e.id === editData.id}
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
                      disabled={e.id === editData.id}
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
