import {Dialog, DialogContent, FormControl, FormLabel, MenuItem, TextField} from '@material-ui/core'
import {mergeModel} from '@/common/ModelAction/modelUtil'
import {modalModelFactory} from '@/common/model/modal'
import React from 'react'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import styled from 'styled-components'
import {CusButton} from '@/component/CusButton'
import {ConfigHomeCarouselTs} from '@/views/DataConfig/ConfigHomeCarousel/ConfigHomeCarousel'
import {ImgUpload} from '@/component/ImgUpload'
import {getDataConfigDoc, promoCodeListDoc, saveDataConfig} from '@/common/graphqlTypes/graphql/doc'
import {fpMergePre} from '@/common/utils'
import {configDataModel} from '@/views/DataConfig/List/model'

export enum RelatedObjTypeEnum {
  PromoCode = 'PromoCode',
  PromotionFlashSale = 'PromotionFlashSale',
  PromotionThemeSelect = 'PromotionThemeSelect',
}

export enum RelatedObjTypeEnumString {
  PromoCode = '优惠码',
  PromotionFlashSale = '限时抢购',
  PromotionThemeSelect = '主题甄选',
}

const Content = styled(DialogContent)`
  > main {
    margin-bottom: 10px;
    > .MenuLayout-MuiFormControl-root {
      margin-bottom: 10px;
    }
  }
`

interface Option {
  id: string
  name: string
}

export const configHomeCarouselModalModel = mergeModel(modalModelFactory('ConfigHomeCarouselModal', {
  relatedObjType: RelatedObjTypeEnum.PromotionFlashSale,
  imgUrl: '',
  isDisabled: 0, name: '', relatedObjId: '',
  imgFile: null,
} as ConfigHomeCarouselTs), 'ConfigHomeCarouselModal', {
  promotionFlashSaleOptions: [] as Option[],
  promotionThemeSelectOptions: [] as Option[],
  promoCodeOptions: [] as Option[],
  relatedObjIdOptions: [] as Option[],
}, {
  getOptions: async (value, option) => {
    const promotionFlashSaleList = await option.query(getDataConfigDoc, {
      type: RelatedObjTypeEnum.PromotionFlashSale,
    })
    const promotionThemeSelectList = await option.query(getDataConfigDoc, {
      type: RelatedObjTypeEnum.PromotionThemeSelect,
    })
    const promoCodeList = await option.query(promoCodeListDoc, {
      promoCodeType: 'PromoCode',
    })
    option.setData(fpMergePre({
      relatedObjIdOptions: promotionFlashSaleList?.getDataConfig?.value?.list?.map((item: any) => ({
        id: item.id,
        name: item.title,
      })),
      promotionFlashSaleOptions: promotionFlashSaleList?.getDataConfig?.value?.list?.map((item: any) => ({
        id: item.id,
        name: item.title,
      })),
      promotionThemeSelectOptions: promotionThemeSelectList?.getDataConfig?.value?.list?.map((item: any) => ({
        id: item.id,
        name: item.title,
      })),
      promoCodeOptions: promoCodeList?.promoCodeList?.map((item: any) => ({
        id: item.id,
        name: item.title,
      })),
    }))
  },
  getRelatedObjIdOptions: async (value: { type: RelatedObjTypeEnum }, option) => {
    if (value.type === RelatedObjTypeEnum.PromotionThemeSelect) {
      option.setData(fpMergePre({
        relatedObjIdOptions: option.data.promotionThemeSelectOptions,
      }))
    } else if (value.type === RelatedObjTypeEnum.PromotionFlashSale) {
      option.setData(fpMergePre({
        relatedObjIdOptions: option.data.promotionFlashSaleOptions,
      }))
    } else if ([RelatedObjTypeEnum.PromoCode].includes(value.type)) {
      option.setData(fpMergePre({
        relatedObjIdOptions: option.data.promoCodeOptions,
      }))
    }
  },
})

export const ConfigHomeCarouselModal = () => {
  const {getLoad} = useStoreModelByType__Graphql(configDataModel)

  const {state, actions} = useStoreModelByType__Graphql(configHomeCarouselModalModel)
  const {onClose, getRelatedObjIdOptions} = actions
  const {open, modalData, relatedObjIdOptions} = state
  return (
      <Dialog
          onClose={() => onClose()}
          open={open}
      >
        <Content>
          <main>
            <TextField
                fullWidth
                label={'Full name'}
                value={modalData.name}
                onChange={e => actions.setModal({name: e.target.value})}
            />
            <TextField
                select
                fullWidth
                label={'关联类别'}
                value={modalData.relatedObjType}
                onChange={e => {
                  actions.setModal({relatedObjType: e.target.value})
                  getRelatedObjIdOptions({type: e.target.value})
                }}
            >
              <MenuItem
                  value={RelatedObjTypeEnum.PromoCode}
              >{RelatedObjTypeEnumString[RelatedObjTypeEnum.PromoCode]}</MenuItem>
              <MenuItem
                  value={RelatedObjTypeEnum.PromotionFlashSale}
              >{RelatedObjTypeEnumString[RelatedObjTypeEnum.PromotionFlashSale]}</MenuItem>
              <MenuItem
                  value={RelatedObjTypeEnum.PromotionThemeSelect}
              >{RelatedObjTypeEnumString[RelatedObjTypeEnum.PromotionThemeSelect]}</MenuItem>
            </TextField>
            <TextField
                select
                fullWidth
                label={'关联类别对象'}
                value={modalData.relatedObjId}
                onChange={e => {
                  actions.setModal({relatedObjId: e.target.value})
                }}
            >
              {relatedObjIdOptions?.map((value: any) => (
                  <MenuItem
                      key={value.id}
                      value={value.id}
                  >{value.name}</MenuItem>
              ))}
            </TextField>
            <FormControl
                fullWidth
            >
              <FormLabel>
                图片
              </FormLabel>
              <ImgUpload
                  initSrc={modalData.imgUrl}
                  onChange={(file: any) => {
                    actions.setModal({imgFile: file})
                  }}
              />
            </FormControl>
          </main>
          <footer>
            <CusButton
                loading={getLoad(saveDataConfig)}
                fullWidth
                variant={"contained"}
                onClick={async () => {
                  await state.openResolve(modalData)
                }}
            >保存</CusButton>
          </footer>
        </Content>
      </Dialog>
  )
}
