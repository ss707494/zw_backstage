import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle, FormControl, MenuItem} from "@material-ui/core";
import {CusTextField} from "@/component/CusTextField";
import {useMutationSimpleData} from "@/component/ApolloQuery";
import {save_promo_code} from "@/views/PromoCode/graphql";
import {CusSelectField} from "@/component/CusSelectField";
import {DiscountConditionEnum, DiscountTypeEnum, PromoCodeTypeEnum} from "ss_common/enum";
import styled from "styled-components";
import {useLinkage} from "@/views/Product/EditModal";
import InputLabel from "@material-ui/core/InputLabel";
import {ImgUpload} from "@/component/ImgUpload";
import {S as SText} from "@/component/CusTextField/style";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import {CusButton} from "@/component/CusButton";
import {fileUploadAjax, parseFloatForInput} from "@/common/utils";
import {showMessage} from "@/component/Message";

const FormBox = styled('form')`
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
`
const OneRowBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 8px;
`
const OneRowLongBox = styled.div`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 8px;
`
const TextFieldBoxStyle = SText.TextFieldBox

export const EditModal = ({
                            promoCodeType,
                            open,
                            setOpen,
                            modalData,
                            setModalData,
                            refresh,
                          }: CommonModalState) => {
  const [savePromoCode, , ] = useMutationSimpleData(save_promo_code)
  const [imgFile, setImgFile] = useState()
  const [linkageData, setLinkData, {getOne}]: any[] = useLinkage()
  const _setLinkData = (changeString: string, reset: object) => (e: any) => {
    setLinkData((pre: any) => ({
      ...pre,
      [changeString]: e.target.value,
      ...reset,
    }))
    setModalData({
      ...modalData,
      product_category: (e.target.value)
    })
  }
  const {oneCode, twoCode, threeCode, one, two, three} = linkageData
  const handleClose = () => {
    setOpen(false)
    setLinkData({
      oneCode: '',
      twoCode: '',
      threeCode: '',
    })
    setImgFile({})
    setModalData({})

    // refresh()
  }
  useEffect(() => {
    getOne({
      parent_id: ''
    })
  }, [getOne])
  useEffect(() => {
    if (open && modalData?.id) {
      let categoryIds: string[] = []
      let dealCategory = modalData?.category_data
      while (dealCategory?.id) {
        categoryIds = [dealCategory?.id, ...categoryIds]
        if (dealCategory?.parent_data?.id) {
          dealCategory = dealCategory?.parent_data
        } else {
          dealCategory = {}
        }
      }
      const _helpKeys = ['oneCode', 'twoCode', 'threeCode']
      setLinkData(categoryIds.reduce((pre, val, index) => {
        return {
          ...pre,
          [_helpKeys[index]]: val
        }
      }, {}))
    }
  }, [modalData.category_data, modalData.id, open, setLinkData]);
  const handleSubmit = async () => {
    if (imgFile) {
      const uploadRes = await fileUploadAjax({}, [imgFile], '/api/fileUpload')
      modalData.img_url = uploadRes?.data?.files?.[0]?.url ?? ''
    }
    const {category_data, ...rest} = modalData
    const {
      save_promo_code: {
        flag,
        msg,
      },
    } = await savePromoCode({
      ...rest,
      promo_code_type: promoCodeType,
    })
    if (flag) {
      showMessage({message: msg || '操作成功'})
      refresh()
      handleClose()
    }
  }

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={"lg"}
      >
        <DialogTitle>编辑优惠码</DialogTitle>
        <DialogContent>
          <FormBox>
            <CusTextField
                label="名称"
                value={modalData?.title}
                onChange={(e: any) => setModalData({
                  ...modalData,
                  title: (e.target.value)
                })}
            />
            <CusTextField
                label={'描述'}
                value={modalData?.remark}
                onChange={(e: any) => setModalData({
                  ...modalData,
                  remark: (e.target.value)
                })}
            />
            {promoCodeType === PromoCodeTypeEnum.PromoCode ?
                <CusTextField
                label={'优惠码'}
                value={modalData?.code}
                onChange={(e: any) => setModalData({
                  ...modalData,
                  code: (e.target.value)
                })}
            />
            : <CusTextField
                    label={'重复次数'}
                    value={modalData?.reuse_times}
                    onChange={(e: any) => setModalData({
                      ...modalData,
                      reuse_times: parseFloatForInput(e.target.value)
                    })}
                />
            }
            <OneRowBox>
              <CusSelectField
                  label="折扣类型"
                  value={modalData?.discount_type}
                  onChange={(e: any) => setModalData({
                    ...modalData,
                    discount_type: (e.target.value)
                  })}
              >
                {[{
                  code: DiscountTypeEnum.Percentage,
                  name: '百分比',
                }, {
                  code: DiscountTypeEnum.Amount,
                  name: '金额',
                }].map((e: DictType) => (
                    <MenuItem
                        key={`modalData?.discount_type_${e.code}`}
                        value={e.code}
                    >{e.name}</MenuItem>
                ))}
              </CusSelectField>
              <CusTextField
                  label={'折扣' + modalData?.discount_type === DiscountTypeEnum.Percentage ? '百分比' : '金额'}
                  value={modalData?.discount_amount}
                  onChange={(e: any) => setModalData({
                    ...modalData,
                    discount_amount: parseFloatForInput(e.target.value)
                  })}
              />
            </OneRowBox>
            <OneRowBox>

              <CusSelectField
                  label="使用条件"
                  value={modalData?.discount_condition}
                  onChange={(e: any) => setModalData({
                    ...modalData,
                    discount_condition: (e.target.value)
                  })}
              >
                {[{
                  code: DiscountConditionEnum.No,
                  name: '无条件',
                }, {
                  code: DiscountConditionEnum.Amount,
                  name: '订单金额满',
                }].map((e: DictType) => (
                    <MenuItem
                        key={`modalData?.discount_type_${e.code}`}
                        value={e.code}
                    >{e.name}</MenuItem>
                ))}
              </CusSelectField>
              {modalData?.discount_condition === DiscountConditionEnum.Amount && <CusTextField
                  label={'金额超过'}
                  value={modalData?.discount_condition_amount}
                  onChange={(e: any) => setModalData({
                    ...modalData,
                    discount_condition_amount: parseFloatForInput(e.target.value)
                  })}
              />}
            </OneRowBox>
            <OneRowLongBox>
              <CusSelectField
                  label="使用类别"
                  placeholder="选择类别"
                  value={oneCode}
                  onChange={_setLinkData('oneCode', {
                    twoCode: '',
                    threeCode: '',
                  })}
              >
                {one?.map((e: any) => (
                    <MenuItem
                        key={`typeOptionOne${e.id}`}
                        value={e?.id}
                    >{e.name}</MenuItem>
                ))}
              </CusSelectField>
              <CusSelectField
                  label=""
                  placeholder="选择类别"
                  value={twoCode}
                  onChange={_setLinkData('twoCode', {
                    threeCode: '',
                  })}
              >
                {two?.map((e: any) => (
                    <MenuItem
                        key={`typeOptionTwo${e.id}`}
                        value={e.id}
                    >{e.name}</MenuItem>
                ))}
              </CusSelectField>
              <CusSelectField
                  label=""
                  placeholder="选择类别"
                  value={threeCode}
                  onChange={_setLinkData('threeCode', {})}
              >
                {three?.map((e: any) => (
                    <MenuItem
                        key={`typeOptionThree${e.id}`}
                        value={e.id}
                    >{e.name}</MenuItem>
                ))}
              </CusSelectField>
            </OneRowLongBox>
            <TextFieldBoxStyle as={FormControl}>
              <InputLabel
              >上传图片</InputLabel>
              <ImgUpload
                  initSrc={modalData?.img_url ?? ''}
                  onChange={setImgFile}/>
            </TextFieldBoxStyle>
            <div/>
            <TextFieldBoxStyle
                as={FormControl}>
              <InputLabel
              >有效日期</InputLabel>
              <KeyboardDateTimePicker
                  format={'yyyy/MM/dd HH:mm'}
                  value={modalData?.effective_date_start}
                  onChange={(date) => setModalData({
                    ...modalData,
                    effective_date_start: date
                  })}
              />
            </TextFieldBoxStyle>
            <TextFieldBoxStyle as={FormControl}>
              <InputLabel
              > ~</InputLabel>
              <KeyboardDateTimePicker
                  format={'yyyy/MM/dd HH:mm'}
                  value={modalData?.effective_date_end}
                  onChange={(date) => setModalData({
                    ...modalData,
                    effective_date_end: date
                  })}
              />
            </TextFieldBoxStyle>
            <footer>
              <CusButton
                  variant={"contained"}
                  onClick={() => {
                    handleSubmit()
                  }}
              >保存</CusButton>
            </footer>
          </FormBox>
        </DialogContent>
      </Dialog>
  )
}
