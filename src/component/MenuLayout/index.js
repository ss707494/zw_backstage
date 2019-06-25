import React, { useState } from 'react'
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button'
import { SearchInput } from "@/component/SearchInput";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { createMuiTheme } from '@material-ui/core/styles'
import { red, grey } from '@material-ui/core/colors'
import { wrapperTheme } from '@/common/theme'
import { S } from './style'

const _themeOption = createMuiTheme({
  palette: {
    primary: red,
    secondary: grey,
    type: 'light',
    formBackground: '#F5F5F5',
  },
})

const menuData = [
  ['category', '分类管理', ''],
  ['product', '产品管理', ''],
  ['test', '测试页面', ''],
]

export const MenuLayout = ({ children }) => {
  const [fold, setFold] = useState(0)

  return (
      <S.MenuLayout fold={fold}
      >
        <S.Header square
                  elevation={3}>
          <aside>food</aside>
          <section>
            <Button>
              <KeyboardArrowLeft/>
            </Button>
            <Button>
              <KeyboardArrowRight/>
            </Button>
          </section>
          <main>
            <SearchInput/>
          </main>
          <div>
            <img src={require('./img/cat.jpg')}
                 alt="cat"/>
            account
          </div>
        </S.Header>
        <S.MenuList
            fold={fold}
            square
            elevation={2}>
          <MenuList>
            {
              menuData.map(([path, text, icon]) =>
                  <MenuItem key={`menuitem${path}`}
                            component={S.Link}
                            to={`/${path}`}>
                    <img src={icon || require('./img/round-view_list-24px.svg')}
                         alt=""/>
                    {icon}
                    {text || path}
                  </MenuItem>)
            }
            {/*<MenuItem onClick={() => {*/}
            {/*  logout()*/}
            {/*  history.push('/login')*/}
            {/*}}>*/}
            {/*  logout*/}
            {/*</MenuItem>*/}
          </MenuList>
          <S.FoldMenu
              fold={fold}
              onClick={() => setFold((fold + 1) % 2)}
          >
            {fold ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
          </S.FoldMenu>
        </S.MenuList>
        <S.MenuMain>
          {wrapperTheme(_themeOption)(children)}
          {/*{children}*/}
        </S.MenuMain>
      </S.MenuLayout>
  );
}

export default {
  MenuLayout,
  menuData
}
