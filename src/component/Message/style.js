import styled from 'styled-components'
import { Snackbar } from "@material-ui/core";
import { green, amber, common, blue, grey, red } from '@material-ui/core/colors'

// ['success', 'warning', 'error', 'info']
const typeHelp = {
  default: `background: ${grey[700]};`,
  success: `background: ${green[600]};`,
  warning: `background: ${amber[700]};`,
  info: `background: ${blue[700]};`,
  error: `background: ${red[700]};`,
}
const getType = (type = 'default') => typeHelp[type]

export const S = {}
S.Snackbar = styled(Snackbar)`
  > div {
    color: ${common.white}
    ${({msg_type}) => getType(msg_type)}
  }
`
