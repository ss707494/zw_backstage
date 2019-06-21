import React from 'react'
import { S } from './style'

export const Test = () => {
  console.log(123)
  return (
      <S.Box>
        123
      </S.Box>
  )
}

export default {
  props: {
    path: '/test',
    component: Test,
  },
}

