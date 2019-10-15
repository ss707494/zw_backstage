import React, { useState } from 'react'
import { S } from './style'
import { S as SText } from '@/component/CusTextField/style'
import DialogTitle from "@material-ui/core/DialogTitle";
import { CusTextField } from "@/component/CusTextField";
import { CusSelectField } from "@/component/CusSelectField";
import MenuItem from "@material-ui/core/MenuItem";
import { CusButton } from "@/component/CusButton";
import { showMessage } from "@/component/Message";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ImgUpload } from "@/component/ImgUpload";
import { fileUploadAjax } from "@/common/utils";
import { categoryGraphql } from "@/views/Category/List";
import { useMutationGraphql, useQueryGraphql } from "@/component/ApolloQuery";
import { save_product } from "@/views/Product/List/productGraphql";
import { pick } from "lodash";

const useLinkage = () => {
  const [data, setData] = useState({
    oneCode: '',
    twoCode: '',
    threeCode: '',
  })
  const [getOne, { category_list: one = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [getTwo, { category_list: two = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [getThree, { category_list: three = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)
  // const [getOne, { data: one }] = postQueryCommodityTypeChildren()
  // const [getTwo, { data: two }] = postQueryCommodityTypeChildren()
  // const [getThree, { data: three }] = postQueryCommodityTypeChildren()
  React.useEffect(() => {
    if (!data.oneCode) return
    getTwo({
      parent_id: data.oneCode
    })
  }, [data.oneCode, getTwo])
  React.useEffect(() => {
    if (!data.twoCode) return
    getThree({
      parent_id: data.twoCode
    })
  }, [data.twoCode, getThree])
  return [{ ...data, one, two, three }, setData, { getOne, getTwo, getThree }]
}

const dealItemToForm = item => item

export const useInitState = () => {
  const [linkageData, setLinkData, { getOne, getTwo, getThree }] = useLinkage()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => async () => {
    setOpen(true)
    await getOne({
      parent_id: ''
    })
    const newItem = dealItemToForm(item)
    // 存在类型
    if (item.category_id) {
      // const { category_origin: { c1_id, c1_number, c2_id, c3_id, c2_number, c3_number } } = await getOrigin({ id: item.category_id })
      await getTwo({
        parent_id: item.c3_id
      })
      await getThree({
        parent_id: item.c2_id
      })
      setEditData({
        ...newItem,
        num: (`${item.c3_number}-${item.c2_number}-${item.c1_number}-${item.number ?? ''}`)
      })
      setLinkData({
        oneCode: item.c3_id,
        twoCode: item.c2_id,
        threeCode: item.c1_id
      })
    } else {
      setEditData(newItem)
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
      threeCode, three,
      setLinkData,
      open,
      setOpen,
      editData,
      setEditData,
      refreshData = () => {
      }
    }) => {
  const [updateData, , updateLoading] = useMutationGraphql(save_product)
  const [typeNum, setTypeNum] = useState({
    oneNum: '',
    twoNum: '',
    threeNum: '',
  })
  const handleClose = () => {
    setLinkData({
      oneCode: '',
      twoCode: '',
      threeCode: '',
    })
    setFiles({})
    setOpen(false)
    setEditData({})
  }
  const handleSave = async () => {
    const filesKey = Object.keys(files);
    let imgs
    if (filesKey.length) {
      const uploadRes = await fileUploadAjax({}, filesKey.map(e => files[e]), '/api/fileUpload')
      imgs = uploadRes?.data?.files?.map((e, i) => ({
        number: ~~filesKey[i],
        url: e?.url,
        name: e?.originalName
      })) ?? []
    }
    // const dealFile = dealFiles(editData?.PhotoArray ?? [], files)
    const { save_product } = await updateData({
      data: {
        ...pick(editData, [
          'id', 'name', 'remark', 'is_hot', 'is_new', 'stock', 'unit',
          'weight', 'price_in', 'price_out', 'price_market', 'brand',
          'is_group', 'group_amount', 'group_precision', 'group_remark',
        ]),
        category_id: threeCode,
        imgs
      }
    })
    if (save_product.flag) {
      showMessage({ message: save_product?.msg || '操作成功' })
      handleClose()
      refreshData()
    }
  }
  React.useEffect(() => {
    setTypeNum({
      oneNum: editData.c3_number ?? '',
      twoNum: editData.c2_number ?? '',
      threeNum: editData.c1_number ?? '',
    })
  }, [editData.c1_number, editData.c2_number, editData.c3_number])
  React.useEffect(() => {
    if (!typeNum.oneNum && !typeNum.twoNum && !typeNum.threeNum) return

    setEditData(pre => ({
      ...pre,
      num: `${typeNum.oneNum}-${typeNum.twoNum}-${typeNum.threeNum}-${editData.number ?? ''}` || ''
    }))
  }, [editData.number, setEditData, typeNum])
  const [files, setFiles] = useState({})
  const handleUploadChange = n => file => {
    setFiles({
      ...files,
      [n]: file
    })
  }

  return (
      <S.Box
          open={open}
          onClose={handleClose}
          maxWidth={false}
      >
        <DialogTitle>新增产品</DialogTitle>
        <S.Content>
          <form>
            <SText.TextFieldBox
                as={FormControl}
            >
              <InputLabel
                  shrink
                  htmlFor="tag"
              >是否拼团</InputLabel>
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={!!editData.is_group || false}
                        onChange={e => setEditData({
                          ...editData,
                          is_group: e.target.checked ? 1 : 0
                        })}
                    />
                  }
                  label=""
              />
            </SText.TextFieldBox>
            <CusTextField
                InputProps={{
                  readOnly: true,
                }}
                label="产品编号"
                value={editData.num}
            />
            <CusSelectField
                label=""
                placeholder="选择类别"
                value={oneCode}
                onChange={(e, child) => {
                  setLinkData(pre => ({
                    ...pre,
                    oneCode: e.target.value,
                    twoCode: '',
                    threeCode: ''
                  }))
                  setTypeNum(pre => ({
                    ...pre,
                    oneNum: child.props.num,
                  }))
                }}
            >
              {one?.map(e => (
                  <MenuItem
                      key={`typeOptionOne${e.id}`}
                      value={e?.id}
                      num={e?.number}
                  >{e.name}</MenuItem>
              ))}
            </CusSelectField>
            <CusSelectField
                label=""
                placeholder="选择类别"
                value={twoCode}
                onChange={(e, child) => {
                  setLinkData(pre => ({
                    ...pre,
                    twoCode: e.target.value,
                    threeCode: ''
                  }))
                  setTypeNum(pre => ({
                    ...pre,
                    twoNum: child.props.num,
                  }))
                }}
            >
              {two?.map(e => (
                  <MenuItem
                      key={`typeOptionOne${e.id}`}
                      value={e.id}
                      num={e?.number}
                  >{e.name}</MenuItem>
              ))}
            </CusSelectField>
            <CusSelectField
                label=""
                placeholder="选择类别"
                value={threeCode}
                onChange={(e, child) => {
                  setLinkData(pre => ({
                    ...pre,
                    threeCode: e.target.value
                  }))
                  setTypeNum(pre => ({
                    ...pre,
                    threeNum: child.props.num,
                  }))
                }}
            >
              {three?.map(e => (
                  <MenuItem
                      key={`typeOptionOne${e.id}`}
                      value={e.id}
                      num={e?.number}
                  >{e.name}</MenuItem>
              ))}
            </CusSelectField>
            <CusTextField
                label="中文名称"
                value={editData.name}
                onChange={e => setEditData({
                  ...editData,
                  name: e.target.value
                })}
            />
            <SText.TextFieldBox
                as={FormControl}
            >
              <InputLabel
                  shrink
                  htmlFor="tag"
              >上架类型</InputLabel>
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={!!editData.is_new || false}
                        onChange={e => setEditData({
                          ...editData,
                          is_new: e.target.checked ? 1 : 0
                        })}
                    />
                  }
                  label="新品"
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={!!editData.is_hot ?? false}
                        onChange={e => setEditData({
                          ...editData,
                          is_hot: e.target.checked ? 1 : 0
                        })}
                    />
                  }
                  label="热门"
              />
            </SText.TextFieldBox>
            <CusTextField
                label="库存"
                type="number"
                value={editData.stock}
                onChange={e => setEditData({
                  ...editData,
                  stock: parseFloat(e.target.value)
                })}
            />
            <CusTextField
                label="进货价格"
                type="number"
                value={editData.price_in}
                onChange={e => setEditData({
                  ...editData,
                  price_in: parseFloat(e.target.value)
                })}
            />
            <CusTextField
                label="品牌名称"
                value={editData.brand}
                onChange={e => setEditData({
                  ...editData,
                  brand: e.target.value
                })}
            />
            <CusTextField
                label="市场价格"
                type="number"
                value={editData.price_market}
                onChange={e => setEditData({
                  ...editData,
                  price_market: parseFloat(e.target.value)
                })}
            />
            <CusTextField
                label="售卖价格"
                type="number"
                value={editData.price_out}
                onChange={e => setEditData({
                  ...editData,
                  price_out: parseFloat(e.target.value)
                })}
            />
            <S.FieldTwoBox>
              <CusTextField
                  label="重量"
                  type="number"
                  value={editData.weight}
                  onChange={e => setEditData({
                    ...editData,
                    weight: parseFloat(e.target.value)
                  })}
              />
              <CusSelectField
                  label="单位"
                  value={editData.unit}
                  onChange={e => setEditData({
                    ...editData,
                    unit: e.target.value
                  })}
              >
                {[
                  ['g', '克/g']
                ]?.map(e => (
                    <MenuItem
                        key={`unit${e[0]}`}
                        value={e[0]}
                    >{e[1]}</MenuItem>
                ))}
              </CusSelectField>
            </S.FieldTwoBox>
            <CusTextField
                label="拼团数量"
                type="number"
                value={editData.group_amount}
                onChange={e => setEditData({
                  ...editData,
                  group_amount: parseFloat(e.target.value)
                })}
            />
            <CusTextField
                label="拼团精度"
                type="number"
                value={editData.group_precision}
                onChange={e => setEditData({
                  ...editData,
                  group_precision: parseFloat(e.target.value)
                })}
            />
            <CusTextField
                label="拼团描述"
                value={editData.group_remark}
                placeholder="整箱"
                onChange={e => setEditData({
                  ...editData,
                  group_remark: e.target.value
                })}
            />
            <S.UploadFormControl
                as={FormControl}
            >
              <InputLabel
                  shrink
                  htmlFor="imgUpload"
              >上传图片</InputLabel>
              <S.UploadBox>
                {[...Array(7).keys()].map(e => <ImgUpload
                    key={`ImgUpload${e}`}
                    initSrc={editData?.imgs && editData?.imgs?.find(e1 => e1.number === ~~e)?.url ?? ''}
                    onChange={handleUploadChange(e)}/>)}
                <span>最多支持上传7张图片,每张图片大小不超过1m,文件格式仅支持PNG/JPG</span>
              </S.UploadBox>
            </S.UploadFormControl>

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
