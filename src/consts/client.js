import cookies from 'browser-cookies'

export const isAuthenticated = () => {
	return cookies.get('token') !== null;
};

const client = {
	isAuthenticated,
};
export default client