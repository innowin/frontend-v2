import cookies from 'browser-cookies';
import io from 'socket.io-client';

cookies.defaults.secure = false;
cookies.defaults.expires = 30;

//Set DATA
export const setTOKEN = (token) => {
	cookies.set('token',token, {expires: 30})
};

export const setID = (id) => {
	cookies.set('id',id ,{expire: 30})
};
export const saveData = (data) => {
	const stringed_object = JSON.stringify(data)
	cookies.set('data',stringed_object,{expires: 30})
};
//Get DATA
export const ID = cookies.get('id');
export const ALL_COOKIES = cookies.all()
export const TOKEN = cookies.get('token');

//Erase
export const deleteTOKEN = () => {
	cookies.erase('token')
};

