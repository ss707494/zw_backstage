import React from 'react'
import { S } from './style'

export const CusTextField = prop => (
    <S.TextFieldBox
        {...prop}
        InputLabelProps={{
          shrink: true,
          ...prop.InputLabelProps,
        }}
    />
)

export default {
  CusTextField
}
