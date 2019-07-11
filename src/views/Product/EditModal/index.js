import React, { useState } from 'react'
import { S } from './style'
import { S as SText } from '@/component/CusTextField/style'
import DialogTitle from "@material-ui/core/DialogTitle";
import { CusTextField } from "@/component/CusTextField";
import { CusSelectField } from "@/component/CusSelectField";
import MenuItem from "@material-ui/core/MenuItem";
import { CusButton } from "@/component/CusButton";
import { api } from "@/common/api";
import { showMessage } from "@/component/Message";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ImgUpload } from "@/component/ImgUpload";
import { fileUploadAjax } from "@/common/utils";
import { postQueryCommodityTypeChildren } from "@/views/Category/List";

const useLinkage = () => {
  const [data, setData] = useState({
    oneCode: '',
    twoCode: '',
    threeCode: '',
  })
  const [getOne, { data: one }] = postQueryCommodityTypeChildren()
  const [getTwo, { data: two }] = postQueryCommodityTypeChildren()
  const [getThree, { data: three }] = postQueryCommodityTypeChildren()
  React.useEffect(() => {
    if (!data.oneCode) return
    getTwo({
      ParentID: data.oneCode
    })
  }, [data.oneCode, getTwo])
  React.useEffect(() => {
    if (!data.twoCode) return
    getThree({
      ParentID: data.twoCode
    })
  }, [data.twoCode, getThree])
  return [{ ...data, one, two, three }, setData, { getOne, getTwo, getThree }]
}

const dealItemToForm = item => ({
  Active: item?.ID ? 2 : 1,
  F_CIsHot: 0,
  F_CIsNew: 0,
  F_CTNameC: '',
  F_CPUnitPriceIn: 0,
  F_CPUnitPriceOut: 0,
  F_CPUnitPriceMarket: 0,
  F_CPWeight: 0,
  F_CPCompany: '',
  ...item
})

export const useInitState = () => {
  const [linkageData, setLinkData, { getOne, getTwo, getThree }] = useLinkage()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const editClick = (item) => async () => {
    setOpen(true)
    const oneList = await getOne()
    const newItem = dealItemToForm(item)
    setEditData(newItem)
    // 存在类型
    if (newItem.F_CTID && newItem.F_CNumber) {
      const gradeArr = [
        newItem.F_CNumber[0] + newItem.F_CNumber[1],
        newItem.F_CNumber.slice(0, 4),
        // newItem.F_CNumber[2] + newItem.F_CNumber[3],
        newItem.F_CNumber.slice(0, 6),
        // newItem.F_CNumber[4] + newItem.F_CNumber[5],
      ]
      const oneCode = oneList.find(e => e.F_CTNumber === gradeArr[0])?.F_CTID
      const twoList = await getTwo({
        Type: 2,
        F_CNumber: gradeArr[0]
      })
      const twoCode = twoList.find(e => e.F_CTNumber === gradeArr[1])?.F_CTID
      const threeList = await getThree({
        Type: 2,
        F_CNumber: gradeArr[1]
      })
      const threeCode = threeList.find(e => e.F_CTNumber === gradeArr[2])?.F_CTID
      setLinkData({
        oneCode,
        twoCode,
        threeCode
      })

      // if (gradeArr.length === 3) {
      //   setLinkData({
      //     oneCode: linkageData.one.find(e => e.F_CTNumber === gradeArr[0])?.F_CTID,
      //     twoCode: newItem.ParentID,
      //   })
      // } else {
      //   setLinkData({
      //     oneCode: newItem.ParentID,
      //   })
      // }
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
  const [updateData, , updateLoading] = api.post('/Products/UpdateCommodity')
  const [typeNum, setTypeNum] = useState({
    oneNum: '',
    twoNum: '',
    threeNum: '',
  })
  const dealFiles = (PhotoArray, files) =>
      Object.keys(files).reduce((i, e) => ({
        IDs: [
          ...i.IDs ?? [],
          PhotoArray?.[e]?.F_PID ?? '',
        ],
        file: [
          ...i.file ?? [],
          files[e],
        ]
      }), {})
  const handleSave = async () => {
    const dealFile = dealFiles(editData?.PhotoArray ?? [], files)
    const updateRes = await updateData({
      ...editData,
      F_CTID: threeCode || twoCode || oneCode || ''
    })
    if (updateRes?.msg) {
      showMessage({ message: updateRes?.msg ?? '操作成功' })
    }
    if (updateRes.result && updateRes?.data) {
      if (dealFile?.IDs) {
        await fileUploadAjax({
          Type: 1,
          BussinessID: editData?.ID || updateRes?.data?.ID,
          IDs: dealFile.IDs.join(',')
        }, dealFile.file, '/Products/UpLoadPicture')
      }
      refreshData()
      setOpen(false)
    }
  }
  React.useEffect(() => {
    setEditData(pre => ({
      ...pre,
      num: (typeNum.threeNum || typeNum.twoNum || typeNum.oneNum) || ''
    }))
  }, [setEditData, typeNum])
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
          onClose={() => {
            setLinkData({
              oneCode: '',
              twoCode: '',
              threeCode: '',
            })
            setFiles({})
            setOpen(false)
            setEditData({})
          }}
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
                      key={`typeOptionOne${e.F_CTID}`}
                      value={e?.F_CTID}
                      num={e?.F_CTNumber}
                  >{e.F_CTNameC}</MenuItem>
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
                      key={`typeOptionOne${e.F_CTID}`}
                      value={e.F_CTID}
                      num={e?.F_CTNumber}
                  >{e.F_CTNameC}</MenuItem>
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
                      key={`typeOptionOne${e.F_CTID}`}
                      value={e.F_CTID}
                      num={e?.F_CTNumber}
                  >{e.F_CTNameC}</MenuItem>
              ))}
            </CusSelectField>
            <CusTextField
                label="中文名称"
                value={editData.F_CNameC}
                onChange={e => setEditData({
                  ...editData,
                  F_CNameC: e.target.value
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
                        checked={!!editData.F_CIsNew || false}
                        onChange={e => setEditData({
                          ...editData,
                          F_CIsNew: e.target.checked ? 1 : 0
                        })}
                    />
                  }
                  label="新品"
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        checked={!!editData.F_CIsHot ?? false}
                        onChange={e => setEditData({
                          ...editData,
                          F_CIsHot: e.target.checked ? 1 : 0
                        })}
                    />
                  }
                  label="热门"
              />
            </SText.TextFieldBox>
            <CusTextField
                label="库存"
                type="number"
                value={editData.Stock}
                onChange={e => setEditData({
                  ...editData,
                  Stock: e.target.value
                })}
            />
            <CusTextField
                label="进货价格"
                type="number"
                value={editData.F_CPUnitPriceIn}
                onChange={e => setEditData({
                  ...editData,
                  F_CPUnitPriceIn: e.target.value
                })}
            />
            <span/>
            <CusTextField
                label="市场价格"
                type="number"
                value={editData.F_CPUnitPriceMarket}
                onChange={e => setEditData({
                  ...editData,
                  F_CPUnitPriceMarket: e.target.value
                })}
            />
            <CusTextField
                label="售卖价格"
                type="number"
                value={editData.F_CPUnitPriceOut}
                onChange={e => setEditData({
                  ...editData,
                  F_CPUnitPriceOut: e.target.value
                })}
            />
            <S.FieldTwoBox>
              <CusTextField
                  label="重量"
                  type="number"
                  value={editData.F_CPWeight}
                  onChange={e => setEditData({
                    ...editData,
                    F_CPWeight: e.target.value
                  })}
              />
              <CusSelectField
                  label="单位"
                  value={editData.F_CPCompany}
                  onChange={e => setEditData({
                    ...editData,
                    F_CPCompany: e.target.value
                  })}
              >
                {[
                  ['g', '克/g']
                ]?.map(e => (
                    <MenuItem
                        key={`F_CPCompany${e[0]}`}
                        value={e[0]}
                    >{e[1]}</MenuItem>
                ))}
              </CusSelectField>
            </S.FieldTwoBox>
            <S.UploadFormControl
                as={FormControl}
            >
              <InputLabel
                  shrink
                  htmlFor="imgUpload"
              >上传图片</InputLabel>
              <S.UploadBox>
                {[...Array(7).keys()].map(e =>
                    <ImgUpload
                        key={`ImgUpload${e}`}
                        initSrc={editData?.PhotoArray?.[e]?.F_PWebPath ?? ''}
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
