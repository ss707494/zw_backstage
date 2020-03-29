import React, {useCallback, useEffect} from "react"
import {contentWithLeftBox as S} from "@/common/style/contentWithLeftBox"
import {ConfigGroup} from "@/views/DataConfig/ConfigGroup/ConfigGroup"
import {DictTypeEnum} from "@/common/enum"
import {ConfigUserLevel} from "@/views/DataConfig/ConfigUserLevel/ConfigUserLevel"
import {useParams} from "react-router-dom"
import history from "@/common/history"
import {ConfigFreight} from "@/views/DataConfig/ConfigFreight/ConfigFreight"
import ConfigHelpDocumentation from "@/views/DataConfig/ConfigHelpDocumentation/ConfigHelpDocumentation"
import {ConfigThemeSelect} from "@/views/DataConfig/ConfigThemeSelect/ConfigThemeSelect"
import {ConfigHomeCarousel} from "@/views/DataConfig/ConfigHomeCarousel/ConfigHomeCarousel"
import {ConfigOrderState} from '@/views/DataConfig/ConfigOrderState/OrderState'
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {configDataModel} from '@/views/DataConfig/List/model'
import {getDataConfigDoc} from '@/common/graphqlTypes/graphql/doc'
import {ConfigSelfAddress} from '@/views/DataConfig/ConfigSelfAddress/ConfigSelfAddress'
import {CusButton} from '@/component/CusButton'
import {AddOneConfigModal, addOneConfigModalModel} from '@/views/DataConfig/List/AddOneConfigModal'
import {ConfigAppModule} from '@/views/DataConfig/ConfigAppModule/ConfigAppModule'
import ConfigHelpType from '@/views/DataConfig/ConfigHelpDocumentationType/ConfigHelpType'

const leftMenu: DictType[] = [
  {
    name: '团购参数设置',
    code: DictTypeEnum.GroupPrecision
  },
  {
    name: '用户等级设置',
    code: DictTypeEnum.UserLevel,
  },
  {
    name: '自取地址设置',
    code: DictTypeEnum.SelfAddress,
  },
  {
    name: '运费设置',
    code: DictTypeEnum.Freight,
  },
  {
    name: '帮助文档分类设置',
    code: DictTypeEnum.HelpDocumentationType,
  },
  {
    name: '帮助文档设置',
    code: DictTypeEnum.HelpDocumentation,
  },
  {
    name: '促销-主题甄选',
    code: DictTypeEnum.PromotionThemeSelect,
  },
  {
    name: '促销-限时抢购',
    code: DictTypeEnum.PromotionFlashSale,
  },
  {
    name: '首页轮播图',
    code: DictTypeEnum.HomeCarousel,
  },
  {
    name: '订单状态设置',
    code: DictTypeEnum.OrderState,
  },
  {
    name: 'App模块设置',
    code: DictTypeEnum.AppModule,
  },
]

const configCom: { [key: string]: any } = {
  [DictTypeEnum.GroupPrecision]: ConfigGroup,
  [DictTypeEnum.UserLevel]: ConfigUserLevel,
  [DictTypeEnum.Freight]: ConfigFreight,
  [DictTypeEnum.HelpDocumentationType]: ConfigHelpType,
  [DictTypeEnum.HelpDocumentation]: ConfigHelpDocumentation,
  [DictTypeEnum.PromotionThemeSelect]: ConfigThemeSelect,
  [DictTypeEnum.PromotionFlashSale]: ConfigThemeSelect,
  [DictTypeEnum.HomeCarousel]: ConfigHomeCarousel,
  [DictTypeEnum.OrderState]: ConfigOrderState,
  [DictTypeEnum.SelfAddress]: ConfigSelfAddress,
  [DictTypeEnum.AppModule]: ConfigAppModule,
}

export const DataConfig = () => {
  const {actions: addOneConfigModalModelActions} = useStoreModelByType__Graphql(addOneConfigModalModel)
  const routerParams = useParams<any>()
  const activeCode = routerParams?.dictType
  // const [activeCode, setActiveCode] = React.useState(leftMenu[0].code)
  // const [getDataConfig, {data_config: dataConfig}, loading] = useQueryGraphql(getDataConfigGraphql)
  const {state, actions, getLoad} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  const loading = !!getLoad(getDataConfigDoc)


  useEffect(() => {
    actions.getDataConfig(activeCode)
  }, [actions, activeCode])

  const changeActiveCode = useCallback((newCode: string) => () => {
    if (!loading) {
      actions.cleanDataConfig()
      history.push(`/dataConfig/${newCode}`)
    }
  }, [actions, loading])

  return (
      <S.Box>
        <S.LeftBox>
          {leftMenu?.map((e: DictType) =>
              e.code === activeCode ?
                  <S.ActiveBox
                      key={`dict_type${e.code}`}
                  >
                    {e.name}
                  </S.ActiveBox>
                  : <S.LeftCard
                      key={`dict_type${e.code}`}
                      disabled={loading}
                      onClick={changeActiveCode(e.code)}
                  >
                    {e.name}
                  </S.LeftCard>
          )}
          <CusButton
              style={{marginTop: '20px'}}
              onClick={()=> addOneConfigModalModelActions.openClick({})}
          >
            添加配置项
          </CusButton>
        </S.LeftBox>
        <S.RightBox
        >
          {(configCom[activeCode]?.({dataConfig}) ?? <div/>)}
        </S.RightBox>
        <AddOneConfigModal/>
      </S.Box>
  )
}

export default DataConfig

