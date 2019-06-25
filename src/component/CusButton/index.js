import React from 'react'
import { S } from './style'

export const CusButton = prop => (
    <>
      <S.Box {...prop} disabled={!!prop.loading}>
        {prop.children}
        {!!prop.loading && <S.ButtonLoading
            color="inherit"
            size={26}
        />}
      </S.Box>
    </>
)

export default {
  CusButton
}
