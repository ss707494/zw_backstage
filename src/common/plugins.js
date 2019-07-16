import { host } from "@/common/global";

axios.defaults.timeout = 0
axios.defaults.withCredentials = true
axios.interceptors.request.use(
    async config => {
      const preUrl = process.env.REACT_APP_PRE_API || ''
      config.headers['XRequested-With'] = 'XMLHttpRequest'
      config.headers['Access-Control-Allow-Origin'] = '*'
      // config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTU1MDAzODQyMCwiZXhwIjoxNTUwMjExMjIwfQ.4425yGKLu9zhEvMTatG-6MUYPUisNsbfH0b1IfmCygg'
      return {
        ...config,
        url: `${host}${preUrl}${config.url}`
      }
    }

)
