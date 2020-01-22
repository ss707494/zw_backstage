import React from "react";
import {CusButton} from "@/component/CusButton";
import {dealNonBooleanProps} from "@/common/utils";
import styled from "styled-components";
import {useMutationGraphql} from "@/component/ApolloQuery";
import {gql} from "apollo-boost";
import {showMessage} from "@/component/Message";

export const setDataConfigGraphql = gql`
    mutation($data: DataConfigInput) {
        set_data_config(dataConfigInput: $data) {
            flag
            msg
        }
    }
`

const HeaderActionBox = styled.div`
  margin-bottom: 18px;
`

export const HeaderAction = ({dataConfig, configData}: {dataConfig: DataConfig, configData: object}) => {
  const [setDataConfig, , setDataConfigLoading] = useMutationGraphql(setDataConfigGraphql)

  return (
      <HeaderActionBox>
        <CusButton
            loading={dealNonBooleanProps(setDataConfigLoading)}
            variant={"contained"}
            color={"primary"}
            onClick={async () => {
              const {
                set_data_config: {
                  flag,
                  msg,
                }
              } = await setDataConfig({
                data: {
                  type: dataConfig.type,
                  value: configData,
                }
              })
              if (flag) {
                showMessage({ message: msg || '操作成功' })
              }
            }}
        >保存</CusButton>
      </HeaderActionBox>
  )
}
