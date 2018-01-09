import cookies from 'browser-cookies';
cookies.defaults.secure = true;
cookies.defaults.expires = 30;

export const setTOKEN = (token) => {
	cookies.set('token',token, {expires: 30})
};

export const deleteTOKEN = () => {
	cookies.erase('token')
};

export const TOKEN = cookies.get('token');