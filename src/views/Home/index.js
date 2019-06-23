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
    from: '/',
    to: '/category',
  },
  Type: Redirect
}, {
  props: {
    path: '/home',
    component: Home,
  }
}]

