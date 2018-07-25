import AES from 'crypto-js/aes'
import cookie from 'src/consts/data'

export const isAuthenticated = () => {
	console.log("hi inside isAuthenticated: LS = ",window.localStorage.hasOwnProperty('token').toString(), " SS = ",window.sessionStorage.hasOwnProperty('token'))
	return window.localStorage.hasOwnProperty('token') || window.sessionStorage.hasOwnProperty('token')
}

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
	if (window.localStorage && localStorage.hasOwnProperty('token')) {
		localStorage.clear('token')
	}
	if (window.sessionStorage && sessionStorage.hasOwnProperty('token')) {
		sessionStorage.clear()
	}
	if ((document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1]) {
		eraseCookie('token')
	}
	return true
}

const setCookie = (cname, cvalue, exdays) => {
	let d = new Date()
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
	let expires = "expires=" + d.toUTCString()
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

const eraseAllCookies = () => {
	document.cookie.split(";").forEach(c => {
		document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
	})
}

const eraseCookie = name => {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const saveClientUserData = (userId, identityId, userType, remember) => {
	// TODO: mohsen save Clients to localStorage
	// console.log("Encrypted data is : ",AES('Hi','secret key'))
	if (remember) {
		client.setID(userId)
		client.setIdentityId(identityId)
		setCookie('userId', userId, 30)
		setCookie('identityId', identityId, 30)
		setCookie('userType', userType, 30)
		if (window.localStorage) {
			localStorage.setItem('userId', userId)
			localStorage.setItem('identityId', identityId)
			localStorage.setItem('userType', userType)
		}
	}
	if (!remember) {
		setCookie('userId', userId, 0)
		setCookie('identityId', identityId, 0)
		setCookie('userType', userType, 0)
		if (window.sessionStorage) {
			sessionStorage.setItem('userId', userId)
			sessionStorage.setItem('identityId', identityId)
			sessionStorage.setItem('userType', userType)
		}
	}
	return true
}

const saveClientOrganData = (remember, organizationId) => {
  if (remember) {
    setCookie('organizationId', organizationId, 30)
    if (window.localStorage) {
      localStorage.setItem('organizationId', organizationId)
    }
  }
  if (!remember) {
    setCookie('organizationId', organizationId, 0)
    if (window.sessionStorage) {
      sessionStorage.setItem('organizationId', organizationId)
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
	if (window.localStorage && localStorage.hasOwnProperty('token')) {
		return localStorage.getItem('token')
	} else {
		return sessionStorage.getItem('token')
	}
}

const getUserId = () => {
	if (window.localStorage && localStorage.hasOwnProperty('userId')) {
		return localStorage.getItem('userId')
	} else {
		return sessionStorage.getItem('userId')
	}
}

const getIdentityId = () => {
	if (window.localStorage && localStorage.hasOwnProperty('identityId')) {
		return localStorage.getItem('identityId')
	} else {
		return sessionStorage.getItem('identityId')
	}
}

const getUserType = () => {
	if (window.localStorage && localStorage.hasOwnProperty('userType')) {
		return localStorage.getItem('userType')
	} else {
		return sessionStorage.getItem('userType')
	}
}

const getOrganizationId = () => {
	if (window.localStorage && localStorage.hasOwnProperty('organizationId')) {
		return localStorage.getItem('organizationId')
	} else {
		return sessionStorage.getItem('organizationId')
	}
}

const client = {
	isAuthenticated,
	setSessionLS,
	setTokenLS,
	getToken,
	clearToken,
	clearData,
  saveClientUserData,
  saveClientOrganData,
	getUserId,
	getIdentityId,
  getUserType,
	getOrganizationId
}
export default client