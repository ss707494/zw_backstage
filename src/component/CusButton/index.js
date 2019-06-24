import React from 'react'
import { S } from './style'

export const CusButton = prop => (
    <>
      <S.Box {...prop} disabled={!!prop.loadingsdf}>
        {prop.children}
        {!!prop.loadingsdf && <S.ButtonLoading
            color="inherit"
            size={26}
        />}
      </S.Box>
    </>
)

export default {
  CusButton
}
