import styled from "styled-components";
import {CusTextField} from "@/component/CusTextField";

export const ConfigGroupStyle: any = {}

export const ConfigGroupStyleBox = styled.div`
  //max-width: 400px
  > header {
    margin-bottom: 18px;
  }

`
export const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`

export const SettingBox = styled.div`
  display: grid;
  grid-template-columns: 90px 200px 200px;
  grid-gap: 10px;
  align-items: center;
  > section {
    grid-column: 1 / 3;
  }
`

export const TextField = styled(CusTextField)`
  &&& {
    margin-bottom: 0;
  }
  & .MuiInputLabel-root {
    background: #61dafb;
  }
`
