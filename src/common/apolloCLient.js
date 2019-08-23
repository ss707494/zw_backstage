import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getToken } from '@/common/token'
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
        Authorization: getToken(),
        refreshtoken: getToken('refreshtoken'),
      }
    }));
  }
  //
  // const response = (res, operation) => {
  //   const { response: { headers } } = operation.getContext();
  //   if (headers.has('refreshtoken')) {
  //     const { token, refreshtoken } = JSON.parse(headers.get('refreshtoken'))
  //     setToken(token)
  //     setToken(refreshtoken, 'refreshtoken')
  //   }
  // }

  const onError = ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        )
        showMessage({ message })
      })
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError.bodyText}`);
      if (networkError.statusCode === 401) {
        showMessage({ message: '请重新登录' })
        history.push('/login')
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
