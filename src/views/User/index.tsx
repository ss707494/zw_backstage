import {List} from "@/views/User/List/list"

export default {
  props: {
    path: process.env.REACT_APP_PRE_ROUTE + '/user',
    component: List,
  },
}
