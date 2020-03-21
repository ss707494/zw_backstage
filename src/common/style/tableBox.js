import styled from "styled-components";
import { Table } from "@material-ui/core";

export const StyleTableBox = {
  Box: styled('div')`
  margin: 20px;
  > header {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: minmax(200px, auto) repeat(${props => props.headerColumn || 2}, 1fr);
    > section {
      flex: 1;
    }
  }
`,
  Table: styled(Table)`
&&&{
  margin-top: 20px;
  border-radius: 5px;
  border-collapse: initial;
  overflow: hidden;
  border: 1px solid rgba(224, 224, 224, 1);
  > thead {
    background: ${({ theme }) => theme.palette.grey[400]};
    > tr > th {
      color: ${({ theme }) => theme.palette.common.black};
    }
  }
}
`,
  HeaderBox: styled('section')`&&&{
  display: flex;
  flex-direction: column;
  > header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  } 
  > section {
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
  }
  > main {
    display: flex;
    align-items: center;
    //display: grid;
    //grid-template-columns: auto;
    //grid-row-gap: 10px;
    //justify-items: start;
    
    > div {
      margin-right: 10px;
    }
  }
}
`,
  ActionTableCell: styled('section')`&&& {
  display: flex;
  > button {
    margin-right: 8px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}`

}

