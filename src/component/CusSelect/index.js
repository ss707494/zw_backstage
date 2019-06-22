import React from 'react'
import { S } from './style'
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme?.palette?.formBackground,
    border: '0',
    // border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '7px 26px 6px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase)

export const CusSelect = prop => (
    <S.Box
        displayEmpty
        input={<BootstrapInput name={prop.name}
                               id={prop.id}/>}
        {...prop}
    >
      {prop.placeholder &&
      <MenuItem
          value=""
          disabled
      >{prop.placeholder}</MenuItem>
      }
      {prop.children}
    </S.Box>
)

export default {
  CusSelect
}
