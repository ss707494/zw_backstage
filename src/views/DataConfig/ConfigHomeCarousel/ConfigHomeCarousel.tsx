import React, {useEffect} from "react"
import {ModuleEnum, useStore} from "@/common/context"
import {homeCarousel} from "@/views/DataConfig/ConfigHomeCarousel/model/HomeCarousel"
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction"
import styled, {css} from "styled-components"
import {ImgUpload} from "@/component/ImgUpload"

const Box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-template-rows: repeat(auto-fill, min-content);
  grid-gap: 20px;

`

export const ConfigHomeCarousel = ({dataConfig = {}}: any) => {
  const {state: {configData}, handleAction, actions} = useStore(ModuleEnum.ConfigThemeSelect, homeCarousel)
  const {imgList} = configData

  useEffect(() => {
    if (dataConfig?.value) {
      handleAction(actions.setConfigData)(dataConfig.value)
    }
  }, [actions.setConfigData, dataConfig.value, handleAction])

  return (
      <div>
        <HeaderAction
            dataConfig={dataConfig}
            configData={configData}
        />
        <Box>
          {imgList?.map((value: string, index: number) => <ImgUpload
              key={`imgList_${value}`}
              mainCss={css`width: 320px; height: 200px`.toString()}
              initSrc={value}
              onChange={(file: any) => {
                handleAction(actions.setOneImg)({index, file})
              }}
          />)}
          <ImgUpload
              mainCss={css`width: 320px; height: 200px`.toString()}
              initSrc={''}
              noSetSrc={true}
              onChange={(file: any) => {
                handleAction(actions.addOne)(file)
              }}
          />
        </Box>
      </div>
  )
}
