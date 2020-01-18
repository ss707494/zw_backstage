import React from 'react'
import { createMuiTheme } from '@material-ui/core'
import { StylesProvider, ThemeProvider, createGenerateClassName } from '@material-ui/core/styles'

const _themeOption = createMuiTheme({
  palette: {
    type: 'dark',
  },
})


export const wrapperTheme = (themeOption = _themeOption, classOption) => (el) => {
  return wrapperStyle(createGenerateClassName(classOption))(
        <ThemeProvider theme={themeOption}>
          {el}
        </ThemeProvider>
  )
}

export const wrapperStyle = (generateClassName) => (el) => {
  return (
      <StylesProvider
          generateClassName={generateClassName}
      >
        {el}
      </StylesProvider>
  )
}
