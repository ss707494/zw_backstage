import { useState, useCallback } from 'react'
import { isDev } from '@/common/global'

export const api = {}
api.ajax = type => (url, option) => {
  const preUrl = isDev ? '/Api' : ''
  const [data, setData] = useState({})
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const getData = useCallback(async params => {
    setLoading(true)
    const res = await axios[type](`${preUrl}${url}`, {
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
    setData(res?.data)
    return res?.data
  }, [option, preUrl, url])
  return [
    getData, data, loading, error
  ]
}
api.post = api.ajax('post')
api.get = api.ajax('get')

export default {
  api
}
