import React from 'react'
import { Redirect } from 'react-router-dom'
import { S } from './style'

export const Home = () => {
  return (
      <S.Box>
        home
      </S.Box>
  )
}

export default [{
  props: {
    exact: true,
    from: process.env.REACT_APP_PRE_ROUTE + '/',
    to: process.env.REACT_APP_PRE_ROUTE + '/category',
  },
  Type: Redirect
}, {
  props: {
    path: process.env.REACT_APP_PRE_ROUTE + '/home',
    component: Home,
  }
}]

