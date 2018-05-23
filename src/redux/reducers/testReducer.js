import initialState from './initialState';
import types from '../actions/actionTypes';

const test = (state = initialState.test, action) => {
	switch (action.type) {
		case types.FETCH_SUCCEEDED:
			console.log('RECEIVE_STUFF Action');
			return { ...state , list: action.list};
		case types.ADD_NUMBER:
			console.log('ADD NUMBER action');
			return {...state, result: state.result+action.payload};
		case types.SUBTRACT_NUMBER:
			console.log('SUBTRACT NUMBER action');
			return {...state, result: state.result-action.payload};
		default:
			return state;
	}
};

export default test;