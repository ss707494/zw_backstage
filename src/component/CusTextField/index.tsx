import React from 'react'
import { withTheme } from '@material-ui/core/styles'
import { S } from './style'
import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps, TextFieldProps
} from "@material-ui/core/TextField/TextField";

declare interface CusStandardTextFieldProps extends StandardTextFieldProps {
}
declare interface CusOutlinedTextFieldProps extends OutlinedTextFieldProps {
}
declare interface CusFilledTextFieldProps extends FilledTextFieldProps {
}

export const CusTextField: React.ComponentType<TextFieldProps> = withTheme((prop: CusStandardTextFieldProps | CusOutlinedTextFieldProps | CusFilledTextFieldProps) => (
    <S.TextFieldBox
        {...prop}
        value={prop.value ?? ''}
        InputLabelProps={{
          shrink: true,
          ...prop.InputLabelProps,
        }}
    />
))

export default {
  CusTextField
}
