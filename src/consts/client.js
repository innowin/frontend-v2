import cookies from 'browser-cookies'

export const isAuthenticated = async () => {
	const result = await cookies.get('token') !== null;
	return result
};

const setTokenLS = async (token) => {
	if(window.localStorage) {
		await localStorage.setItem('token',token)
	}
	await cookies.set('token',token,{expires:30})
}

const setSessionLS = async (token) => {
	if(window.localStorage) {
		await localStorage.setItem('token',token)
	}
	await cookies.set('token',token,{expires:null})
}

const clearToken = async () => {
	if(window.localStorage) {
		return await localStorage.clear('token')
	}
	return await cookies.erase('token')
}

const getToken = async () => {
	let token
	if(window.localStorage) {
		token = await localStorage.getItem('token')
		return token
	}
	token = await cookies.get('token')
	return token
}

const client = {
	isAuthenticated,
	setSessionLS,
	setTokenLS,
	getToken,
	clearToken,
};
export default client