import axios from 'axios'

export const isDev = process.env.NODE_ENV === 'development'

window.axios = axios

window.ssLog = data => {
  if (isDev) {
    console.log(data)
  }
  return data
}
