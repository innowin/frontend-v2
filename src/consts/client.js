import cookies from 'browser-cookies'

export const isAuthenticated = () => {
	return cookies.get('tokens') !== null;
};

export default {
	isAuthenticated,
};