import React from 'react'
import { IconButton, InputBase } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { S } from './style'

export const SearchInput = prop => {

  return (
      <S.Box
          {...prop}
      >
        <IconButton
            size="small"
        >
          <SearchIcon/>
        </IconButton>
        <InputBase
            {...prop}
            value={prop.value || ''}
            // onKeyUp={e => console.log(e.keyCode)}
        >
        </InputBase>
      </S.Box>
  )
}

export default {
  SearchInput
}
