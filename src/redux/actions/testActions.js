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

const fetchStuff = () => {
	alert('in fetch');
	return dispatch => {
		socket.emit(REST_REQUEST, {
			method:"get",
			url: REST_URL+'exchanges/identities/',
			result: 'TEST_REDUX_RESPONSE',
			token
		});
		socket.on('TEST_REDUX_RESPONSE',res => {
			dispatch(receiveStuff(res))
		})
	}
};

const socketing = (url) => (result) => {
	return socket.emit(REST_REQUEST, {
		method: 'get',
		url: REST_URL+url,
		result: result,
		token
	});
};

const TestActions = {
	fetchStuff,
	subtractNumber,
	addNumber,
	receiveStuff
};
export default TestActions;