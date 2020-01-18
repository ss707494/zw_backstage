import React from 'react'
import { S } from './style'
import InputBase from "@material-ui/core/InputBase";
import styled from 'styled-components'
import { withTheme } from '@material-ui/core/styles'
import MenuItem from "@material-ui/core/MenuItem";

// const BootstrapInput = withStyles(theme => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase)

const BootstrapInput = styled(InputBase)`
  & > div {
    border-radius: 4px;
    position: relative;
    background-color: ${({ theme }) => theme?.palette?.formBackground};
    border: 0;
    font-size: 16px;
    width: 100%;
    padding: 7px 26px 6px 12px;
    &:focus {
      border-radius: 4px;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
`

export const CusSelect = withTheme(prop => (
    <S.Box
        displayEmpty
        input={<BootstrapInput
            {...prop}
            name={prop.name}
            id={prop.id}/>}
        {...prop}
        value={prop.value || ''}
    >
      {prop.placeholder &&
      <MenuItem
          value=""
          disabled={!(prop?.clear ?? false)}
      >{prop.placeholder}</MenuItem>
      }
      {prop.children}
    </S.Box>
))

export default {
  CusSelect
}
