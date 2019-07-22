// import AES from 'crypto-js/aes'
import cookie from 'src/consts/data'

export const isAuthenticated = () => window.localStorage.hasOwnProperty('token') || window.sessionStorage.hasOwnProperty('token')

const setTokenLS = (token) => {
  if (window.localStorage) {
    window.localStorage.setItem('token', token)
    cookie.setTOKEN(token)
  }
}

const setSessionLS = (token) => {
  if (window.sessionStorage) {
    window.sessionStorage.setItem('token', token)
    cookie.setSession(token)
  }
}

const clearToken = () => {
  if (window.localStorage && localStorage.hasOwnProperty('token')) localStorage.clear('token')
  if (window.sessionStorage && sessionStorage.hasOwnProperty('token')) sessionStorage.clear()
  if ((document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/) || [null])[1]) eraseCookie('token')
  return true
}

const setCookie = (cname, cvalue, exdays) => {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

const eraseAllCookies = () => {
  document.cookie.split(';').forEach(c => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
  })
}

const eraseCookie = name => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const saveData = ({identityId, userType, remember}) => {
  // TODO: mohsen save Clients to localStorage
  if (remember) {
    setCookie('identityId', identityId, 30)
    setCookie('userType', userType, 30)
    if (window.localStorage) {
      localStorage.setItem('identityId', identityId)
      localStorage.setItem('userType', userType)
    }
  }
  if (!remember) {
    setCookie('identityId', identityId, 0)
    setCookie('userType', userType, 0)
    if (window.sessionStorage) {
      sessionStorage.setItem('identityId', identityId)
      sessionStorage.setItem('userType', userType)
    }
  }
  return true
}

const clearData = () => {
  window.localStorage && localStorage.clear()
  window.sessionStorage && sessionStorage.clear()
  eraseAllCookies()
}

const getToken = () => {
  if (window.localStorage && localStorage.hasOwnProperty('token')) return localStorage.getItem('token')
  else return sessionStorage.getItem('token')
}

const getIdentityId = () => {
  if (window.localStorage && localStorage.hasOwnProperty('identityId')) return localStorage.getItem('identityId')
  else return sessionStorage.getItem('identityId')
}

const getUserType = () => {
  if (window.localStorage && localStorage.hasOwnProperty('userType')) return localStorage.getItem('userType')
  else return sessionStorage.getItem('userType')
}

const checkIdWithQueryId = (paramId) => {
  const clientIdentityId = +getIdentityId()
  return paramId === clientIdentityId
}

const client = {
  isAuthenticated,
  setSessionLS,
  setTokenLS,
  getToken,
  clearToken,
  clearData,
  saveData,
  getIdentityId,
  getUserType,
  checkIdWithQueryId,
}
export default client
