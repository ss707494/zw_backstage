import { useState, useCallback } from 'react'

export const api = {}
api.ajax = type => (url, option) => {
  const [data, setData] = useState({})
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const getData = useCallback(async (params) => {
    setLoading(true)
    const res = await axios[type](url, {
      ...option,
      ...params
    })
        .catch(e => {
          setError(e)
          return e
        })
        .finally(() => {
          setLoading(false)
        })
    setData(res?.data || {})
    return res?.data || {}
  }, [option, url])
  return [
    getData, data, loading, error
  ]
}
api.post = api.ajax('post')
api.get = api.ajax('get')

export default {
  api
}
