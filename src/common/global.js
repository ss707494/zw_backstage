import axios from 'axios'

export const isDev = process.env.NODE_ENV === 'development'
export const host = process.env.REACT_APP_IS_MOCK === '1' ? process.env.REACT_APP_MOCK_PATH ?? '' : ''

window.axios = axios

window.ssLog = data => {
  if (isDev) {
    console.log(data)
  }
  return data
}
