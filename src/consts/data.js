import cookies from 'browser-cookies';

cookies.defaults.secure = false;

//Set DATA
export const setTOKEN = (token) => {
	cookies.set('token', token, {expires: 30})
};

export const setSession = (token) => {
	cookies.set('token', token, {expires: null})
};

export const setID = (id) => {
	cookies.set('id', id, {expires: 30})
};

export const setIdentityId = (id) => {
	cookies.set('identityId', id.toString() , {expires:30})
};

export const saveData = (data) => {
	const stringed_object = JSON.stringify(data);
	cookies.set('data', stringed_object, {expires: 30})
};

//Get DATA
export const IDENTITY_ID = cookies.get('identityId');
export const ID = cookies.get('id');
export const ALL_COOKIES = cookies.all();
export const TOKEN = cookies.get('token');

//Erase
export const deleteTOKEN = () => {
	cookies.erase('token');
};

