import styled from 'styled-components'
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";

export const S = {}
S.Box = styled(Dialog)`
`
S.Content = styled(DialogContent)`
&&& {
  > form {
    margin-bottom: 20px;
  }
}
`
