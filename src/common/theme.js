import React from 'react'
import { createMuiTheme } from '@material-ui/core'
import { jssPreset, StylesProvider, ThemeProvider, createGenerateClassName } from '@material-ui/core/styles'
import {create} from "jss"
import jssTemplate from 'jss-plugin-template'

const jss = create({
  plugins: [jssTemplate(), ...jssPreset().plugins],
})

const _themeOption = createMuiTheme({
  palette: {
    type: 'dark',
  },
})


export const wrapperTheme = (themeOption = _themeOption, classOption) => (el) => {
  return wrapperStyle(createGenerateClassName(classOption))(
        <ThemeProvider
            theme={themeOption}>
          {el}
        </ThemeProvider>
  )
}

export const wrapperStyle = (generateClassName) => (el) => {
  return (
      <StylesProvider
          jss={jss}
          generateClassName={generateClassName}
      >
        {el}
      </StylesProvider>
  )
}
