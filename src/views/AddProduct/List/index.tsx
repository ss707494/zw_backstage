import React, {useEffect} from 'react'
import {S} from './style'
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
import {waitListModel} from "@/views/AddProduct/WaitListModal/model"
import {dealWaitItem, WaitListModal} from "@/views/AddProduct/WaitListModal"
import {ProductSupplementString} from 'ss_common/enum'
import {CusButton} from "@/component/CusButton"
import {productGraphql} from "@/views/Product/List/productGraphql"


export const AddProduct = () => {
  const theme = useTheme()
  const model = useStoreModel(listModel)
  const {state, actions, getLoad} = model
  const listLoad = getLoad(productSupplementListGraphql)
  const listData = state.listData

  const {actions: waitActions} = useStoreModel(waitListModel)

  useEffect(() => {
    console.log(actions.getList)
    waitActions.setRefreshCall(actions.getList)
  }, [actions.getList, waitActions])

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
              <CusButton
                  variant="contained"
                  color="primary"
                  loading={getLoad(productGraphql.getList)}
                  onClick={async () => {
                    const waitList = await actions.getAddProductList({})
                    waitActions.openEditClick({
                      data: {
                        waitList,
                      }
                    })
                  }}
              >
                生成补货单
              </CusButton>
            </main>
          </StyleTableBox.HeaderBox>
        </header>
        <main>
          {(listLoad) ? <S.Loading><CircularProgress/></S.Loading>
              : <StyleTableBox.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    {['补货单编号', '创建时间', '补货单状态', '订单详情']
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
                    <TableCell>{ProductSupplementString[e?.state]}</TableCell>
                    <TableCell>
                      <StyleTableBox.ActionTableCell>
                        <CusButton
                            color="secondary"
                            onClick={() => {
                              waitActions.openEditClick({
                                data: {
                                  ...e,
                                  waitList: e?.addItemList.map(dealWaitItem),
                                }
                              })
                              console.log(e)
                            }}
                            variant="contained"
                        >编辑</CusButton>
                        <CusButton
                            color="secondary"
                            onClick={() => {
                              if (e.addItemList.length) {
                              }
                            }}
                            variant="contained"
                        >详情</CusButton>
                      </StyleTableBox.ActionTableCell>
                    </TableCell>
                  </TableRow>)}
                </TableBody>
              </StyleTableBox.Table>
          }
          <PaginationByModel pageModel={model}/>
        </main>
        <WaitListModal/>
      </StyleTableBox.Box>
  )
}

export default AddProduct

