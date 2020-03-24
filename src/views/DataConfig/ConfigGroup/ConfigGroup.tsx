import React, {useEffect} from "react"
import {merge} from "lodash"
import {useQueryGraphql} from "@/component/ApolloQuery"
import {getDictItemListGraphql} from "@/views/Dictionary/List/dictionaryGraphql"
import {ConfigGroupStyleBox, GroupDiscountBox, SettingBox} from "@/views/DataConfig/ConfigGroup/ConfigGroupStyle"
import {parseFloatForInput} from "@/common/utils"
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction"
import {Title} from "../component/Title/Title"
import {TextField} from "@/views/DataConfig/component/TextField"
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {configDataModel} from '@/views/DataConfig/List/model'

export const ConfigGroup = () => {
  const [getDictItemList, {dict_item_list: dictItemList},] = useQueryGraphql(getDictItemListGraphql)
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  const {value: configData} = dataConfig
  const {setDataConfig: setConfigData} = actions

  useEffect(() => {
    if (!dataConfig?.type) return
    getDictItemList({
      data: {
        dict_type_code: dataConfig?.type,
      }
    })
  }, [dataConfig?.type, getDictItemList])

  return (
      <ConfigGroupStyleBox>
        <HeaderAction
        />
        <main>
          <Title>成团折扣</Title>
          <GroupDiscountBox>
            <TextField
                label={''}
                value={configData?.groupDiscount}
                onChange={(event: any) => {
                  setConfigData(merge({}, configData, {
                    groupDiscount: (event.target.value),
                  }))
                }}
            />
          </GroupDiscountBox>
          <Title>打折设置</Title>
          <SettingBox>
            <div>名称</div>
            <div>分团份数</div>
            <div>分团折扣</div>
            {dictItemList?.map((e: DictItem) => {
              const groups = configData?.[e.code]?.groups
              return <React.Fragment key={`dictItemList${e.code}`}>
                <header>{e.name}</header>
                <section>
                  <TextField
                      label={''}
                      value={groups}
                      onChange={(event: any) => {
                        setConfigData(merge({}, configData, {
                          [e.code]: {
                            groups: parseFloatForInput(event.target.value),
                          },
                        }))
                      }}
                  />
                </section>
                <main>
                  {Array(~~groups).fill(1).map((v, index: number) => <TextField
                          key={`Array(~~groups)${index}`}
                          label={`${index + 1}`}
                          value={configData?.[e.code]?.discount?.[index + 1]}
                          onChange={(event: any) => setConfigData(merge({}, configData, {
                            [e.code]: {
                              discount: Array(~~groups).fill(1).reduce((pre, v, discountIndex) => ({
                                ...pre,
                                ...(discountIndex < index ? {} : {
                                  [discountIndex + 1]: (event.target.value),
                                })
                              }), {}),
                            },
                          }))}
                      />
                  )
                  }
                </main>
              </React.Fragment>;
            })}
          </SettingBox>
        </main>
      </ConfigGroupStyleBox>
  )
}
