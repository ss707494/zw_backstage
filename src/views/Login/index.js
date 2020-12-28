import React, { useState } from 'react'
import { S } from './style'
import { BasicLayout } from "@/component/BasicLayout";
import { TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { setToken } from "@/common/token";
import { showMessage } from "@/component/Message";
import history from "@/common/history";

export const Login = () => {
  const [data, setData] = useState({})

  const submit = async () => {
    const {data: res} = await axios.post('/api/login', {
      ...data,
      type: 9,
    })
    if (res.data) {
      setToken(res.token)
      setToken(res.refreshtoken, 'refreshtoken')
      history.push('/')
    } else {
      showMessage({ message: res?.message })
    }
  }

  return (
      <S.Box>
        <Paper>
          <form>
            <div>
            <TextField
                label="用户名"
                value={data.name}
                onChange={e => setData({
                  ...data,
                  name: e.target.value
                })}
            />
            </div>
            <div>
            <TextField
                label="密码"
                value={data.password}
                type="password"
                onChange={e => setData({
                  ...data,
                  password: e.target.value
                })}
            />
            </div>
            <Button
                onClick={submit}
            >登录</Button>
          </form>
        </Paper>
      </S.Box>
  )
}

export default [{
  props: {
    path: process.env.REACT_APP_PRE_ROUTE + '/login',
    component: Login,
  },
  Layout: BasicLayout
}]

