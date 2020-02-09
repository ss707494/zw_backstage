import React from "react";
import {useParams} from "react-router-dom";
import history from "@/common/history";
import {contentWithLeftBox} from "@/common/style/contentWithLeftBox";
import {PromoCodeTypeEnum} from "ss_common";
import {PromoCodeTable} from "@/views/PromoCode/PromoCode/PromoCode";

const leftMenu: DictType[] = [
  {
    name: '优惠码',
    code: PromoCodeTypeEnum.PromoCode,
  },
  {
    name: '达人卡',
    code: PromoCodeTypeEnum.DarenCard,
  },
]

const promoCom: { [key: string]: any } = {
  [PromoCodeTypeEnum.PromoCode]: PromoCodeTable,
  [PromoCodeTypeEnum.DarenCard]: PromoCodeTable,
}

export const PromoCodeList = ({theme}: any) => {
  const routerParams = useParams<any>()
  const activeCode = routerParams?.promoCodeType

  const changeType = (type: string) => () => {
    history.push(`/promoCode/${type}`)
  }

  return (
      <contentWithLeftBox.Box>
        <contentWithLeftBox.LeftBox>
          {leftMenu.map((e: DictType) =>
              e.code === activeCode ?
                  <contentWithLeftBox.ActiveBox
                      key={`promoType${e.code}`}
                  >{e.name}</contentWithLeftBox.ActiveBox>
              : <contentWithLeftBox.LeftCard
                      key={`promoType${e.code}`}
                      onClick={changeType(e.code)}
                  >{e.name}</contentWithLeftBox.LeftCard>
          )}
        </contentWithLeftBox.LeftBox>
        <contentWithLeftBox.RightBox>
          {promoCom[activeCode]?.({theme, promoCodeType: activeCode}) ?? <div/>}
        </contentWithLeftBox.RightBox>
      </contentWithLeftBox.Box>
  )
}

export default PromoCodeList
