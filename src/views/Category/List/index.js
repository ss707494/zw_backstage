import React from 'react'
import { MenuItem, TableRow } from '@material-ui/core'
import { S } from './style'
import CircularProgress from "@material-ui/core/CircularProgress";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { CusSelect } from '@/component/CusSelect'
import { Pagination, useInitState as useInitPageData } from '@/component/Pagination'
import { EditModal, useInitState } from '../EditModal'
import { api } from '@/common/api'
import { CusButton as Button } from '@/component/CusButton'
import { CusTableCell as TableCell } from '@/component/CusTableCell'
import { showConfirm } from "@/component/ConfirmDialog";
import { gql } from "apollo-boost";
import { useQueryGraphql } from "@/component/ApolloQuery";

const defaultOption = {
  Type: 1
}

export const categoryGraphql = {
  getCategoryList: gql`
      query (
          $parent_id: String,
          $rows_per_page: Int,
          $page: Int,
          $full_parent_id: String
      ){
          category_list(CategoryInput: {
              parent_id: $parent_id
              full_parent_id: $full_parent_id
              rows_per_page: $rows_per_page
              page: $page
          }) {
              id
              name
              parent_id
              number
              full_parent_id
          }
      }
  `
}

export const postQueryCommodityTypeChildren = () => api.post('/Products/QueryCommodityTypeChildren', defaultOption)

export const Category = ({ theme }) => {
  const pageState = useInitPageData()
  const editModalState = useInitState()
  const { editClick } = editModalState
  const [search, setSearch] = React.useState({
    type: '',
    sort: 1,
  })
  const [getTypeOptionOne, { category_list: typeOptionOne = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)

  const [getList, { category_list: listData = [] }, listLoad] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [getTypeOptionTwo, { category_list: typeOptionTwo = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [setTypeEnable] = api.post('/Products/SetCommodityTypeEnable')

  const getListData = (param = {}) => {
    console.log({
      ...search,
      ...pageState.pageData,
      ...param,
    })

    return getList({
      ...search,
      ...pageState.pageData,
      ...param,
    });
  }
  React.useEffect(() => {
    getList({
      page: 0,
      rows_per_page: 10,
    })
  }, [getList])
  React.useEffect(() => {
    getTypeOptionOne({
      parent_id: ''
    })
  }, [getTypeOptionOne])

  return (
      <S.Box>
        <header>
          <S.HeaderBox>
            <header>产品类别</header>
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
                      full_parent_id: v.target.value,
                      type: v.target.value,
                      typeTwo: ''
                    })
                    if (v?.target?.value) {
                      getTypeOptionTwo({
                        parent_id: v.target.value,
                      })
                    }
                    getListData({
                      full_parent_id: v.target.value,
                    })
                  }}
                  value={search.type}
                  clear={1}
                  placeholder="全部"
              >
                {typeOptionOne?.map(e => (
                    <MenuItem
                        key={`typeOptionOne${e.id}`}
                        value={e.id}
                    >{e.name}</MenuItem>
                ))}
              </CusSelect>
              <CusSelect
                  onChange={(v) => {
                    const _value = v?.target?.value
                    setSearch({
                      ...search,
                      full_parent_id: _value === '' ? search.type : _value,
                      typeTwo: _value
                    })
                    getListData({
                      full_parent_id: v.target.value,
                    })
                  }}
                  value={search.typeTwo}
                  clear={1}
                  placeholder="全部"
              >
                {typeOptionTwo.map(e => (
                    <MenuItem
                        key={`typeOptionTwo${e.id}`}
                        value={e.id}
                    >{e.name}</MenuItem>
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
                  {listData?.map(e => <TableRow
                      key={`TableBody${e?.id}`}>
                    <TableCell>{e?.number}</TableCell>
                    <TableCell>{e?.name}</TableCell>
                    <TableCell>{e?.name}</TableCell>
                    <TableCell>{e?.name}</TableCell>
                    <TableCell>
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
                    </TableCell>
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

export default Category

