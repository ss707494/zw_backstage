import React, {useEffect} from 'react'
import {S} from './style'

import Button from "@material-ui/core/Button"
import {StyleTableBox} from "@/common/style/tableBox"
import {PaginationByModel} from "@/component/Pagination"
import CircularProgress from "@material-ui/core/CircularProgress"
import {TableRow, useTheme} from "@material-ui/core"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {formatDate} from "@/common/utils"
import {useStoreModel} from '@/common/ModelAction/useStore'
import {listModel} from "@/views/AddProduct/List/model"
import {productSupplementListGraphql} from "@/views/AddProduct/List/addProductGraphql"

export const AddProduct = () => {
  const theme = useTheme()
  const model = useStoreModel(listModel)
  const {state, actions} = model
  const listLoad = state.fetchLoad[productSupplementListGraphql]
  const listData = state.listData

  useEffect(() => {
    actions.getList({})
  }, [actions])

  return (
      <StyleTableBox.Box>
        <header>
          <StyleTableBox.HeaderBox>
            <header>补货列表</header>
            <section>您可以进行管理</section>
            <main>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {}}
              >
                生成补货单
              </Button>
            </main>
          </StyleTableBox.HeaderBox>
        </header>
        <main>
          {(listLoad) ? <S.Loading><CircularProgress/></S.Loading>
              : <StyleTableBox.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    {['补货单编号', '创建时间', '订单详情']
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listData?.map((e: any) => <TableRow key={`TableBody${e?.id}`}>
                    <TableCell>{e?.number}</TableCell>
                    <TableCell>{formatDate(new Date(e?.create_time), 'yyyy/MM/dd HH:mm')}</TableCell>
                    <TableCell>
                      <StyleTableBox.ActionTableCell>
                        <Button
                            color="secondary"
                            onClick={() => {
                              if (e.addItemList.length) {
                              }
                            }}
                            variant="contained"
                        >详情</Button>
                      </StyleTableBox.ActionTableCell>
                    </TableCell>
                  </TableRow>)}
                </TableBody>
              </StyleTableBox.Table>
          }
          <PaginationByModel pageModel={model}/>
        </main>
      </StyleTableBox.Box>
  )
}

export default AddProduct

