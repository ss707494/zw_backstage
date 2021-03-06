import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getToken, setToken } from '@/common/token'
import history from '@/common/history'
import { showMessage } from '@/component/Message'

export let client

export const wrapperApollo = (el) => {
  // const { showMessage } = con

  const omitTypename = (key, value) => {
    return key === '__typename' ? undefined : value
  }

  const request = (operation) => {
    if (operation.variables) {
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
    }
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        // 后台万能权限
        Authorization: getToken(),
        refreshtoken: getToken('refreshtoken'),
      }
    }));
  }

  const onError = ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        ssLog(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
        showMessage({ message })
      })
    }

    if (networkError) {
      const errMsg = networkError.bodyText ?? networkError.result.error ?? ''
      ssLog(`[Network error]: ${errMsg}`);
      if (networkError.statusCode === 401) {
        if (errMsg.includes('first') && getToken('refreshtoken')) {
          axios.post('/api/getTokenRefresh', {
            refreshtoken: getToken('refreshtoken')
          }).then(res => {
            if (res.data?.token) {
              setToken(res.data.token)
              setToken(res.data.refreshtoken, 'refreshtoken')

              showMessage({ message: '登录超时,刷新登录信息' })
              window.location.reload()
            } else {
              showMessage({ message: '请重新登录' })
              history.push('/login')
            }
          }).catch(err => {
            ssLog(err)
            showMessage({ message: '请重新登录' })
            history.push('/login')
          })
        } else {
          showMessage({ message: '请重新登录' })
          history.push('/login')
        }
      }
    }
  }

  client = new ApolloClient({
    // link,
    uri: "/api",
    request,
    onError,
    // response,
    // link: createHttpLink({ uri: "/sdfsf" }),
  });

  return (
      <ApolloProvider client={client}>
        {el}
      </ApolloProvider>
  )
}

export default {
  wrapperApollo,
}
