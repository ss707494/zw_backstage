import loadable from '@loadable/component'
import {DictTypeEnum} from "@/common/enum";
import { Redirect } from 'react-router-dom'

export default [
  {
    props: {
      exact: true,
      from: process.env.REACT_APP_PRE_ROUTE + '/dataConfig',
      to: process.env.REACT_APP_PRE_ROUTE + `/dataConfig/${DictTypeEnum.GroupPrecision}`,
    },
    Type: Redirect
  },
  {
    props: {
      path: process.env.REACT_APP_PRE_ROUTE + '/dataConfig/:dictType',
      component: loadable(() => import('./List/index')),
    },
  },
]

