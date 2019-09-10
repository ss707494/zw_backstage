import { host } from "@/common/global";
import { getToken, setToken } from "@/common/token";
import { showMessage } from "@/component/Message";
import history from "@/common/history";

axios.defaults.timeout = 0
axios.defaults.withCredentials = true
axios.interceptors.request.use(
    async config => {
      const preUrl = process.env.REACT_APP_PRE_API || ''
      config.headers['XRequested-With'] = 'XMLHttpRequest'
      config.headers['Access-Control-Allow-Origin'] = '*'
      config.headers['Authorization'] = getToken()
      return {
        ...config,
        url: `${host}${preUrl}${config.url}`
      }
    }
)
axios.interceptors.response.use(
    async response => {

      return response
    },
    async err => {
      const response = err.response
      if (response.status === 401) {
        if (response.data.error.includes('first') && getToken('refreshtoken')) {
          const res = await axios.post('/api/getTokenRefresh', {
            refreshtoken: getToken('refreshtoken')
          })
          if (res.data?.token) {
            setToken(res.data.token)
            setToken(res.data.refreshtoken, 'refreshtoken')

            showMessage({ message: '登录超时,刷新登录信息' })
            window.location.reload()
          }
        } else {
          showMessage({ message: '请重新登录' })
          history.push('/login')
        }
      }
      return Promise.reject(err)
    }
)

