import loadable from '@loadable/component'

export default [
  {
    props: {
      path: process.env.REACT_APP_PRE_ROUTE + '/product/:is_group',
      component: loadable(() => import('./List')),
    },
  },
]

