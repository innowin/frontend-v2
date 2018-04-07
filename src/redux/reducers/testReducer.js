import initialState from './initialState';
import {FETCH_STUFF, RECEIVE_STUFF, ADD_NUMBER , SUBTRACT_NUMBER } from '../actions/actionTypes';

 const test = (state = initialState.test, action) => {
	switch (action.type) {
		case FETCH_STUFF:
			console.log('FETCH_STUFF Action');
			return action;
		case RECEIVE_STUFF:
			console.log('RECEIVE_STUFF Action');
			return { ...state , list: action.list};
		case ADD_NUMBER:
			console.log('ADD NUMBER action');
			return {...state, result: state.result+action.payload};
		case SUBTRACT_NUMBER:
			console.log('SUBTRACT NUMBER action');
			return {...state, result: state.result-action.payload};
		default:
			return state;
	}
};

export default test;