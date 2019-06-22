import styled from 'styled-components'
import TextField from "@material-ui/core/TextField";

const $labelWidth = '60px'
export const S = {}
S.TextFieldBox = styled(TextField)`
  &&& {
    flex-direction: row;
    margin-bottom: 24px;
    position: relative;
    width: 100%;
    > label {
      position: relative;
      font-size: 16px;
      color: #000;
      transform: translate(0, 1.5px) scale(1);
      display: flex;
      align-items: center;
      width: ${$labelWidth};
    }
    &&&&& {
      > div {
        width: 100%;
        background: ${({theme}) => theme?.palette?.formBackground};
        border: 0;  
        //border: 1px solid rgba(0, 0, 0, 0.42);
        margin-left: 0;
        &:before,:after {
          border-bottom: 0;
        }
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
      > p {
        position: absolute;
        bottom: -17px;
        left: ${$labelWidth};
      }
    }
  }
`

