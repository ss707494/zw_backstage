import React from 'react'
import { Route } from 'react-router-dom'
import { MenuLayout } from '@/component/MenuLayout'

const importAll = list => list.keys().reduce((i, e) => {
  return [
    ...i,
    ...Array.isArray(list(e).default) ? list(e).default : [list(e).default],
  ]
}, [])

export const allRouters = importAll(require.context('./', true, /^\.\/\w*\/index\.js$/i))

export const routes = allRouters.map(({ props, Type, Layout }, i) => {
  return Type ? <Type {...props} key={`type${i}`}/>
      : Layout ? <Route {...props} key={`route${i}`}
                        component={p => <Layout {...p}>
                          <props.component {...p}/>
                        </Layout>}
          />
          : <Route {...props} key={`route${i}`}
                   component={p => <MenuLayout {...p}>
                     <props.component {...p}/>
                   </MenuLayout>}
          />
})

// export default routes
