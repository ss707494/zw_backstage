import styled from "styled-components"
import { blueGrey, grey, common } from "@material-ui/core/colors";
import { CusButton } from "@/component/CusButton";

export const S = {}
S.ImgUpload = styled('section')`
  
`

S.Add = styled('section')`&&& {
  border-radius: 5px;
  width: 120px;
  height: 90px;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${grey[200]};
  position: relative;
  > span {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ${props => props?.mainCss}
}
`
S.ImgBox = styled('section')`
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
  > svg {
    display: none;
    position: absolute;
  }
  &:hover {
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${blueGrey[600]};
      opacity: .2;
    }
    background: ${blueGrey[600]};
    > svg {
      display: inline-block;
      color: ${common.white};
    }
  }
`
S.AddButton = styled(CusButton)`&&{
  padding: 0;
}
`
