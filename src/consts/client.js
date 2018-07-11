export const isAuthenticated = () => {
  return window.localStorage.hasOwnProperty('token') || window.sessionStorage.hasOwnProperty('token')
}

const setTokenLS = (token) => {
  if (window.localStorage) {
    window.localStorage.setItem('token', token)
  }
}

const setSessionLS = (token) => {
  if (window.sessionStorage) {
    window.sessionStorage.setItem('token', token)
  }
}

const clearToken = () => {
  if (window.localStorage && localStorage.hasOwnProperty('token')) {
    localStorage.clear('token')
  }
  if (window.sessionStorage && sessionStorage.hasOwnProperty('token')) {
    sessionStorage.clear()
  }
  if ((document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]) {
    document.cookie.erase('token')
  }
  return true
}

const setCookie = (cname, cvalue, exdays) => {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

const saveData = (id, identity, identity_type, remember) => {
  if (remember) {
    setCookie('id', id, 30)
    setCookie('identity', identity, 30)
    setCookie('identity_type', identity_type, 30)
    if (window.localStorage) {
      localStorage.setItem('id', id)
      localStorage.setItem('identity', identity)
      localStorage.setItem('identity_type', identity_type)
    }
  }
  if (!remember) {
    setCookie('id', id, 0)
    setCookie('identity', identity, 0)
    setCookie('identity_type', identity_type, 0)
    if (window.sessionStorage) {
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('identity', identity)
      sessionStorage.setItem('identity_type', identity_type)
    }
  }
  return true
}

const clearData = () => {
  window.localStorage && localStorage.clear()
  window.sessionStorage && sessionStorage.clear()
  document.cookie.erase()
}

const getToken = () => {
  if (window.localStorage && localStorage.hasOwnProperty('token')) {
    return localStorage.getItem('token')
  } else {
    return sessionStorage.getItem('token')
  }
}

const getId = () => {
  if (window.localStorage && localStorage.hasOwnProperty('id')) {
    return localStorage.getItem('id')
  } else {
    return sessionStorage.getItem('id')
  }
}

const getIdentity = () => {
  if (window.localStorage && localStorage.hasOwnProperty('identity')) {
    return localStorage.getItem('identity')
  } else {
    return sessionStorage.getItem('identity')
  }
}

const getIdentityType = () => {
  if (window.localStorage && localStorage.hasOwnProperty('identity_type')) {
    return localStorage.getItem('identity_type')
  } else {
    return sessionStorage.getItem('identity_type')
  }
}

const client = {
  isAuthenticated,
  setSessionLS,
  setTokenLS,
  getToken,
  clearToken,
  clearData,
  saveData,
  getId,
  getIdentity,
  getIdentityType
}
export default client