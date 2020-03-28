import React from "react"
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction"
import {css} from "styled-components"
import {ImgUpload} from "@/component/ImgUpload"
import {useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {configDataModel} from '@/views/DataConfig/List/model'
import {fileUploadAjax, fpSet} from '@/common/utils'
import {Box as CarouselBox} from "../ConfigThemeSelect/ConfigThemeSelect"

const getUploadUrl = async (file: any) => {
  return (await fileUploadAjax({}, [file], '/api/fileUpload'))?.data?.files?.[0]?.url ?? ''
}
const setOneImg = async ({index, file}: {
  index: number
  file: any
}, pre: any) => {
  return fpSet(pre, ['imgList', index], (await getUploadUrl(file)))
}
const addOne = async (file: any, pre: any) => {
  return fpSet(pre, ['imgList'], [
    ...pre.imgList,
    (await getUploadUrl(file)),
  ])
}

export const ConfigHomeCarousel = () => {
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  const {value} = dataConfig

  return (
      <div>
        <HeaderAction />
        <CarouselBox>
          {['操作', '名称', '关联对象类型', '关联对象', '图片'].map(v => (<header key={`header_${v}`}>{v}</header>))}
          {value?.imgList?.map((src: string, index: number) => <ImgUpload
              key={`imgList_${src}`}
              mainCss={css`width: 320px; height: 200px`.toString()}
              initSrc={src}
              onChange={async (file: any) => {
                actions.setDataConfig(await setOneImg({index, file}, value))
              }}
          />)}
          <ImgUpload
              mainCss={css`width: 320px; height: 200px`.toString()}
              initSrc={''}
              noSetSrc={true}
              onChange={async (file: any) => {
                actions.setDataConfig(await addOne(file, value))
              }}
          />
        </CarouselBox>
      </div>
  )
}
