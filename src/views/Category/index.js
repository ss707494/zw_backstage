import loadable from '@loadable/component'

export default {
  props: {
    path: '/category',
    component: loadable(() => import('./List')),
  },
}

