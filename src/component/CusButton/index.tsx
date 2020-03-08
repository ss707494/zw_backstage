import React from 'react'
import { S } from './style'
import {ButtonProps} from "@material-ui/core";

declare interface CusButtonProps extends ButtonProps {
  loading?: boolean | number
}

export const CusButton = (prop: CusButtonProps) => (
    <>
      <S.Box {...prop} disabled={!!prop.loading || prop.disabled}>
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
