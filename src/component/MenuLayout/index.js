import React, { useState } from 'react'
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button'
import { SearchInput } from "@/component/SearchInput";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { createMuiTheme } from '@material-ui/core/styles'
import { ChildCare } from '@material-ui/icons'
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

const reactAppPreRoute = process.env.REACT_APP_PRE_ROUTE;
const menuData = [
  [`${reactAppPreRoute}/user`, '用户管理', ''],
  [`${reactAppPreRoute}/category`, '分类管理', ''],
  [`${reactAppPreRoute}/product/0`, '普通产品管理', ''],
  [`${reactAppPreRoute}/product/1`, '拼团产品管理', ''],
  [`${reactAppPreRoute}/promoCode`, '优惠管理', ''],
  [`${reactAppPreRoute}/addProduct`, '补货管理', ''],
  [`${reactAppPreRoute}/order`, '订单管理', ''],
  [`${reactAppPreRoute}/dictionary`, '字典管理', ''],
  [`${reactAppPreRoute}/dataConfig`, '配置管理', ''],
  [`${reactAppPreRoute}/test`, '测试页面', ''],
]

export const MenuLayout = ({ children, location }) => {
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
                  <MenuItem
                      selected={location?.pathname?.includes(path)}
                      key={`menuitem${path}`}
                      component={S.Link}
                      to={`${path}`}>
                    {/*<img src={icon || require('./img/round-view_list-24px.svg')}*/}
                    {/*     alt=""/>*/}
                    {icon
                        ? <img
                            src={icon}
                            alt=""
                        /> : <ChildCare/>}
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
        <S.MenuMain
            key={location?.pathname}
        >
          {wrapperTheme(_themeOption, { seed: 'MenuLayout' })(children)}
          {/*{children}*/}
        </S.MenuMain>
      </S.MenuLayout>
  );
}

export default {
  MenuLayout,
  menuData
}
