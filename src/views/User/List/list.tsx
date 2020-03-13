import React, {useEffect} from "react"
import {useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {listModel} from "@/views/User/List/model"
import {StyleTableBox} from "@/common/style/tableBox"
import {S} from "@/views/Order/List/style"
import CircularProgress from "@material-ui/core/CircularProgress"
import TableHead from "@material-ui/core/TableHead"
import {styled, TableRow, useTheme} from "@material-ui/core"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import TableBody from "@material-ui/core/TableBody"
import {PaginationByModel} from "@/component/Pagination"
import {formatDate} from "@/common/utils"
import {getUserListDoc} from "@/common/graphqlTypes/graphql/doc"
import {CusTextField} from "@/component/CusTextField"
import {CusButton} from "@/component/CusButton"

const SearchBox = styled('div')({
  display: "grid",
  gridTemplateColumns: 'repeat(3, 340px)',
  gridColumnGap: '8px',
})

export const List = () => {
  const theme = useTheme()
  const userListModel = useStoreModelByType__Graphql(listModel)
  const {state, actions, getLoad} = userListModel
  const {list} = state
  console.log(list)

  useEffect(() => {
    actions.getList()
  }, [actions])

  return (
      <StyleTableBox.Box
          // @ts-ignore
          headerColumn={1}>
        <header>
          <StyleTableBox.HeaderBox>
            <header>用户列表</header>
            <section>您可以进行管理</section>
          </StyleTableBox.HeaderBox>
          <SearchBox>
            <CusTextField
                label={'用户名'}
                value={state.searchParams.name}
                onChange={e => actions.setSearchParams({name: e.target.value})}
            />
            <CusTextField
                label={'用户名'}
                value={state.searchParams.name}
                onChange={e => actions.setSearchParams({name: e.target.value})}
            />
            <CusTextField
                label={'用户名'}
                value={state.searchParams.name}
                onChange={e => actions.setSearchParams({name: e.target.value})}
            />
            <CusButton
                variant={"outlined"}
                onClick={() => actions.getList()}
            >搜索</CusButton>
          </SearchBox>
        </header>
        <main>
          {(getLoad(getUserListDoc)) ? <S.Loading><CircularProgress/></S.Loading>
              : <StyleTableBox.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    {['账号', '邮箱', '手机', '用户名', '注册时间']
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list?.map(e => <TableRow key={`TableBody${e?.id}`}>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.userInfo?.email}</TableCell>
                    <TableCell>{e.userInfo?.phone}</TableCell>
                    <TableCell>{e.userInfo?.name}</TableCell>
                    <TableCell>{formatDate(new Date(e.createTime), 'yyyy/MM/dd HH:mm')}</TableCell>
                  </TableRow>)}
                </TableBody>
              </StyleTableBox.Table>
          }
          <PaginationByModel pageModel={userListModel}/>
        </main>
      </StyleTableBox.Box>
  )
}
