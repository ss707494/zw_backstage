import React, {useCallback} from "react";
import {CusButton as Button, CusButton} from "@/component/CusButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {StyleLoading} from "@/common/style/loading";
import TableHead from "@material-ui/core/TableHead";
import {TableRow} from "@material-ui/core";
import {CusTableCell as TableCell} from "@/component/CusTableCell";
import TableBody from "@material-ui/core/TableBody";
import {StyleTableBox} from "@/common/style/tableBox";
import {useMutationGraphql, useQueryGraphql} from "@/component/ApolloQuery";
import {
  getDictItemListGraphql,
  getDictTypeListGraphql,
  saveDictItemGraphql
} from "@/views/Dictionary/List/dictionaryGraphql";
import {useCommonModalState} from "@/common/useHooks";
import {DictAddModal} from "@/views/Dictionary/AddModal";
import {showConfirm} from "@/component/ConfirmDialog";
import {contentWithLeftBox as S} from "@/common/style/contentWithLeftBox";

export const Dictionary = ({theme}: { theme: any }) => {
  const commonModalState = useCommonModalState()
  const [getDictTypeList, {dict_type_list: dictTypeList}, ] = useQueryGraphql(getDictTypeListGraphql)
  const [getDictItemList, {dict_item_list: dictItemList}, dictItemListLoad] = useQueryGraphql(getDictItemListGraphql)
  const [activeCode, setActiveCode] = React.useState('')
  const [saveDictItem, , ] = useMutationGraphql(saveDictItemGraphql)
  const _getDictItemList = () => {
    getDictItemList({
      data: {
        dict_type_code: activeCode,
      }
    })
  }
  const changeActiveCode = useCallback((activeCode: string) => () => {
    setActiveCode(activeCode)
    return getDictItemList({
      data: {
        dict_type_code: activeCode,
      },
    })
  }, [getDictItemList])

  const _getDictTypeList = React.useCallback(async () => {
    const _types = await getDictTypeList()
    changeActiveCode(_types?.dict_type_list?.[0]?.code)()
  }, [changeActiveCode, getDictTypeList])
  React.useEffect(() => {
    _getDictTypeList()
  }, [_getDictTypeList])

  return (
      <S.Box>
        <S.LeftBox>
          {dictTypeList?.map((e: DictType) =>
              e.code === activeCode ?
                  <S.ActiveBox
                      key={`dict_type${e.code}`}
                  >
                    {e.name}
                  </S.ActiveBox>
                  : <S.LeftCard
                      key={`dict_type${e.code}`}
                      onClick={changeActiveCode(e.code)}
                  >
                    {e.name}
                  </S.LeftCard>
          )}
        </S.LeftBox>
        <S.RightBox>
          <header>
            <CusButton
                variant="contained"
                color="primary"
                onClick={commonModalState.openClick({
                  dict_type_code: activeCode,
                })}
            >
              新增
            </CusButton>
          </header>
          <main>
            {(dictItemListLoad) ? <StyleLoading><CircularProgress/></StyleLoading>
                : <StyleTableBox.Table theme={theme}>
                  <TableHead>
                    <TableRow>
                      {['名称', 'code', '排序']
                          .map(e => <TableCell key={`TableHead${e}`}>
                            {e}
                          </TableCell>)
                      }
                      <TableCell width={150}>
                        操作
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dictItemList?.map((e: DictItem) => <TableRow key={`TableBody${e?.id}`}>
                      <TableCell>{e?.name}</TableCell>
                      <TableCell>{e?.code}</TableCell>
                      <TableCell>{e?.sort}</TableCell>
                      <TableCell>
                        <StyleTableBox.ActionTableCell>
                          <CusButton
                              color="secondary"
                              onClick={commonModalState.openClick({
                                ...e,
                              })}
                              variant="contained"
                          >编辑</CusButton>
                          <Button
                              color={!e?.is_disable ? 'primary' : 'default'}
                              variant="contained"
                              onClick={() => {
                                showConfirm({
                                  message: `确定${!e?.is_disable ? '停用' : '启用'}该选项吗`,
                                  callBack: async res => {
                                    if (!res) return
                                    await saveDictItem({
                                      data: {
                                        id: e?.id,
                                        is_disable: e?.is_disable ? 0 : 1,
                                      },
                                    })
                                    _getDictItemList()
                                  }
                                })
                              }}
                          >{!e?.is_disable ? '停用' : '启用'}</Button>
                          <CusButton
                              color="default"
                              onClick={() => {
                                showConfirm({
                                  message: `确定删除该选项吗`,
                                  callBack: async res => {
                                    if (!res) return
                                    await saveDictItem({
                                      data: {
                                        id: e?.id,
                                        is_delete: 1,
                                      },
                                    })
                                    _getDictItemList()
                                  }
                                })
                              }}
                              variant="contained"
                          >删除</CusButton>
                        </StyleTableBox.ActionTableCell>
                      </TableCell>
                    </TableRow>)}
                  </TableBody>
                </StyleTableBox.Table>
            }
          </main>
        </S.RightBox>
        <DictAddModal
            theme={theme}
            {...commonModalState}
            refresh={() => {
              getDictItemList({
                data: {
                  dict_type_code: activeCode,
                }
              })
            }}
        />
      </S.Box>
  );
}

export default Dictionary

