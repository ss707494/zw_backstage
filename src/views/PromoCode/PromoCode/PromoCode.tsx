import React, {useEffect} from "react";
import {CusButton} from "@/component/CusButton";
import {S} from "@/views/Order/List/style";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableHead from "@material-ui/core/TableHead";
import {TableBody, TableRow} from "@material-ui/core";
import {CusTableCell as TableCell} from "@/component/CusTableCell";
import {StyleTableBox} from "@/common/style/tableBox";
import {PromoCodeTypeEnum} from "ss_common";
import {useMutationSimpleData, useQuerySimpleData} from "@/component/ApolloQuery";
import {promo_code_list, save_promo_code} from "@/views/PromoCode/graphql";
import {EditModal} from "@/views/PromoCode/EditModal/EditModal";
import {useCommonModalState} from "@/common/useHooks";
import {formatDate} from "@/common/utils";
import styled from "styled-components";
import {showConfirm} from "@/component/ConfirmDialog";

const ImgBox = styled.img`
  max-width: 90px;
  max-height: 90px;
`

export const PromoCodeTable = ({promoCodeType, theme}: any) => {
  const commonModalState: CommonModalState = useCommonModalState()
  const [getPromoCodeList, {promo_code_list: promoCodeList}, listLoad] = useQuerySimpleData(promo_code_list)
  const [savePromoCode, , ] = useMutationSimpleData(save_promo_code)
  const tableHeader = [
    '名称', '优惠码', '折扣类型', '使用条件', '使用类别', '展示图片', '有效时间-开始', '有效时间-结束', '描述'
  ]
  const tableHeaderDarenCard = [
    '名称', '重复次数', '折扣类型', '使用条件', '使用类别', '展示图片', '有效时间-开始', '有效时间-结束', '描述'
  ]
  const dealTableHeader: any = ({
    [PromoCodeTypeEnum.PromoCode]: tableHeader,
    [PromoCodeTypeEnum.DarenCard]: tableHeaderDarenCard,
  })
  useEffect(() => {
    if (promoCodeType) {
      getPromoCodeList({
        promo_code_type: promoCodeType,
      })
    }
  }, [getPromoCodeList, promoCodeType])

  return (
      <div>
        <header>
          <CusButton
              variant={"contained"}
              color={"primary"}
              onClick={commonModalState.openClick({})}
          >新增</CusButton>
        </header>
        <main>
          {(listLoad) ? <S.Loading><CircularProgress/></S.Loading>
              : <StyleTableBox.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    {dealTableHeader[promoCodeType]
                        ?.map((e: string) => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {promoCodeList?.map((e: PromoCode) => <TableRow key={`promoCodeList${e?.id}`}>
                    <TableCell>{e?.title}</TableCell>
                    <TableCell>
                      {promoCodeType === PromoCodeTypeEnum.PromoCode ? e?.code : e?.reuse_times}
                    </TableCell>
                    <TableCell>{e?.discount_type}</TableCell>
                    <TableCell>{e?.discount_condition}</TableCell>
                    <TableCell>{e?.category_data?.name}</TableCell>
                    <TableCell>
                      <ImgBox
                          src={`${process.env.REACT_APP_PRE_IMG_DOMAIN}${e?.img_url}`}
                          alt=""/>
                    </TableCell>
                    <TableCell>{formatDate(new Date(e?.effective_date_start), 'yyyy/MM/dd HH:mm')}</TableCell>
                    <TableCell>{formatDate(new Date(e?.effective_date_end), 'yyyy/MM/dd HH:mm')}</TableCell>
                    <TableCell>{e?.remark}</TableCell>
                    <TableCell>
                      <CusButton
                          variant={"outlined"}
                          onClick={commonModalState.openClick({...e})}
                      >编辑</CusButton>
                      <CusButton
                          variant={"outlined"}
                          onClick={() => {
                            showConfirm({
                              message: `确定删除该选项吗`,
                              callBack: async res => {
                                if (!res) return
                                await savePromoCode({
                                  id: e?.id,
                                  is_delete: 1,
                                })
                                getPromoCodeList({
                                  promo_code_type: promoCodeType,
                                })
                              }
                            })
                          }}
                      >删除</CusButton>
                    </TableCell>
                  </TableRow>)}
                </TableBody>
              </StyleTableBox.Table>
          }
        </main>
        <EditModal
            {...commonModalState}
            promoCodeType={promoCodeType}
            refresh={() => getPromoCodeList({
              promo_code_type: promoCodeType,
            })}
        />
      </div>
  )
}
