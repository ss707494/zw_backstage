import { useState, useCallback } from 'react'

export const api = {}
api.ajax = type => (url, option) => {
  const [data, setData] = useState({})
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const getData = useCallback(async (params) => {
    const _params = {
      ...option,
      ...params
    }
    // const formData = new FormData()
    // Object.keys(_params).forEach(e => {
    //   formData.set(e, _params[e])
    // })
    // setLoading(true)
    const res = await axios[type](url, _params, {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
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
