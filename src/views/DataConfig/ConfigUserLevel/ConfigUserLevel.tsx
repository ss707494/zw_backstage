import React, {useEffect, useState} from "react";
import {useQuerySimpleData} from "@/component/ApolloQuery";
import {getDictItemListGraphql} from "@/views/Dictionary/List/dictionaryGraphql";
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction";
import {CusTextField} from "@/component/CusTextField";
import {merge} from "lodash";
import styled from "styled-components";
import {Title} from "@/views/DataConfig/component/Title/Title";


const MainBox = styled.main`
  max-width: 400px;
`

export const ConfigUserLevel = ({dataConfig = {}}: any) => {

  const [getDictItemList, {dict_item_list: dictItemList},] = useQuerySimpleData(getDictItemListGraphql)
  const [configData, setConfigData] = useState<any>({})
  useEffect(() => {
    setConfigData(dataConfig?.value)
  }, [dataConfig.value])

  useEffect(() => {
    if (!dataConfig?.type) return
    getDictItemList({
      dict_type_code: dataConfig?.type,
    })
  }, [dataConfig?.type, getDictItemList])

  return (
      <div>
        <HeaderAction
            dataConfig={dataConfig}
            configData={configData}
        />
        <MainBox>
          <Title>用户折扣</Title>
          {dictItemList?.map((v: DictItem) => <CusTextField
              key={`dictItemList?.map${v.name}`}
              label={v?.name}
              value={configData?.[v.code]}
              onChange={(event: any) => {
                setConfigData(merge({}, configData, {
                  [v.code]: (event.target.value),
                }))
              }}
          />)
          }
        </MainBox>
      </div>
  )
}
