import React from "react"
import {CusButton} from "@/component/CusButton"
import styled from "styled-components"
import {showMessage} from "@/component/Message"
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {configDataModel} from '@/views/DataConfig/List/model'
import {saveDataConfig} from '@/common/graphqlTypes/graphql/doc'

const HeaderActionBox = styled.div`
  margin-bottom: 18px;
`

export const HeaderAction = () => {
  const {actions, getLoad} = useStoreModelByType__Graphql(configDataModel)

  return (
      <HeaderActionBox>
        <CusButton
            loading={getLoad(saveDataConfig)}
            variant={"contained"}
            color={"primary"}
            onClick={async () => {
              const res = await actions.saveDataConfig()
              if (res) {
                showMessage({ message: '操作成功' })
              }
            }}
        >保存</CusButton>
      </HeaderActionBox>
  )
}
