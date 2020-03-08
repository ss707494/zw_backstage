import styled from "styled-components"
import DialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";

export const S = {}
S.Content = styled(DialogContent)`
&&& {
  > footer {
    margin: 10px 0;
    display: flex;
    > button:not(:first-of-type) {
      margin-left: 10px;
    }
  }
}
`

S.TextFieldBox = styled(TextField)`
&&& {
  padding: 0 15px;
}
`
