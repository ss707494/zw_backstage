import React, {useCallback, useEffect} from "react";
import {contentWithLeftBox as S} from "@/common/style/contentWithLeftBox";
import {ConfigGroup} from "@/views/DataConfig/ConfigGroup/ConfigGroup";
import {useQueryGraphql} from "@/component/ApolloQuery";
import {getDataConfigGraphql} from "@/views/DataConfig/configGroup";
import { DictTypeEnum } from "@/common/enum";

const leftMenu: DictType[] = [
  {
    name: '团购参数设置',
    code: DictTypeEnum.GroupPrecision
  }
]

const configCom = {
  [leftMenu[0].code]: ConfigGroup

}

export const DataConfig = ({theme}: { theme: any }) => {
  const [activeCode, setActiveCode] = React.useState(leftMenu[0].code)
  const [getDataConfig, {data_config: dataConfig}, ] = useQueryGraphql(getDataConfigGraphql)
  useEffect(() => {
        getDataConfig({
          data: {
            type: leftMenu[0].code,
          }
        })
      }, [getDataConfig]
  )

  const changeActiveCode = useCallback((activeCode: string) => () => {
    setActiveCode(activeCode)
    // return getDictItemList({
    //   data: {
    //     dict_type_code: activeCode,
    //   },
    // })
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
          {configCom[activeCode] ? configCom[activeCode]({theme, dataConfig})
              : <div/>
          }
        </S.RightBox>
      </S.Box>
  )
}

export default DataConfig

