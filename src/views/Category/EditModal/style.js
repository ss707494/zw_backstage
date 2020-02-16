import styled from "styled-components"
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { S as SText } from '@/component/CusTextField/style'

export const S = {}
S.Box = styled(Dialog)`
`
S.Content = styled(DialogContent)`
&&& {
  width: 660px;
  //> header {
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //  font-size: 18px;
  //  font-weight: bold;
  //  height: 60px;
  //}
  > form {
    margin-bottom: 20px;
  }
}
`

S.UploadFormControl = SText.TextFieldBox
