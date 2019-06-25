import React from 'react'
import { MenuItem, TableRow } from '@material-ui/core'
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
import { showConfirm } from "@/component/ConfirmDialog"

export const Product = ({ theme }) => {
  const pageState = useInitPageData()
  const editModalState = useInitState()
  const { editClick } = editModalState
  const [search, setSearch] = React.useState({
    type: '',
    sort: 1,
  })
  const [getList, listData = {}, listLoad] = api.post('/Products/QueryCommodity')
  const [getTypeOptionOne, { data: typeOptionOne = [] }] = api.post('/Products/QueryCommodityTypeChildren')
  const [getTypeOptionTwo, { data: typeOptionTwo = [] }] = api.post('/Products/QueryCommodityTypeChildren')
  const [getTypeOptionThree, { data: typeOptionThree = [] }] = api.post('/Products/QueryCommodityTypeChildren')
  const [setTypeEnable] = api.post('/Products/SetCommodityTypeEnable')

  const getListData = (param = {}) => getList({
    ...search,
    ...pageState.pageData,
    ...param,
  })
  React.useEffect(() => {
    getList({
      BussinessID: '1',
      Page: 1,
      FloatPageCount: 10,
      ParentID: '',
      SortType: 1,
      F_CNameC: '',
      F_CNumber: '',
      F_CTID: '',
    })
    getTypeOptionOne()
  }, [getList, getTypeOptionOne])

  return (
      <S.Box>
        <header>
          <S.HeaderBox>
            <header>产品列表</header>
            <section>您可以进行管理</section>
            <main>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={editClick({})}
              >
                新增
              </Button>
            </main>
          </S.HeaderBox>
          <S.HeaderBox>
            <header>类别筛选</header>
            <main>
              <CusSelect
                  onChange={(v) => {
                    setSearch({
                      ...search,
                      ParentID: v.target.value,
                      type: v.target.value,
                      typeTwo: ''
                    })
                    getTypeOptionTwo({
                      ParentID: v.target.value
                    })
                    getListData({
                      ParentID: v.target.value,
                    })
                  }}
                  value={search.type}
                  placeholder="选择类别"
              >
                {typeOptionOne.map(e => (
                    <MenuItem
                        key={`typeOptionOne${e.F_CTID}`}
                        value={e.F_CTID}
                    >{e.F_CTNameC}</MenuItem>
                ))}
              </CusSelect>
              <CusSelect
                  onChange={(v) => {
                    setSearch({
                      ...search,
                      ParentID: v.target.value,
                      typeTwo: v.target.value
                    })
                    getListData({
                      ParentID: v.target.value,
                    })
                  }}
                  value={search.typeTwo}
                  placeholder="选择类别"
              >
                {typeOptionTwo.map(e => (
                    <MenuItem
                        key={`typeOptionTwo${e.F_CTID}`}
                        value={e.F_CTID}
                    >{e.F_CTNameC}</MenuItem>
                ))}
              </CusSelect>
            </main>
          </S.HeaderBox>
          <S.HeaderBox>
            <header>类别排序</header>
            <main>
              <CusSelect
                  placeholder="选择排序"
                  value={search.sort}
                  onChange={(v) => {
                    const dealSort = sort => ({
                      SortType: [1, 2].includes(sort) ? 1 : 2,
                      IsAsc: [1, 3].includes(sort) ? 0 : 1
                    })
                    setSearch({
                      ...search,
                      ...dealSort(v.target.value),
                      sort: v.target.value
                    })
                    getListData(dealSort(v.target.value))
                  }}
              >
                <MenuItem value={1}>按创建时间-降序</MenuItem>
                <MenuItem value={2}>按创建时间-升序</MenuItem>
                <MenuItem value={3}>按序号-降序</MenuItem>
                <MenuItem value={4}>按序号-升序</MenuItem>
              </CusSelect>
            </main>
          </S.HeaderBox>
          <S.HeaderBox>
            <header>类别排序</header>
            <main>
              <CusSelect
                  placeholder="选择排序"
                  value={search.sort}
                  onChange={(v) => {
                    const dealSort = sort => ({
                      SortType: [1, 2].includes(sort) ? 1 : 2,
                      IsAsc: [1, 3].includes(sort) ? 0 : 1
                    })
                    setSearch({
                      ...search,
                      ...dealSort(v.target.value),
                      sort: v.target.value
                    })
                    getListData(dealSort(v.target.value))
                  }}
              >
                <MenuItem value={1}>按创建时间-降序</MenuItem>
                <MenuItem value={2}>按创建时间-升序</MenuItem>
                <MenuItem value={3}>按序号-降序</MenuItem>
                <MenuItem value={4}>按序号-升序</MenuItem>
              </CusSelect>
            </main>
          </S.HeaderBox>
        </header>
        <main>
          {(listLoad) ? <S.Loading><CircularProgress/></S.Loading>
              : <S.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    {['商品编号', '中文名称', '图片', '热门', '新品', '库存', '进货价格', '市场价格', '售卖价格', '重量']
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                    <TableCell width={150}>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(window.ssLog(listData))?.data?.map(e => <TableRow
                      key={`TableBody${e?.ID}`}>
                    <TableCell>{e.GradeName}</TableCell>
                    <TableCell>{e?.F_CNameC}</TableCell>
                    <TableCell>{e?.F_CNameC}</TableCell>
                    <TableCell width={60}>{e?.F_CNameC}</TableCell>
                    <TableCell width={60}>{e?.F_CNameC}</TableCell>
                    <TableCell width={60}>{e?.Entry?.F_CNameC}</TableCell>
                    <TableCell>{e?.Entry?.F_CNameC}</TableCell>
                    <TableCell>{e.DisplayNumber}</TableCell>
                    <TableCell>{e?.Entry?.F_CNameC}</TableCell>
                    <TableCell>{e.DisplayNumber}</TableCell>
                    <S.ActionTableCell>
                      <Button
                          color="secondary"
                          onClick={editClick(e)}
                          variant="contained"
                      >编辑</Button>
                      <Button
                          color={e?.Entry?.F_CTIsEnable ? 'primary' : 'default'}
                          variant="contained"
                          onClick={() => {
                            showConfirm({
                              message: `确定${e?.Entry?.F_CTIsEnable ? '停用' : '启用'}该类别吗`,
                              callBack: async res => {
                                if (!res) return
                                await setTypeEnable({
                                  ID: e.Entry?.F_CTID,
                                  IsEnable: e?.Entry?.F_CTIsEnable ? 0 : 1
                                })
                                getListData()
                              }
                            });
                          }}
                      >{e?.Entry?.F_CTIsEnable ? '停用' : '启用'}</Button>
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
            refreshData={getListData}
        />
      </S.Box>
  )
}

export default {
  props: {
    path: '/product',
    component: Product,
  },
}

