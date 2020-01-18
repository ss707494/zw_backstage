import React, {useEffect, useState} from "react";
import {merge} from "lodash";
import {useMutationGraphql, useQueryGraphql} from "@/component/ApolloQuery";
import {getDictItemListGraphql} from "@/views/Dictionary/List/dictionaryGraphql";
import {ConfigGroupStyleBox, SettingBox, Title, TextField} from "@/views/DataConfig/ConfigGroup/ConfigGroupStyle";
import {CusButton} from "@/component/CusButton";
import {gql} from "apollo-boost";
import {dealNonBooleanProps} from "@/common/utils";

export const setDataConfigGraphql = gql`
    mutation($data: DataConfigInput) {
        set_data_config(dataConfigInput: $data) {
            flag
        }
    }
`

export const ConfigGroup = ({dataConfig = {}}: any) => {
  const [getDictItemList, {dict_item_list: dictItemList},] = useQueryGraphql(getDictItemListGraphql)
  const [configData, setConfigData] = useState<any>({})
  const [setDataConfig, , setDataConfigLoading] = useMutationGraphql(setDataConfigGraphql)

  useEffect(() => {
    setConfigData(dataConfig?.value)
  }, [dataConfig.value])
  useEffect(() => {
    if (!dataConfig?.type) return
    getDictItemList({
      data: {
        dict_type_code: dataConfig?.type,
      }
    })
  }, [dataConfig?.type, getDictItemList])

  console.log(configData)
  return (
      <ConfigGroupStyleBox>
        <header>
          <CusButton
              loading={dealNonBooleanProps(setDataConfigLoading)}
              variant={"contained"}
              color={"primary"}
              onClick={() => {
                setDataConfig({
                  data: {
                    type: dataConfig.type,
                    value: configData,
                  }
                })
              }}
          >保存</CusButton>
        </header>
        <main>
          <Title>打折设置</Title>
          <SettingBox>
            <div>名称</div>
            <div>分团份数</div>
            <div>分团折扣</div>
            {dictItemList?.map((e: DictItem) => <React.Fragment key={`dictItemList${e.code}`}>
              <section>
                <TextField
                    label={e.name}
                    value={configData?.[e.code]?.groups}
                    onChange={(event: any) => {
                      setConfigData(merge({}, configData, {
                        [e.code]: {
                          groups: (event.target.value),
                        },
                      }))
                    }}
                />
              </section>
              <main>
                <TextField
                    label={''}
                    value={configData?.[e.code]?.discount}
                    onChange={(event: any) => setConfigData(merge({}, configData, {
                      [e.code]: {
                        discount: (event.target.value),
                      },
                    }))}
                />
              </main>
            </React.Fragment>)}
          </SettingBox>
        </main>
      </ConfigGroupStyleBox>
  )
}
