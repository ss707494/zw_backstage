import loadable from '@loadable/component'

export default {
  props: {
    path: '/product',
    component: loadable(() => import('./List')),
  },
}

