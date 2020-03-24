import {styled} from '@material-ui/core'

export const HeaderButton = styled('div')({
  display: 'grid',
  marginTop: '20px',
  gridTemplateColumns: '180px 180px',
  gridGap: '6px',
  '&&& > .MenuLayout-MuiFormControl-root': {
    marginBottom: 0,
  }
})
