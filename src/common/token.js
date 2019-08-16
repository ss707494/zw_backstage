export const setToken = (token, name = 'token') => localStorage.setItem(name, token)

export const getToken = (name = 'token') => localStorage.getItem(name) || ''
