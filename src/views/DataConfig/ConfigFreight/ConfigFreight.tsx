import React from "react"
import {HeaderAction} from "@/views/DataConfig/component/HeaderAction/HeaderAction"
import {Title} from "../component/Title/Title"
import {TextField} from "@/views/DataConfig/component/TextField"
import {fpMerge, fpRemove, fpSet} from "@/common/utils"
import {CusButton} from "@/component/CusButton"
import styled from "styled-components"
import {useStoreModelByType__Graphql} from '@/common/ModelAction/useStore'
import {configDataModel} from '@/views/DataConfig/List/model'

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

export const ConfigFreight = () => {
  const {state, actions} = useStoreModelByType__Graphql(configDataModel)
  const {dataConfig} = state
  const {setDataConfig} = actions
  const {value} = dataConfig
  // const [configData, setConfigData] = useState<any>({})

  return (
      <Box>
        <HeaderAction />
        <main>
          <Title>运费</Title>
          <TableStyle>
            <header>操作</header>
            {/*<aside>名称</aside>*/}
            <main>订单金额-最小</main>
            <main>订单金额-最大</main>
            <main>运费</main>
          </TableStyle>
          {value?.freightList?.map((e: any, i: number) => <TableStyle
              key={`configData?.freightList_${i}`}
          >
            <header>
              <CusButton
                  variant={"contained"}
                  onClick={() => {
                    setDataConfig(fpSet(value, 'freightList', fpRemove(value?.freightList, i)))
                  }}
              >删除</CusButton>
            </header>
            {/*<aside>*/}
            {/*  <TextField*/}
            {/*      label={''}*/}
            {/*      value={e?.name}*/}
            {/*      onChange={(event: any) => {*/}
            {/*        setDataConfig(fpSet(value, ['freightList', i, 'name'], (event.target.value)))*/}
            {/*      }}*/}
            {/*  />*/}
            {/*</aside>*/}
            <main style={{paddingLeft: 20}}>
              {i === 0 ? 0 : value?.freightList[i - 1].orderMax}
            </main>
            {['orderMax', 'freightPay'].map((key) => <main key={`freightListData_${key}`}>
              <TextField
                  label={''}
                  value={e?.[key]}
                  onChange={(event: any) => {
                    setDataConfig(fpSet(value, ['freightList', i, key], (event.target.value)))
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
                  setDataConfig(fpMerge(value, {
                    freightList: [
                      ...value?.freightList ?? [],
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
