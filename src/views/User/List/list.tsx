import React, {useEffect} from "react"
import {useStoreModelByType__Graphql} from "@/common/ModelAction/useStore"
import {listModel} from "@/views/User/List/model"
import {StyleTableBox} from "@/common/style/tableBox"
import {S} from "@/views/Order/List/style"
import CircularProgress from "@material-ui/core/CircularProgress"
import TableHead from "@material-ui/core/TableHead"
import {Checkbox, styled, TableRow, useTheme} from "@material-ui/core"
import {CusTableCell as TableCell} from "@/component/CusTableCell"
import TableBody from "@material-ui/core/TableBody"
import {PaginationByModel} from "@/component/Pagination"
import {formatDate} from "@/common/utils"
import {getUserListDoc} from "@/common/graphqlTypes/graphql/doc"
import {CusTextField} from "@/component/CusTextField"
import {CusButton} from "@/component/CusButton"
import {dictAllListModel} from "@/views/Product/EditModal/model"
import MenuItem from "@material-ui/core/MenuItem"
import {CusSelect} from "@/component/CusSelect"
import {showMessage} from '@/component/Message'

const SButton = styled(CusButton)({
})

const SearchBox = styled('div')({
  display: "grid",
  gridTemplateColumns: 'repeat(3, 340px)',
  gridColumnGap: '16px',
})

const HeaderButton = styled('div')({
  display: 'grid',
  marginTop: '20px',
  gridTemplateColumns: '180px 180px',
  gridGap: '6px',
  '&&& > .MenuLayout-MuiFormControl-root': {
    marginBottom: 0,
  }
})

export const List = () => {
  const {actions: dictAllListAction, state: dictAllListState} = useStoreModelByType__Graphql(dictAllListModel)
  useEffect(() => {
    dictAllListAction.getDictList()
  }, [dictAllListAction])
  const theme = useTheme()
  const userListModel = useStoreModelByType__Graphql(listModel)
  const {state, actions, getLoad} = userListModel
  const {list, actionUserLevel, selectIds} = state

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
                label={'手机'}
                value={state.searchParams.phone}
                onChange={e => actions.setSearchParams({phone: e.target.value})}
            />
            <CusTextField
                label={'邮箱'}
                value={state.searchParams.email}
                onChange={e => actions.setSearchParams({email: e.target.value})}
            />
            <SButton
                variant={"outlined"}
                onClick={() => actions.getList()}
            >搜索</SButton>
          </SearchBox>
        </header>
        <main>
          <HeaderButton>
            <CusSelect
                placeholder={'订单状态'}
                value={actionUserLevel}
                onChange={(v) => actions.setActionUserLevel(v.target.value)}
            >
              {dictAllListState.userLevelList?.map(e => (
                  <MenuItem
                      key={`userLevelList${e.id}`}
                      value={`${e.code}`}
                  >{e.name}</MenuItem>
              ))}
            </CusSelect>
            <CusButton
                onClick={async () => {
                  if (await actions.saveUserLevel()) {
                    showMessage({ message: '操作成功' })
                    actions.getList()
                  }
                }}
                variant={'outlined'}
            >批量修改</CusButton>
          </HeaderButton>
          {(getLoad(getUserListDoc)) ? <S.Loading><CircularProgress/></S.Loading>
              : <StyleTableBox.Table theme={theme}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {(() => {
                        const isAll = list.every(item => selectIds.includes(item.id as string))
                        return <Checkbox
                            checked={isAll}
                            indeterminate={!isAll && !!selectIds.length}
                            onChange={event => {
                              actions.setSelectIds({
                                flag: event.target.checked,
                                ids: list.map(value => value.id),
                              })
                            }}
                        />
                      })()}
                    </TableCell>
                    {['注册id', '用户等级', '邮箱', '手机', '用户名', '注册时间', '当月达人币', '下月达人币']
                        .map(e => <TableCell key={`TableHead${e}`}>
                          {e}
                        </TableCell>)
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list?.map(e => <TableRow key={`TableBody${e?.id}`}>
                    <TableCell>
                      <Checkbox
                          checked={selectIds.includes(`${e?.id}`)}
                          indeterminate={false}
                          onChange={event => actions.setSelectIds({
                            flag: event.target.checked,
                            ids: [e.id],
                          })}
                      />
                    </TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>
                      {dictAllListState.userLevelList?.find(value => value.code === e.userInfo?.userLevel)?.name}
                    </TableCell>
                    <TableCell>{e.userInfo?.email}</TableCell>
                    <TableCell>{e.userInfo?.phone}</TableCell>
                    <TableCell>{e.userInfo?.name}</TableCell>
                    <TableCell>{formatDate(new Date(e.createTime), 'yyyy/MM/dd HH:mm')}</TableCell>
                    <TableCell>{0}</TableCell>
                    <TableCell>{0}</TableCell>
                  </TableRow>)}
                </TableBody>
              </StyleTableBox.Table>
          }
          <PaginationByModel pageModel={userListModel}/>
        </main>
      </StyleTableBox.Box>
  )
}
