import styled from "styled-components";

export const ConfigGroupStyle: any = {}

export const ConfigGroupStyleBox = styled.div`
  //max-width: 400px
  > header {
    margin-bottom: 18px;
  }
`

export const GroupDiscountBox = styled.div`
  margin-bottom: 16px;
  max-width: 300px;
`

export const SettingBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 90px 200px;
  grid-auto-columns: 200px;
  grid-template-rows: repeat(3, max-content);
  align-items: center;
  justify-items: center;
  > section {
    padding: 6px 6px 10px;
  }
  > main {
    padding: 6px;
    align-self: start;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 4px;
    .MenuLayout-MuiFormLabel-root {
      justify-content: center;
    }
  }
`
