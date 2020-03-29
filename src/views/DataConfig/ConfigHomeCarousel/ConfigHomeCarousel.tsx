import React, {useEffect} from "react"
import {useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {configDataModel} from '@/views/DataConfig/List/model'
import {fileUploadAjax, fpMerge, fpSet} from '@/common/utils'
import {Box as CarouselBox, ImgBox} from "../ConfigThemeSelect/ConfigThemeSelect"
import {CusButton} from '@/component/CusButton'
import {dealImgUrl} from '@/component/ImgDealUrl/ImgDealUrl'
import {useParams} from "react-router-dom"
import {
  ConfigHomeCarouselModal,
  configHomeCarouselModalModel,
  RelatedObjTypeEnum,
  RelatedObjTypeEnumString,
} from '@/views/DataConfig/ConfigHomeCarousel/EditModal'

export declare type ConfigHomeCarouselTs = {
  name: string
  relatedObjType: RelatedObjTypeEnum,
  relatedObjId: string
  imgUrl: string
  imgFile: any
  isDisabled: number
}

const getUploadUrl = async (file: any) => {
  return (await fileUploadAjax({}, [file], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
}

export const ConfigHomeCarousel = () => {
  const routerParams = useParams<any>()
  const activeCode = routerParams?.dictType

  const {state: configHomeCarouselModalModelState, actions: configHomeCarouselModalModelActions} = useStoreModelByType__Graphql(configHomeCarouselModalModel)
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  const {value} = dataConfig

  useEffect(() => {
    configHomeCarouselModalModelActions.getOptions()
  }, [configHomeCarouselModalModelActions])

  return (
      <div>
        <CarouselBox>
          {['操作', '名称', '关联对象类型', '关联对象', '图片'].map(v => (<header key={`header_${v}`}>{v}</header>))}
          {value?.list?.map((v: ConfigHomeCarouselTs, index: number) => (
              <React.Fragment key={`configData.list_${v.name}_${index}`}>
                <aside>
                  <CusButton
                      variant={"outlined"}
                      onClick={async () => {
                        const res = await configHomeCarouselModalModelActions.openClick(v)
                        if (res?.imgFile?.size) {
                          res.imgUrl = await getUploadUrl(res?.imgFile)
                        }
                        actions.setDataConfig(fpSet(value, ['list', index], { ...res }))
                        await actions.saveDataConfig()
                        await actions.getDataConfig(activeCode)
                      }}
                  >
                    编辑
                  </CusButton>
                  {/*<CusButton*/}
                  {/*    variant={"outlined"}*/}
                  {/*    onClick={async () => {*/}
                  {/*      actions.setDataConfig(fpSet(value, ['list'], preData => fpRemove(preData, index)))*/}
                  {/*      await actions.saveDataConfig()*/}
                  {/*      await actions.getDataConfig(activeCode)*/}
                  {/*    }}*/}
                  {/*>*/}
                  {/*  删除*/}
                  {/*</CusButton>*/}
                  <CusButton
                      variant={"outlined"}
                      color={v.isDisabled ? 'secondary' : 'primary'}
                      onClick={async () => {
                        actions.setDataConfig(fpSet(value, ['list', index, 'isDisabled'], preData => preData ? 0 : 1))
                        await actions.saveDataConfig()
                        await actions.getDataConfig(activeCode)
                      }}
                  >{v.isDisabled ? '启用' : '停用'}</CusButton>
                </aside>
                <section>{v.name}</section>
                <section>{RelatedObjTypeEnumString[v.relatedObjType]}</section>
                <section>
                  {(v.relatedObjType === RelatedObjTypeEnum.PromoCode ?
                          configHomeCarouselModalModelState?.promoCodeOptions :
                          v.relatedObjType === RelatedObjTypeEnum.PromotionFlashSale ? configHomeCarouselModalModelState?.promotionFlashSaleOptions :
                              configHomeCarouselModalModelState?.promotionThemeSelectOptions
                  )?.find((value1: any) => value1.id === v.relatedObjId)?.name
                  }
                </section>
                <ImgBox>
                  <img
                      src={dealImgUrl(v.imgUrl)}
                      alt=""/>
                </ImgBox>
              </React.Fragment>
          ))}
          <footer>
            <CusButton
                variant={"outlined"}
                onClick={async () => {
                  const res = await configHomeCarouselModalModelActions.openClick({})
                  if (res?.imgFile?.size) {
                    res.imgUrl = await getUploadUrl(res?.imgFile)
                  }
                  actions.setDataConfig(fpMerge(value, {
                    list: [
                      ...value?.list ?? [],
                      {
                        ...res,
                        id: `${new Date().getTime()}`,
                      },
                    ],
                  }))
                  await actions.saveDataConfig()
                  await actions.getDataConfig(activeCode)
                }}
            >新增</CusButton>
          </footer>
        </CarouselBox>
        <ConfigHomeCarouselModal/>
      </div>
  )
}
