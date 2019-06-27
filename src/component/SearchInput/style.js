import styled from 'styled-components'
import { grey } from "@material-ui/core/colors";

export const S = {}
S.Box = styled('div')`
  display: flex;
  align-items: center;
  background: ${({style_type}) => style_type === 'light' ? grey[200] : grey[700]};
  border-radius: 5px;
  > div {
    width: 100%;
  }
  
`
