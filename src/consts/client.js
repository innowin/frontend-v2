import cookies from 'browser-cookies'

export const isAuthenticated = () => {
	return window.localStorage.hasOwnProperty('token') || window.sessionStorage.hasOwnProperty('token');
};

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
	if(window.localStorage && localStorage.hasOwnProperty('token')) {
		localStorage.clear('token')
	}
	if (window.sessionStorage && sessionStorage.hasOwnProperty('token')) {
		sessionStorage.clear()
	}
	if ((document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]){
		document.cookie.erase('token');
	}
	return true;
}

const getToken = () => {
	if (window.localStorage && localStorage.getItem('token')) {
		return localStorage.getItem('token')
	} else {
		return sessionStorage.getItem('token')
	}
}

const client = {
	isAuthenticated,
	setSessionLS,
	setTokenLS,
	getToken,
	clearToken,
};
export default client