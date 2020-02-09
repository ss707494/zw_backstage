import React from 'react'
import { S } from './style'
import { CusSelect } from "@/component/CusSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export const CusSelectField = ({helperText, ...prop}: any) => (
    <S.Box
        {...prop}
        as={FormControl}
    >
      <InputLabel
          shrink
          htmlFor={prop.id}
      >{prop.label}</InputLabel>
      <CusSelect
          {...prop}
          value={prop.value || ''}
      />
      {helperText && <FormHelperText {...prop} id="my-helper-text">{helperText}</FormHelperText>}
    </S.Box>
)

export default {
  CusSelectField
}
