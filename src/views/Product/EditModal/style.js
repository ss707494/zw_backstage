import styled from 'styled-components'
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { S as SText } from '@/component/CusTextField/style'

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
    grid-column-gap: 20px;
    margin-bottom: 20px;
    
    > button {
      grid-area: 9 / 1 / 10 / 3;
    }
  }
}
`
S.FieldTwoBox = styled('section')`&{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 25px;
  
}`
S.UploadBox = styled('main')`&{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr) 40px;
  grid-gap: 8px;
  > span {
    grid-area: 4 / 1 / 5 / 4;
  }
}`
S.UploadFormControl = styled(SText.TextFieldBox)`
  grid-area: 4 / 2 / 9 / 3;

`
