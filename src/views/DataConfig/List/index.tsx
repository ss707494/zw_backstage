import React, {useCallback, useEffect} from "react";
import {contentWithLeftBox as S} from "@/common/style/contentWithLeftBox";
import {ConfigGroup} from "@/views/DataConfig/ConfigGroup/ConfigGroup";
import {useQueryGraphql} from "@/component/ApolloQuery";
import {getDataConfigGraphql} from "@/views/DataConfig/configGroup";
import {DictTypeEnum} from "@/common/enum";
import {ConfigUserLevel} from "@/views/DataConfig/ConfigUserLevel/ConfigUserLevel";
import {useParams} from "react-router-dom"
import history from "@/common/history";
import {ConfigFreight} from "@/views/DataConfig/ConfigFreight/ConfigFreight";
import ConfigHelpDocumentation from "@/views/DataConfig/ConfigHelpDocumentation/ConfigHelpDocumentation";

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
    name: '运费设置',
    code: DictTypeEnum.Freight,
  },
  {
    name: '帮助文档设置',
    code: DictTypeEnum.HelpDocumentation,
  },
]

const configCom: { [key: string]: any } = {
  [DictTypeEnum.GroupPrecision]: ConfigGroup,
  [DictTypeEnum.UserLevel]: ConfigUserLevel,
  [DictTypeEnum.Freight]: ConfigFreight,
  [DictTypeEnum.HelpDocumentation]: ConfigHelpDocumentation,
}

export const DataConfig = () => {
  const routerParams = useParams<any>()
  const activeCode = routerParams?.dictType
  // const [activeCode, setActiveCode] = React.useState(leftMenu[0].code)
  const [getDataConfig, {data_config: dataConfig},] = useQueryGraphql(getDataConfigGraphql)

  useEffect(() => {
        getDataConfig({
          data: {
            type: activeCode,
          }
        })
      }, [activeCode, getDataConfig]
  )

  const changeActiveCode = useCallback((newCode: string) => () => {
    history.push(`/dataConfig/${newCode}`)
  }, [])

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
                      onClick={changeActiveCode(e.code)}
                  >
                    {e.name}
                  </S.LeftCard>
          )}
        </S.LeftBox>
        <S.RightBox>
          {configCom[activeCode]?.({dataConfig}) ?? <div/>}
        </S.RightBox>
      </S.Box>
  )
}

export default DataConfig

