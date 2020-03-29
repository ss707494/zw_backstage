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
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import { ImgUpload } from "@/component/ImgUpload";
import { fileUploadAjax } from "@/common/utils";
import { save_category } from "@/views/Category/category.graphql";

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
      parent_id: 'root'
    })
    if (newItem?.p3_id) {
      setLinkData({
        oneCode: newItem.p3_id,
        twoCode: newItem.p2_id,
      })
    } else {
      setLinkData({
        oneCode: newItem.p2_id
      })
    }
    // 存在父类id
    // if (newItem.full_parent_id) {
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
  const [imgFile, setImgFile] = useState()

  const handleUploadChange = file => {
    setImgFile(file)
  }

  const [updateData, , updateLoading] = useMutationGraphql(save_category)

  const handleClose = () => {
    setImgFile(null)
    setOpen(false)
    setEditData({})
    setLinkData({
      oneCode: '',
      twoCode: '',
    })
  }
  const handleSave = async () => {
    if ((oneCode && editData.c3_id) || (twoCode && editData.c2_id)) {
      showMessage({ message: '无法添加,分类层级不可超过3级' })
      return
    }
    let img_url
    if (imgFile) {
      const uploadRes = await fileUploadAjax({},[imgFile], '/api/fileUpload')
      img_url = uploadRes?.data?.files?.[0]?.url ?? ''
    }
    const parent_id = twoCode || oneCode || 'root'
    const {
      save_category: {
        flag,
        msg,
      }
    } = await updateData({
      data: {
        id: editData?.id,
        name: editData?.name,
        parent_id,
        img_url,
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
            <S.UploadFormControl
                as={FormControl}
            >
              <InputLabel
                  shrink
                  htmlFor="imgUpload"
              >上传图片</InputLabel>
              <ImgUpload
                  initSrc={editData?.img_url ?? ''}
                  onChange={handleUploadChange}/>
            </S.UploadFormControl>
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
