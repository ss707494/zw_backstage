import React from 'react'
import { MenuItem, TableRow } from '@material-ui/core'
import CircularProgress from "@material-ui/core/CircularProgress";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { CusSelect } from '@/component/CusSelect'
import { Pagination, useInitState as useInitPageData } from '@/component/Pagination'
import { EditModal, useInitState } from '../EditModal'
import { AddNumberModal, useInitState as useInitAddNumber } from '../AddNumberModal'
import { api } from '@/common/api'
import { CusButton as Button } from '@/component/CusButton'
import { CusTableCell as TableCell } from '@/component/CusTableCell'
import { showConfirm } from "@/component/ConfirmDialog"
import { SearchInput } from "@/component/SearchInput";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { ImgPreview } from "@/component/ImgPreview"
import { CheckCircleRounded, RadioButtonUncheckedTwoTone } from '@material-ui/icons'
import { S } from './style'
import Link from "@material-ui/core/Link";
import { categoryGraphql } from "@/views/Category/List";
import { useMutationGraphql, useQueryGraphql } from "@/component/ApolloQuery";
import { productGraphql, save_product } from "@/views/Product/List/productGraphql";
import { dealImgUrl } from '@/component/ImgDealUrl/ImgDealUrl'

const KEYWORD_TYPE = {
  num: '1',
  name: '2'
}

const useTypeObj = () => {
  const [typeHelpObj, setTypeHelpObj] = React.useState({
    typeOne: '',
    typeTwo: '',
    typeThree: '',
  })
  const [getTypeOptionOne, { category_list: typeOptionOne }] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [getTypeOptionTwo, { category_list: typeOptionTwo }] = useQueryGraphql(categoryGraphql.getCategoryList)
  const [getTypeOptionThree, { category_list: typeOptionThree }] = useQueryGraphql(categoryGraphql.getCategoryList)
  // const [getTypeOptionOne, { data: typeOptionOne }] = postQueryCommodityTypeChildren()
  // const [getTypeOptionTwo, { data: typeOptionTwo }] = postQueryCommodityTypeChildren()
  // const [getTypeOptionThree, { data: typeOptionThree }] = postQueryCommodityTypeChildren()

  React.useEffect(() => {
    getTypeOptionOne({
      parent_id: ''
    })
  }, [getTypeOptionOne])
  React.useEffect(() => {
    if (!typeHelpObj.typeOne) {
      setTypeHelpObj(pre => ({
        ...pre,
        typeTwo: '',
        res: '',
      }))
    } else {
      getTypeOptionTwo({
        parent_id: typeHelpObj.typeOne,
        // ParentID: typeHelpObj.typeOne
      })
    }
  }, [getTypeOptionTwo, typeHelpObj.typeOne])
  React.useEffect(() => {
    setTypeHelpObj(pre => ({
      ...pre,
      ...(!typeOptionTwo?.length ? {
        res: pre.typeOne
      } : {}),
      typeTwo: typeOptionTwo?.[0]?.id || '',
    }))
  }, [typeOptionTwo])
  React.useEffect(() => {
    if (!typeHelpObj.typeTwo) {
      setTypeHelpObj(pre => ({
        ...pre,
        typeThree: '',
        res: pre.typeOne,
      }))
    } else {
      getTypeOptionThree({
        parent_id: typeHelpObj.typeTwo
      })
    }
  }, [getTypeOptionThree, typeHelpObj.typeTwo])
  React.useEffect(() => {
    setTypeHelpObj(pre => ({
      ...pre,
      ...(!typeOptionThree?.length ? {
        res: pre.typeTwo
      } : {}),
      typeThree: typeOptionThree?.[0]?.id || ''
    }))
  }, [typeOptionThree])
  React.useEffect(() => {
    setTypeHelpObj(pre => ({
      ...pre,
      res: typeHelpObj.typeThree || pre.typeTwo || pre.typeOne,
    }))
  }, [typeHelpObj.typeThree])

  return {
    typeHelpObj,
    setTypeHelpObj,
    typeOptionOne,
    typeOptionTwo,
    typeOptionThree
  }
}

export const Product = ({ theme, match }) => {
  const _is_group = ~~match?.params?.is_group ?? -1
  const pageState = useInitPageData()
  const editModalState = useInitState()
  const { editClick } = editModalState
  const addNumberModalState = useInitAddNumber()
  const { editClick: addNumberEditClick } = addNumberModalState
  const {
    typeHelpObj,
    setTypeHelpObj,
    typeOptionOne,
    typeOptionTwo,
    typeOptionThree
  } = useTypeObj()
  const [keywordObj, setKeywordObj] = React.useState({
    type: KEYWORD_TYPE.num,
    value: '',
  })
  const [search, setSearch] = React.useState({
    sort_type: '',
  })
  const [previewImg, setPreviewImg] = React.useState({
    open: false,
    data: []
  })
  const [getList, { product_list, product_total }, listLoad] = useQueryGraphql(productGraphql.getList)
  const listData = product_list?.length ? product_list : []

  const [updateData] = useMutationGraphql(save_product)

  const [exportCommodity] = api.post('/Products/ExportCommodity')
  const [importCommodity] = api.post('/Products/ImportCommodity')
  const getListData = (param = {}) => getList({
    data: {
      ...search,
      ...pageState.pageData,
      origin_category_id: search?.category_id ? search?.category_id : null,
      ...param,
      category_id: null,
      is_group: ~~match?.params?.is_group ?? -1,
    }
  })
  React.useEffect(() => {
    getList({
      data: {
        ...search,
        origin_category_id: search?.category_id ? search?.category_id : null,
        category_id: null,
        ...pageState.pageData,
        is_group: _is_group,
      }
    })
  }, [getList, search, pageState.pageData, _is_group])
  React.useEffect(() => {
    // if (!typeHelpObj.res) return
    setSearch(pre => ({
      ...pre,
      category_id: typeHelpObj.res || '',
    }))
  }, [typeHelpObj.res])
  // console.log(listData)

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
              <Button
                  variant="contained"
                  color="default"
                  onClick={async () => {
                    const res = await importCommodity()
                    if (res?.msg) {
                      showConfirm({
                        oneButton: true,
                        message: `${res.msg}`,
                        callBack: async () => {
                        }
                      })
                    }
                  }}
              >
                导入
              </Button>
              <Button
                  variant="contained"
                  color="default"
                  onClick={async () => {
                    const res = await exportCommodity()
                    if (res?.msg) {
                      showConfirm({
                        oneButton: true,
                        message: `${res.msg}`,
                        callBack: async () => {
                        }
                      })
                    }
                  }}
              >
                导出
              </Button>
            </main>
          </S.HeaderBox>
          <S.HeaderBox>
            <header>名称搜索</header>
            <main>
              <SearchInput
                  value={keywordObj.value}
                  onChange={e => {
                    return setKeywordObj({
                      ...keywordObj,
                      value: e?.target?.value
                    })
                  }}
                  style_type="light"
              />
              <RadioGroup
                  row
                  value={keywordObj.type}
                  onChange={e => setKeywordObj(pre => ({
                    ...pre,
                    type: e?.target?.value,
                    value: '',
                  }))}
              >
                <FormControlLabel
                    value={KEYWORD_TYPE.num}
                    control={<Radio/>}
                    label="编号"
                />
                <FormControlLabel
                    value={KEYWORD_TYPE.name}
                    control={<Radio/>}
                    label="名称"
                />
              </RadioGroup>
              <Button
                  onClick={() => setSearch({
                    ...search,
                    name: keywordObj.type === KEYWORD_TYPE.name ? keywordObj.value : null,
                    number: keywordObj.type === KEYWORD_TYPE.num ? parseInt(keywordObj.value) : null,
                  })}
                  variant="contained"
                  color="secondary"
              >搜索</Button>
            </main>
          </S.HeaderBox>
          <S.HeaderBox>
            <header>类别筛选</header>
            <S.SearchBox>
              <CusSelect
                  value={typeHelpObj.typeOne}
                  onChange={(v) => {
                    setTypeHelpObj({
                      ...typeHelpObj,
                      typeOne: v.target.value,
                    })
                  }}
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
                  value={typeHelpObj.typeTwo}
                  onChange={(v) => {
                    setTypeHelpObj({
                      ...typeHelpObj,
                      typeTwo: v.target.value,
                    })
                  }}
                  clear={1}
                  placeholder="全部"
              >
                {typeOptionTwo?.map(e => (
                    <MenuItem
                        key={`typeOptionTwo${e.id}`}
                        value={e.id}
                    >{e.name}</MenuItem>
                ))}
              </CusSelect>
              <CusSelect
                  onChange={(v) => {
                    setTypeHelpObj({
                      ...typeHelpObj,
                      typeThree: v.target.value,
                    })
                  }}
                  value={typeHelpObj.typeThree}
                  clear={1}
                  placeholder="全部"
              >
                {typeOptionThree?.map(e => (
                    <MenuItem
                        key={`typeOptionThree${e.id}`}
                        value={e.id}
                    >{e.name}</MenuItem>
                ))}
              </CusSelect>
              <span>类别排序</span>
              {
                (() => {
                  const _order = [
                    ['create_time desc', '按产品创建/修改时间'],
                    ['number asc', '商品编号'],
                    ['stock desc', '库存倒序'],
                  ];
                  return <CusSelect
                      placeholder="选择排序"
                      value={search.sort_type}
                      onChange={(v) => {
                        setSearch({
                          ...search,
                          sort_type: v.target.value,
                        })
                      }}
                  >
                    {
                      _order.map(e => <MenuItem
                          key={`sort_type${e[0]}`}
                          value={e[0]}>{e[1]}</MenuItem>)
                    }
                  </CusSelect>;
                })()
              }
            </S.SearchBox>
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
                    <TableCell width={220}>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listData?.map(e => <TableRow
                      key={`TableBody${e?.id}`}>
                    <TableCell>{e?.number}</TableCell>
                    <TableCell>{e?.name}</TableCell>
                    <TableCell width={240}>
                      <S.ImgPreview>
                        <img
                            src={dealImgUrl(e?.imgs?.[0]?.url)}
                            alt=""/>
                        <section>
                          <div>{e?.imgs?.length}/7</div>
                          <Link
                              component="button"
                              color="secondary"
                              onClick={() => {
                                if (!e?.imgs?.length) return
                                setPreviewImg({
                                  open: true,
                                  data: e?.imgs ?? []
                                })
                              }}
                          >
                            预览
                          </Link>
                        </section>
                      </S.ImgPreview>
                    </TableCell>
                    <TableCell>
                      {e?.is_hot === 1 ? <CheckCircleRounded/> : <RadioButtonUncheckedTwoTone/>}
                    </TableCell>
                    <TableCell>
                      {e?.is_new === 1 ? <CheckCircleRounded/> : <RadioButtonUncheckedTwoTone/>}
                    </TableCell>
                    <TableCell>
                      {e?.stock}
                    </TableCell>
                    <TableCell>{e?.price_in}</TableCell>
                    <TableCell>{e?.price_out}</TableCell>
                    <TableCell>{e?.price_market}</TableCell>
                    <TableCell>{e?.weight}</TableCell>
                    <TableCell>
                      <S.ActionTableCell>
                        <Button
                            color="secondary"
                            onClick={editClick(e)}
                            variant="contained"
                        >编辑</Button>
                        <Button
                            color="secondary"
                            onClick={addNumberEditClick(e)}
                            variant="contained"
                        >补货</Button>
                        <Button
                            color={e?.is_enable ? 'primary' : 'default'}
                            variant="contained"
                            onClick={() => {
                              showConfirm({
                                message: `确定${e?.is_enable ? '停用' : '启用'}该商品吗`,
                                callBack: async res => {
                                  if (!res) return
                                  await updateData({
                                    data: {
                                      id: e?.id,
                                      is_enable: e?.is_enable ? 0 : 1
                                    }
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
              count={~~product_total}
          />
        </main>
        <EditModal
            {...editModalState}
            refreshData={getListData}
        />
        <AddNumberModal
            {...addNumberModalState}
            refreshData={getListData}
        />
        <ImgPreview
            open={previewImg.open ?? false}
            closeModal={() => setPreviewImg({
              open: false,
              data: []
            })}
            data={previewImg.data ?? []}
        />
      </S.Box>
  )
}

export default Product

