import React from 'react'
import { Route } from 'react-router-dom'
import { MenuLayout } from '@/component/MenuLayout'
import { withTheme } from '@material-ui/core/styles'

const importAll = list => list.keys().reduce((i, e) => {
  return [
    ...i,
    ...Array.isArray(list(e).default) ? list(e).default : [list(e).default],
  ]
}, [])

export const allRouters = importAll(require.context('./', true, /^\.\/\w*\/index\.js$/i))

export const routes = allRouters.map(({ props, Type, Layout }, i) => {
  const Compon = !props.component ? () => {} : withTheme(props.component)
  return Type ? <Type {...props} key={`type${i}`}/>
      : Layout ? <Route {...props} key={`route${i}`}
                        component={p => <Layout {...p}>
                          <Compon {...p}/>
                        </Layout>}
          />
          : <Route {...props} key={`route${i}`}
                   component={p => <MenuLayout {...p}>
                     <Compon {...p}/>
                   </MenuLayout>}
          />
})

// export default routes
