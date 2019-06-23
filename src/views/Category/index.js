import React from 'react'
import { MenuItem, TableRow } from '@material-ui/core'
import FormHelperText from "@material-ui/core/FormHelperText";
import { S } from './style'
import CircularProgress from "@material-ui/core/CircularProgress";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { CusSelect } from '@/component/CusSelect'
import { Pagination, useInitState as useInitPageData } from '@/component/Pagination'
import { EditModal, useInitState } from './EditModal'
import { api } from '@/common/api'
import { CusButton as Button } from '@/component/CusButton'
import { CusTableCell as TableCell } from '@/component/CusTableCell'


export const Category = ({ theme }) => {
  const pageState = useInitPageData()
  const editModalState = useInitState()
  const { editClick } = editModalState
  const [search, setSearch] = React.useState({
    type: '',
    sort: '',
  })
  const [getList, listData = {}, listLoad] = api.post('/Products/QueryCommodityType')
  const getListData = (param = {}) => getList({
    sort: search.sort,
    ...pageState.pageData,
    ...param,
  })
  React.useEffect(() => {
    getList({
      sort: search.sort,
      ...pageState.pageData,
    })
  }, [getList, pageState.pageData, search.sort])
  // console.log(props)

  return (
      <S.Box>
        <header>
          <section>
            <header>产品类别</header>
            <section>进行管理</section>
            <main>
              <Button
                  variant="contained"
                  color="inherit"
                  onClick={editClick({})}
              >
                新增
              </Button>
            </main>
          </section>
          <section>
            <header>类别筛选</header>
            <main>
              <CusSelect
                  onChange={(v) => {
                    setSearch({
                      ...search,
                      type: v.target.value
                    })
                  }}
                  value={search.type}
                  placeholder="223344"
              >
                <MenuItem
                    key={'123'}
                    value={'123'}
                >123</MenuItem>
                <MenuItem
                    key={'1234'}
                    value={'1234'}
                >1234</MenuItem>
              </CusSelect>
              <FormHelperText>Placeholder</FormHelperText>
            </main>
          </section>
          <section>
            <header>类别排序</header>
            <main>
              <CusSelect
                  placeholder="选择排序"
                  value={search.sort}
                  onChange={(v) => {
                    setSearch({
                      ...search,
                      sort: v.target.value
                    })
                  }}
              >
                <MenuItem value={'234'}>123</MenuItem>
              </CusSelect>
            </main>
          </section>
        </header>
        <main>
          {(listLoad) ? <S.Loading><CircularProgress/></S.Loading>
              : <S.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    {['类别序号', '中文名称', '英文名称', '产品种类']
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                    <TableCell width={150}>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listData?.data?.map(e => <TableRow
                      key={`TableBody${e.F_CTID}`}>
                    <TableCell>{e.F_CTNameC}</TableCell>
                    <TableCell>{e.F_CTNameC}</TableCell>
                    <TableCell>{e.F_CTNameC}</TableCell>
                    <TableCell>{e.F_CTNameC}</TableCell>
                    <S.ActionTableCell>
                      <Button
                          onClick={editClick(e)}
                          variant="contained"
                      >编辑</Button>
                      <Button
                          variant="contained"
                      >启用</Button>
                    </S.ActionTableCell>
                  </TableRow>)
                  }
                </TableBody>
              </S.Table>
          }
          <Pagination
              {...pageState}
              count={~~listData.maxCount}
              refresh={getListData}
          />
        </main>
        <EditModal
            {...editModalState}
        />
      </S.Box>
  )
}

export default {
  props: {
    path: '/category',
    component: Category,
  },
}

