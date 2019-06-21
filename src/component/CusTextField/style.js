import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";

export const S = {}
S.TextFieldBox = styled(TextField)`
  &&& {
    flex-direction: row;
    > label {
      position: relative;
      font-size: 16px;
      color: #000;
      transform: translate(0, 1.5px) scale(1);
      display: flex;
      align-items: center;
      width: 60px;
    }
    &&&&& {
      > div {
        margin-left: 10px;
        &:before,:after {
          border-bottom: 0;
        }
        border: 1px solid rgba(0, 0, 0, 0.42);
        border-radius: 4px;
        margin-top: 0;
        > input {
          padding-left: 10px;
          &:hover {
            box-shadow: 0 0 0 0.2rem rgba(162, 162, 162, 0.24);
          }
          &:focus {
            border-color: #80bdff;
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }
        }
      }
    }
  }
`

