import React from 'react'
import { withTheme } from '@material-ui/core/styles'
import { S } from './style'

export const CusTextField = withTheme(prop => (
    <S.TextFieldBox
        {...prop}
        value={prop.value || ''}
        InputLabelProps={{
          shrink: true,
          ...prop.InputLabelProps,
        }}
    />
))

export default {
  CusTextField
}
