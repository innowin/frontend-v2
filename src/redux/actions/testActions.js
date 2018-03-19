import * as types from './actionTypes';
import {SOCKET as socket , REST_URL as url} from "src/consts/URLS";
import {REST_REQUEST} from "src/consts/Events";
import {TOKEN as token} from "src/consts/data";

export const addNumber =(number) => ({
		type: types.ADD_NUMBER,
		payload: number
	});

export const subtractNumber = number => ({
		type: types.SUBTRACT_NUMBER,
		payload: number
	});

export const receiveStuff = list => ({
		type: types.RECEIVE_STUFF,
		list
	});

export const fetchStuff = () => {
	return dispatch => {
		socket.emit(REST_REQUEST, {
			method:"get",
			url: url+'exchanges/identities/',
			result: 'TEST_REDUX_RESPONSE',
			token
		});
		socket.on('TEST_REDUX_RESPONSE',res => {
			dispatch(receiveStuff(res))
		})
	}
};