import React from 'react'
import { S } from './style'

import Button from "@material-ui/core/Button";
import { StyleTableBox } from "@/common/style/tableBox";
import { useQueryGraphql } from "@/component/ApolloQuery";
import { showMessage } from "@/component/Message";
import { useInitState as useWaitListInitState, WaitListModal } from "@/views/AddProduct/WaitListModal";
import { productSupplementListGraphql } from "@/views/AddProduct/List/addProductGraphql";
import { Pagination, useInitState as useInitPageData } from "@/component/Pagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TableRow } from "@material-ui/core";
import { CusTableCell as TableCell } from "@/component/CusTableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

export const AddProduct = ({ theme }) => {
  const pageState = useInitPageData()
  const waitListModalState = useWaitListInitState()
  const { editClick: waitListModalOpen } = waitListModalState
  const [getList, { product_supplement_list: listData, product_supplement_list_total: total }, listLoad] = useQueryGraphql(productSupplementListGraphql)
  const getAddProductList = async () => {
    const res = await getList()
    const _waitList = res?.product_list?.filter(v => v.stock < 0)
    if (!_waitList.length) {
      showMessage({ message: '暂无需要补货的商品' })
      return
    }

    waitListModalOpen({
      waitList: _waitList.map(e => ({
        ...e,
        addNumber: -e?.stock,
        addPrice: e.price_in,
      }))
    })()
  }

  React.useEffect(() => {
    getList({
      data: {
        ...pageState.pageData,
      }
    })
  }, [getList, pageState.pageData])

  return (
      <StyleTableBox.Box>
        <header>
          <StyleTableBox.HeaderBox>
            <header>产品列表</header>
            <section>您可以进行管理</section>
            <main>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getAddProductList()}
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
                    {['补货单编号',]
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listData?.map(e => <TableRow key={`TableBody${e?.id}`}>
                    <TableCell>{e?.number}</TableCell>
                  </TableRow>)}
                </TableBody>

              </StyleTableBox.Table>
          }
          <Pagination
              {...pageState}
              count={~~total}
              refresh={getList}
          />
        </main>
        <WaitListModal
            theme={theme}
            {...waitListModalState}
        />
      </StyleTableBox.Box>
  )
}

export default AddProduct

