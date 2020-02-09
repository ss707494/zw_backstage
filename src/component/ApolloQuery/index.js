import React, { useCallback, useState } from 'react'
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

export const useMutationGraphql = (mutation, option, dealParamsIn) => {
  const [res, setRes] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const mutate = useCallback(async (params) => {
    setLoading(true)
    const { data } = await client.mutate({
      mutation,
      variables: {
        ...(dealParamsIn ? dealParamsIn(params) : params)
      },
      ...option,
    }).catch(e => {
      setError(e)
      throw e
    }).finally(() => {
      setLoading(false)
    })
    setRes(data)
    return data
  }, [dealParamsIn, mutation, option])
  return [
    mutate, res, loading, error
  ]
}

export const useQueryGraphql = (query, options, dealParamsIn) => {
  const [res, setRes] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const getData = useCallback(async (params, funOption) => {
    setLoading(true)
    const { data } = await client.query({
      fetchPolicy: 'network-only',
      query,
      variables: {
        ...(dealParamsIn ? dealParamsIn(params) : params)
      },
      ...options,
      ...funOption,
    }).catch(e => {
      setError(e)
      throw e
    }).finally(() => {
      setLoading(false)
    })
    setRes(data)
    return data
  }, [dealParamsIn, options, query])
  return [
    getData, res ?? {}, loading, error
  ]
}

const dealParams = (params => ({
  data: params,
}))

export const useQuerySimpleData = (query, options) => {
  return useQueryGraphql(query, options, dealParams)
}

export const useMutationSimpleData = (query, options) => {
  return useMutationGraphql(query, options, dealParams)
}

export default {
  WrapperQuery,
}
