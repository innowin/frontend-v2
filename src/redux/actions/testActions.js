import types from './actionTypes';
import {SOCKET as socket , REST_URL } from "src/consts/URLS";
import {REST_REQUEST} from "src/consts/Events";
import {TOKEN as token} from "src/consts/data";

const addNumber = number => ({
		type: types.ADD_NUMBER,
		payload: number
	});

const subtractNumber = number => ({
		type: types.SUBTRACT_NUMBER,
		payload: number
	});

const receiveStuff = list => ({
		type: types.RECEIVE_STUFF,
		list
	});

const fetchUsers = url => ({
	type: types.FETCH_USERS,
	url
});

const socketing = (url) => (result) => {
	return socket.emit(REST_REQUEST, {
		method: 'get',
		url: REST_URL+url,
		result: result,
		token
	});
};

const TestActions = {
	fetchUsers,
	subtractNumber,
	addNumber,
	receiveStuff
};
export default TestActions;