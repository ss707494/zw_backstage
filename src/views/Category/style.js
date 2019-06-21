import styled from 'styled-components'

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
S.Loading = styled('section')`
  text-align: center;
`
