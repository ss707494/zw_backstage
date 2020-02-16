import styled from "styled-components"
import { Link } from 'react-router-dom'
import Paper from "@material-ui/core/Paper";
import { grey } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import { val } from "@/common/style";


export const S = {}
S.MenuLayout = styled('div')`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 64px 1fr;
  grid-column-gap: 20px;
  > nav {
    display: flex;
    flex-direction: column;
  }
`
S.Header = styled(Paper)`
  display: flex;
  align-items: center;
  z-index: 5;
  grid-area: 1 / 1 / 2 / 3;
  &&& {
  }
  > aside {
    flex-basis: 200px;
  }
  > section {
    display: flex;
    align-items: center;
    > button {
      background-color: ${grey[700]};
      min-width: 36px;
      padding: 5px 0;
      margin-right: 8px;
    }
  }
  > main {
    margin-left: auto;
  }
  > div {
    margin: 0 10px;
    display: flex;
    align-items: center;
    > img {
      width: 25px;
      height: 25px;
      overflow: hidden;
      border-radius: 50%;
    }
  }
`

const menuWidth = '160px'

S.MenuList = styled(Paper)`
  &&& {
    position: relative;
    transition: all ${val.animate};
    max-width: ${({fold}) => ~~fold ? '0' : menuWidth};
    width: ${menuWidth};
  }
  & .MuiMenuItem-root {
    line-height: 1.7;
  }
  & .MuiList-root {
    z-index: 9;
  }
`

S.MenuMain = styled('div')`
  display: grid;
`

S.Link = styled(Link)`
  display: block;
`

S.FoldMenu = styled(Button)`
  &&& {
    position: absolute;
    top: 30vh;
    transition: left ${val.animate};
    left: ${({fold}) => ~~fold ? '0' : menuWidth};
    background: transparent;
    height: 85px;
    width: 25px;
    min-width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
    padding: 0;
    > span {
      z-index: 3;
      > svg {
        position: relative;
        left: -4px;
      }
    }
    &:after {
      content: '';
      position: absolute;
      background: ${grey[800]};
      height: 100%;
      transform-origin: left;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      width: 170%;
      left: -5px;
      transform: perspective(8px) rotateY(5deg);
    }
  }
`
