import React from 'react'
import { S } from './style'

export const Template = () => {
  return (
      <S.Box>
        123
      </S.Box>
  )
}

export default {
  props: {
    path: '/template',
    component: Template,
  },
}

