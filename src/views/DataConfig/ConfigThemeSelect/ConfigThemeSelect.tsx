import React, {useEffect} from "react"
import styled from "styled-components"
import {CusButton} from "@/component/CusButton"
import {editThemeModel} from "@/views/DataConfig/ConfigThemeSelect/model/editTheme"
import {ConfigThemeSelectTs, EditModal} from "@/views/DataConfig/ConfigThemeSelect/EditModal"
import {grey} from "@material-ui/core/colors"
import {dealImgUrl} from "@/component/ImgDealUrl/ImgDealUrl"
import {SelectProduct, selectProductModel} from "@/views/DataConfig/ConfigThemeSelect/SelectProduct"
import {formatDate, fpSet} from "@/common/utils"
import {useStoreModel, useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {configDataModel} from '@/views/DataConfig/List/model'
import {useParams} from 'react-router-dom'

const Box = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, max-content) repeat(2, minmax(200px, 500px)) 240px 450px;
  > * {
    padding: 8px;
    display: grid;
    align-items: center;
    border: 1px solid ${grey[200]};
    margin-right: -1px;
    margin-bottom: -1px;
  }
  > header {
    text-align: center;
  }
  > footer {
    text-align: center;
    border: 0;
  }
  > aside {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`
const ImgBox = styled.section`
  justify-content: center;
  > img {
    max-width: 200px;
    max-height: 100px;
  }
`

const findIndex = (list: any[], item: any) => list.findIndex(con => con.title === item.title)

export const ConfigThemeSelect = () => {
  const routerParams = useParams<any>()
  const activeCode = routerParams?.dictType
  const {state: configState, actions: configActions} = useStoreModelByType__Graphql(configDataModel)
  const dataConfig = configState.dataConfig

  // const {state: {configData}, actions} = useStoreModel(themeSelectModel)
  const {actions: editModalActions} = useStoreModel(editThemeModel)

  const selectProductModelData = useStoreModel(selectProductModel)
  const {actions: actionsSel} = selectProductModelData

  // useEffect(() => {
  //   if (dataConfig?.value) {
  //     (actions.setConfigData)(fpMerge(themeSelectModel.state.configData, dataConfig.value))
  //   }
  // }, [actions, dataConfig.value])
  useEffect(() => {
    (actionsSel.setDealOut)(async ({selectList, index}: { selectList: string[]; index: number }) => {
      configActions.setDataConfig(fpSet(dataConfig.value, ['list', index, 'selectProductList'], selectList))
      await configActions.saveDataConfig()
      await configActions.getDataConfig(activeCode)
      return true
    })
  }, [actionsSel, activeCode, configActions, dataConfig.value])
  return (
      <div>
        <Box>
          {['操作', '主题名称', '描述', '图片', '有效日期'].map(v => (<header key={`header_${v}`}>{v}</header>))}
          {dataConfig?.value?.list?.map((v: ConfigThemeSelectTs) => (
              <React.Fragment key={`configData.list_${v.title}`}>
                <aside>
                  <CusButton
                      variant={"outlined"}
                      onClick={() => (editModalActions.openEditClick)({
                        data: v,
                        index: findIndex(dataConfig?.value?.list, v),
                      })}
                  >
                    编辑
                  </CusButton>
                  <CusButton
                      variant={"outlined"}
                      color={v.isDisabled ? 'secondary' : 'primary'}
                      onClick={async () => {
                        configActions.setDataConfig(fpSet(dataConfig.value, ['list', findIndex(dataConfig?.value?.list, v), 'isDisabled'], preData => preData ? 0 : 1))
                        await configActions.saveDataConfig()
                        await configActions.getDataConfig(activeCode)
                      }}
                  >{v.isDisabled ? '启用' : '停用'}</CusButton>
                  <CusButton
                      style={{gridColumn: '1 / 3'}}
                      variant={"outlined"}
                      onClick={() => (selectProductModelData.actions.openClick)({
                        open: true,
                        index: findIndex(dataConfig?.value?.list, v),
                        selectList: v.selectProductList ?? [],
                      })}
                  >
                    关联商品
                  </CusButton>
                </aside>
                <section>{v.title}</section>
                <section>{v.remark}</section>
                <ImgBox>
                  <img
                      src={dealImgUrl(v.imgUrl)}
                      alt=""/>
                </ImgBox>
                <section>{`${formatDate(v.startTime, 'yyyy/MM/dd HH:mm')}`}-{`${formatDate(v.endTime, 'yyyy/MM/dd HH:mm')}`}</section>
              </React.Fragment>
          ))}
          <footer>
            <CusButton
                variant={"outlined"}
                onClick={() => (editModalActions.openClick)({})}
            >新增</CusButton>
          </footer>
        </Box>
        <EditModal/>
        <SelectProduct/>
      </div>
  )
}
