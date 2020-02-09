import loadable from '@loadable/component'
import {Redirect} from "react-router-dom";
import {PromoCodeTypeEnum} from 'ss_common'

export default [{
  props: {
    exact: true,
    from: process.env.REACT_APP_PRE_ROUTE + '/promoCode',
    to: process.env.REACT_APP_PRE_ROUTE + `/promoCode/${PromoCodeTypeEnum.PromoCode}`,
  },
  Type: Redirect
}, {
  props: {
    path: process.env.REACT_APP_PRE_ROUTE + '/promoCode/:promoCodeType',
    component: loadable(() => import('./List/index')),
  },
}]
