import styled from "styled-components"
import { Button } from "@material-ui/core";

export const S = {}

const border = `1px solid rgba(224,224,224,1)`
const boxShadow = `box-shadow: 0 2px 4px rgba(0,0,0,0.2)`

S.Box = styled('div')`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  margin: 20px;
  border: ${border};
`

S.LeftBox = styled('div')`
  display: grid;
  border-right: ${border};
  grid-auto-rows: min-content;
`
S.LeftCard = styled(Button)`
&&& {
    border-bottom: ${border};
    padding: 12px;
}
`

S.ActiveBox = styled(S.LeftCard)`
    ${boxShadow};
    background:  linear-gradient(to right, rgba(144,139,139,0.34), #fff);
    border: ${border};
    border-right: none;
    &:after {
      content: '';
      position: absolute;
      right: -3px;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #fff;
    }
`

S.RightBox = styled('div')`
    ${boxShadow};
    padding: 20px;
`
