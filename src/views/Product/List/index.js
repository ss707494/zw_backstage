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
import { postQueryCommodityTypeChildren } from "@/views/Category/List";

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
  const [getTypeOptionOne, { data: typeOptionOne }] = postQueryCommodityTypeChildren()
  const [getTypeOptionTwo, { data: typeOptionTwo }] = postQueryCommodityTypeChildren()
  const [getTypeOptionThree, { data: typeOptionThree }] = postQueryCommodityTypeChildren()

  React.useEffect(() => {
    getTypeOptionOne()
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
        ParentID: typeHelpObj.typeOne
      })
    }
  }, [getTypeOptionTwo, typeHelpObj.typeOne])
  React.useEffect(() => {
    setTypeHelpObj(pre => ({
      ...pre,
      ...(!typeOptionTwo?.length ? {
        res: pre.typeOne
      } : {}),
      typeTwo: typeOptionTwo?.[0]?.F_CTID || '',
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
        ParentID: typeHelpObj.typeTwo
      })
    }
  }, [getTypeOptionThree, typeHelpObj.typeTwo])
  React.useEffect(() => {
    setTypeHelpObj(pre => ({
      ...pre,
      ...(!typeOptionThree?.length ? {
        res: pre.typeTwo
      } : {}),
      typeThree: typeOptionThree?.[0]?.F_CTID || ''
    }))
  }, [typeOptionThree])
  React.useEffect(() => {
    setTypeHelpObj(pre => ({
      ...pre,
      res: typeHelpObj.typeThree || pre.typeTwo,
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

export const Product = ({ theme }) => {
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
    keywordType: KEYWORD_TYPE.num,
    type: '',
    SortType: 1,
  })
  const [previewImg, setPreviewImg] = React.useState({
    open: false,
    data: []
  })
  const [getList, listData, listLoad] = api.post('/Products/QueryCommodity')
  const [setTypeEnable] = api.post('/Products/SetCommodityTypeEnable')
  const getListData = (param = {}) => getList({
    ...search,
    ...pageState.pageData,
    ...param,
  })
  React.useEffect(() => {
    getList({
      ...search,
      ...pageState.pageData,
      BussinessID: '1',
    })
  }, [getList, search, pageState.pageData])
  React.useEffect(() => {
    // if (!typeHelpObj.res) return
    setSearch(pre => ({
      ...pre,
      F_CTID: typeHelpObj.res || '',
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
                    F_CNameC: keywordObj.type === KEYWORD_TYPE.name ? keywordObj.value : '',
                    F_CNumber: keywordObj.type === KEYWORD_TYPE.num ? keywordObj.value : '',
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
                        key={`typeOptionOne${e.F_CTID}`}
                        value={e.F_CTID}
                    >{e.F_CTNameC}</MenuItem>
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
                        key={`typeOptionTwo${e.F_CTID}`}
                        value={e.F_CTID}
                    >{e.F_CTNameC}</MenuItem>
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
                        key={`typeOptionThree${e.F_CTID}`}
                        value={e.F_CTID}
                    >{e.F_CTNameC}</MenuItem>
                ))}
              </CusSelect>
              <span>类别排序</span>
              <CusSelect
                  placeholder="选择排序"
                  value={search.SortType}
                  onChange={(v) => {
                    setSearch({
                      ...search,
                      SortType: v.target.value,
                    })
                  }}
              >
                <MenuItem value={1}>按产品创建/修改时间</MenuItem>
                <MenuItem value={2}>商品编号</MenuItem>
                <MenuItem value={3}>库存倒序</MenuItem>
              </CusSelect>
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
                  {listData?.data?.map(e => <TableRow
                      key={`TableBody${e?.ID}`}>
                    <TableCell>{e?.F_CNumber}</TableCell>
                    <TableCell>{e?.F_CNameC}</TableCell>
                    <TableCell width={240}>
                      <S.ImgPreview>
                        <img
                            src={e?.PhotoArray?.[0]?.F_PWebPath}
                            alt=""/>
                        <section>
                          <div>{e?.PhotoArray?.length}/7</div>
                          <Link
                              component="button"
                              color="secondary"
                              onClick={() => {
                                if (!e?.PhotoArray?.length) return
                                setPreviewImg({
                                  open: true,
                                  data: e?.PhotoArray ?? []
                                })
                              }}
                          >
                            预览
                          </Link>
                        </section>
                      </S.ImgPreview>
                    </TableCell>
                    <TableCell>
                      {e?.F_CIsHot === 1 ? <CheckCircleRounded/> : <RadioButtonUncheckedTwoTone/>}
                    </TableCell>
                    <TableCell>
                      {e?.F_CIsNew === 1 ? <CheckCircleRounded/> : <RadioButtonUncheckedTwoTone/>}
                    </TableCell>
                    <TableCell>
                      {e?.Stock}
                    </TableCell>
                    <TableCell>{e?.F_CPUnitPriceIn}</TableCell>
                    <TableCell>{e?.F_CPUnitPriceOut}</TableCell>
                    <TableCell>{e?.F_CPUnitPriceMarket}</TableCell>
                    <TableCell>{e?.F_CPUnitPriceIn}</TableCell>
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
              count={~~listData?.maxCount}
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

