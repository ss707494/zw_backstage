import React, {useCallback, useEffect} from "react"
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction"
import {Tab, Tabs} from "@material-ui/core"
import {AddCircleOutline} from "@material-ui/icons"
import {fpMerge} from "@/common/utils"
import {AddType} from "@/views/DataConfig/ConfigHelpDocumentation/AddType"
import {useCommonModalState} from "@/common/useHooks"
import styled from "styled-components"
import {grey} from "@material-ui/core/colors"
import {CusButton} from "@/component/CusButton"
import _ from "lodash"
import {ProblemBox} from "@/views/DataConfig/ConfigHelpDocumentation/ProblemBox"
import {
  configHelpDocumentationModel,
} from "@/views/DataConfig/ConfigHelpDocumentation/model"
import {useStoreModel, useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {configDataModel} from '@/views/DataConfig/List/model'

const Box = styled.div`
  display: grid;
  grid-template-rows: min-content min-content 1fr;
  height: 100%;
`
const TabsBox = styled(Tabs)`
  background: ${grey[200]};
`
const MainBox = styled.main`
  border: 1px solid ${grey[200]};
  padding: 20px;
`

export const ConfigHelpDocumentation = () => {
  const {state: configState, actions: configActions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = configState

  const addTypeModalState = useCommonModalState()
  const {state, actions} = useStoreModel(configHelpDocumentationModel)
  const configData = state
  const {actType} = configData
  const setActType = useCallback((actions.setActType), [])
  const setConfigData = configActions.setDataConfig
  useEffect(() => {
    if (dataConfig?.value?.typeList?.length) {
      setActType(dataConfig?.value?.typeList?.[0])
    }
  }, [dataConfig.value, setActType])

  const tabsChange = (item: DictType) => () => {
    setActType(item)
  }
  const addTypeList = () => {
    addTypeModalState.openClick({
      isEdit: false,
    })()
  }
  const addTypeListAction = (modalData: any) => {
    setConfigData(fpMerge(dataConfig?.value, {
      typeList: [
        ...configData?.typeList ?? [],
        _.pick(modalData, ['name', 'code', 'sort']),
      ],
    }))
  }
  const editTypeAction = (modalData: any) => {
    setConfigData(fpMerge(dataConfig?.value, {
      typeList: [
        ...dataConfig?.value?.typeList.map((v: any) => {
          if (v.code !== actType?.code) return v
          return modalData
        }) ?? [],
      ],
    }))
    setActType(modalData)
  }
  return (
      <Box>
        <HeaderAction
        />
        <TabsBox
            value={actType?.code || 'add'}
        >
          {dataConfig?.value?.typeList?.map((item: DictType) => <Tab
              key={`configData?.typeList${item.code}`}
              value={item.code}
              label={item.name}
              onClick={tabsChange(item)}
          />)}
          <Tab
              value={'add'}
              onClick={addTypeList}
              icon={<AddCircleOutline/>}
              label={'添加分类'}
          />
        </TabsBox>
        <MainBox>{actType?.code && <>
          <header>
            <CusButton
                variant={"outlined"}
                onClick={addTypeModalState.openClick({
                  ...actType,
                  isEdit: true,
                })
                }
            >编辑类型</CusButton>
          </header>
          <ProblemBox
          />
        </>
        }</MainBox>
        <AddType
            {...addTypeModalState}
            addTypeListAction={addTypeListAction}
            editTypeAction={editTypeAction}
        />
      </Box>
  )
}

export default ConfigHelpDocumentation
