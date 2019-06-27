import styled from 'styled-components'
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";

export const S = {}
S.Box = styled(Dialog)`
`
S.Content = styled(DialogContent)`
&&& {
  width: 960px;
  //> header {
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //  font-size: 18px;
  //  font-weight: bold;
  //  height: 60px;
  //}
  > form {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(9, auto);
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    margin-bottom: 20px;
    
    > button {
      grid-area: 9 / 1 / 10 / 3;
    }
  }
}
`
