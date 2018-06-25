import types from './actionTypes';

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

const TestActions = {
	fetchUsers,
	subtractNumber,
	addNumber,
	receiveStuff
};
export default TestActions;