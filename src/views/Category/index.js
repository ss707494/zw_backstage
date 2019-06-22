import React from 'react'
import { Button, MenuItem, TableRow } from '@material-ui/core'
import FormHelperText from "@material-ui/core/FormHelperText";
import { CusSelect } from '@/component/CusSelect'
import { api } from '@/common/api'
import { S } from './style'
import Table from "@material-ui/core/Table";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

export const Category = () => {
  const [search, setSearch] = React.useState({
    type: '',
    sort: '',
  })
  const [getList, listData = {}, listLoad] = api.post('/Products/QueryCommodityType')
  React.useEffect(() => {
    // getList()
  }, [getList])
  console.log(listData)

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
              : <Table>
                <TableHead>
                  <TableRow>
                    {['类别序号', '中文名称', '英文名称', '产品种类']
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listData?.data?.map(e => <TableRow>
                    <TableCell key={`TableBody${e.F_CTID}`}>{e.F_CTNameC}</TableCell>
                    <TableCell>
                      <Button
                          variant="contained"
                      >编辑</Button>
                      <Button
                          variant="contained"
                      >启用</Button>
                    </TableCell>
                  </TableRow>)
                  }
                </TableBody>
              </Table>
          }
        </main>
      </S.Box>
  )
}

export default {
  props: {
    path: '/category',
    component: Category,
  },
}

