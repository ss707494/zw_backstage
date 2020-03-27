import React from 'react'
import { MenuItem, TableRow } from '@material-ui/core'
import { S } from './style'
import CircularProgress from "@material-ui/core/CircularProgress";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { CusSelect } from '@/component/CusSelect'
import { Pagination, useInitState as useInitPageData } from '@/component/Pagination'
import { EditModal, useInitState } from '../EditModal'
import { CusButton as Button } from '@/component/CusButton'
import { CusTableCell as TableCell } from '@/component/CusTableCell'
import { showConfirm } from "@/component/ConfirmDialog";
import { gql } from "apollo-boost";
import { useMutationGraphql, useQueryGraphql } from "@/component/ApolloQuery";
import { save_category } from "@/views/Category/category.graphql";
import { dealNumberZero } from '@/common/utils.ts'

const dealSort = sort => {
  const _sortHelp = {
    1: ['create_time desc'],
    2: ['create_time asc'],
    3: ['number desc'],
    4: ['number asc'],
  }
  return ({
    // SortType: [1, 2].includes(sort) ? 1 : 2,
    // IsAsc: [1, 3].includes(sort) ? 0 : 1,
    sort_type: [..._sortHelp[sort], 'id'].join(',')
  });
}

export const categoryGraphql = {
  getCategoryList: gql`
      query (
          $parent_id: String,
          $rows_per_page: Int,
          $page: Int,
          $full_parent_id: String
          $sort_type: String
      ){
          category_list(CategoryInput: {
              parent_id: $parent_id
              full_parent_id: $full_parent_id
              rows_per_page: $rows_per_page
              page: $page
              sort_type: $sort_type
          }) {
              id
              name
              parent_id
              number
              full_parent_id
              create_time
              c2_name
              c2_id
              c3_name
              c3_id
              p2_name
              p2_num
              p2_id
              p3_num
              p3_name
              p3_id
              img_url
              is_enable
          }
          category_total(CategoryInput: {
              parent_id: $parent_id
              full_parent_id: $full_parent_id
          })
      }
  `
}

export const Category = ({ theme }) => {
  const pageState = useInitPageData()
  const editModalState = useInitState()
  const { editClick } = editModalState
  const [search, setSearch] = React.useState({
    type: '',
    sort: 1,
  })
  const [getTypeOptionOne, { category_list: typeOptionOne = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)

  const [getList, { category_list: listData = [], category_total: total }, listLoad] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [getTypeOptionTwo, { category_list: typeOptionTwo = [] }] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [setTypeEnable] = useMutationGraphql(save_category)

  const getListData = (param = {}) => {
    return getList({
      ...dealSort(1),
      ...search,
      ...pageState.pageData,
      ...param,
    });
  }
  React.useEffect(() => {
    getList({
      ...dealSort(1),
      page: 0,
      rows_per_page: 10,
    })
  }, [getList])
  React.useEffect(() => {
    getTypeOptionOne({
      parent_id: 'root'
    })
  }, [getTypeOptionOne])
  React.useEffect(() => {
    getList({
      ...dealSort(1),
      ...search,
      ...pageState.pageData,
    })
  }, [getList, pageState.pageData, search])

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
                    // getListData({
                    //   full_parent_id: _value === '' ? search.type : _value,
                    // })
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
                    setSearch({
                      ...search,
                      ...dealSort(v.target.value),
                      sort: v.target.value
                    })
                    // getListData(dealSort(v.target.value))
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
                    <TableCell>{
                      !e?.p2_num
                          ? `${dealNumberZero(2)(e?.number)}0000`
                          : !e?.p3_num ? `${dealNumberZero(2)(e?.p2_num)}${dealNumberZero(2)(e?.number)}00`
                          : `${dealNumberZero(2)(e?.p3_num)}${dealNumberZero(2)(e?.p2_num)}${dealNumberZero(2)(e?.number)}`
                    }</TableCell>
                    <TableCell>{e?.name}</TableCell>
                    <TableCell>{e?.name}</TableCell>
                    <TableCell>{e?.p2_name ?? ''}{e?.p3_name ? `-${e?.p3_name}` : ''}</TableCell>
                    <TableCell>
                      <S.ActionTableCell>
                        <Button
                            color="secondary"
                            onClick={editClick(e)}
                            variant="contained"
                        >编辑</Button>
                        <Button
                            color={e?.is_enable ? 'primary' : 'default'}
                            variant="contained"
                            onClick={() => {
                              showConfirm({
                                message: `确定${e?.is_enable ? '停用' : '启用'}该类别吗`,
                                callBack: async res => {
                                  if (!res) return
                                  await setTypeEnable({
                                    data: {
                                      id: e.id,
                                      is_enable: e?.is_enable ? 0 : 1
                                    },
                                  })
                                  getListData()
                                }
                              });
                            }}
                        >{e?.is_enable ? '停用' : '启用'}</Button>
                      </S.ActionTableCell>
                    </TableCell>
                  </TableRow>)
                  }
                </TableBody>
              </S.Table>
          }
          <Pagination
              {...pageState}
              count={~~total}
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

