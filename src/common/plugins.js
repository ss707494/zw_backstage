
axios.defaults.timeout = 0
axios.defaults.withCredentials = true
axios.interceptors.request.use(
    async config => {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      // config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTU1MDAzODQyMCwiZXhwIjoxNTUwMjExMjIwfQ.4425yGKLu9zhEvMTatG-6MUYPUisNsbfH0b1IfmCygg'
      return config
    }
)
