import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
const _themeOption = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export const wrapperTheme = (themeOption = _themeOption) => (el) => {
  return (
      <ThemeProvider theme={themeOption}>
        {el}
      </ThemeProvider>
  )
}
