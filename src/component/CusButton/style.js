import styled from 'styled-components'
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

export const S = {}
S.Box = styled(Button)`
  position: relative;
`

S.ButtonLoading = styled(CircularProgress)`
&&& {
  position: absolute;
  height: 100%;
}
`
