import React, { useState, useContext, useCallback } from 'react'
import merge from 'lodash/merge'

export const context = React.createContext({})

export const useCustomContext = () => {
  const [context1, setContext] = useContext(context)
  return [context1, useCallback(setContext, [])]
}

export const WrapperContext = (el) => {
  const [cont, setContext] = useState({
  })

  return (
      <context.Provider value={[cont, (data) => {
        return setContext({
          ...merge(cont, data)
        });
      }]}>
        {el}
      </context.Provider>
  )
}

export default {
  context,
  WrapperContext,
  useCustomContext,
}
