import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { client } from '@/common/apolloCLient'

export const WrapperQuery = (query, variables) => child => (
    <Query query={query}
           variables={variables}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return child(data, refetch)
      }}
    </Query>
)

export const useQueryGraphql = (query, variables, option) => {
  const [data, setData] = useState({})
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const getData = async (param) => {
    setLoading(true)
    const { data } = await client.query({
      query,
      variables: {
        ...variables,
        ...param,
      },
      fetchPolicy: 'network-only',
      ...option,
    }).catch(e => {
      setError(e)
      return e
    }).finally(() => {
      setLoading(false)
    })
    data && setData(data)
    return data
  }
  return [
    getData, data, loading, error
  ]
}

export const useMutationGraphql = (mutation, variables, option) => {
  const [res, setRes] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const mutate = async (param) => {
    setLoading(true)
    const { data } = await client.mutate({
      mutation,
      variables: {
        ...variables,
        ...param,
      },
      ...option,
    }).catch(e => {
      setError(e)
      return e
    }).finally(() => {
      setLoading(false)
    })
    setRes(data)
    return data
  }
  return [
    mutate, res, loading, error
  ]
}

export default {
  WrapperQuery,
}
