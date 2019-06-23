import styled from 'styled-components'
import { Table } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";

export const S = {}
S.Box = styled('div')`
  margin: 20px;
  > header {
    display: flex;
    flex-direction: row;
    > section {
      flex: 1;
    }
  }
`
S.Table = styled(Table)`
&&&{
  margin-top: 20px;
  border-radius: 5px;
  border-collapse: initial;
  overflow: hidden;
  border: 1px solid rgba(224, 224, 224, 1);
  > thead {
    background: ${({theme}) => theme.palette.grey[500]};
    color: ${({theme}) => theme.palette.common.white};
  }
}
`
S.Loading = styled('section')`
  text-align: center;
`
S.ActionTableCell = styled(TableCell)`&&& {
  display: flex;
  > button {
    margin-right: 8px;
  }

}`
