import React, {useEffect, useState} from "react";
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction";
import {Title} from "../component/Title/Title";
import {TextField} from "@/views/DataConfig/component/TextField";
import {fpMerge, fpRemove, fpSet} from "@/common/utils";
import {CusButton} from "@/component/CusButton";
import styled from "styled-components";

const Box = styled("div")`
  > main {
    > footer {
      margin-top: 10px;
    }
  }

`
const TableStyle = styled('div')`
  display: grid;
  grid-template-columns: repeat(5, minmax(160px, 240px));
  > * {
    padding: 6px;
  }
`

export const ConfigFreight = ({dataConfig = {}}: any) => {
  const [configData, setConfigData] = useState<any>({})

  useEffect(() => {
    setConfigData(dataConfig?.value)
  }, [dataConfig.value])

  return (
      <Box>
        <HeaderAction
            dataConfig={dataConfig}
            configData={configData}
        />
        <main>
          <Title>运费</Title>
          <TableStyle>
            <header>操作</header>
            <aside>名称</aside>
            <main>订单金额-最小</main>
            <main>订单金额-最大</main>
            <main>运费</main>
          </TableStyle>
          {configData?.freightList?.map((e: any, i: number) => <TableStyle
              key={`configData?.freightList_${i}`}
          >
            <header>
              <CusButton
                  variant={"contained"}
                  onClick={() => {
                    setConfigData(fpSet(configData, 'freightList', fpRemove(configData?.freightList, i)))
                  }}
              >删除</CusButton>
            </header>
            <aside>
              <TextField
                  label={''}
                  value={e?.name}
                  onChange={(event: any) => {
                    setConfigData(fpSet(configData, ['freightList', i, 'name'], (event.target.value)))
                  }}
              />
            </aside>
            {['orderMin', 'orderMax', 'freightPay'].map((key) => <main key={`freightListData_${key}`}>
              <TextField
                  label={''}
                  value={e?.[key]}
                  onChange={(event: any) => {
                    setConfigData(fpSet(configData, ['freightList', i, key], (event.target.value)))
                  }}
              />
            </main>)
            }
          </TableStyle>)
          }
          <footer>
            <CusButton
                variant={"contained"}
                onClick={() => {
                  setConfigData(fpMerge(configData, {
                    freightList: [
                      ...configData?.freightList ?? [],
                      {}
                    ]
                  }))
                }}
            >添加</CusButton>
          </footer>
        </main>
      </Box>
  )
}
