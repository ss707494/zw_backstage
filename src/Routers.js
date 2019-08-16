import React from 'react'
import { Router, Route, Switch } from "react-router-dom"
import { WrapperContext } from '@/common/context'
import history from '@/common/history'
import { routes } from '@/views'
import { CreateMessageObj } from '@/component/Message'
import { ConfirmDialog } from '@/component/ConfirmDialog'
import { wrapperTheme } from '@/common/theme'
import { wrapperApollo } from "@/common/apolloCLient";

export default () => {
  return [
    WrapperContext,
    wrapperApollo,
    wrapperTheme(),
  ].reduce((i, e) => e(i), (
      <>
        <Router history={history}>
          <Switch>
            {routes}
            <Route component={NoMatch}/>
          </Switch>
        </Router>
        <CreateMessageObj/>
        <ConfirmDialog/>
      </>
  ))
}

const NoMatch = () => (
    <div>
      <h2>404</h2>
    </div>
);
