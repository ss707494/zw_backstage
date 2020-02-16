import styled from "styled-components"

export const S = {}
S.Box = styled('div')`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    background: #616161;
    max-width: 45vw;
    max-height: 60vh;
    > form {
      padding: 20px;
      > button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
`
