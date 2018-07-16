import initialState from './initialState';
import types from '../actions/actionTypes';

const {SUCCESS, ERRORS, CREATE_SKILL} = types
const productReducer = (state = initialState.user.skills, action) => {
    switch (action.type) {
        case CREATE_SKILL:
            console.log("oh yes that's so clever thing.", action);
            return { ...state };
        case SUCCESS.CREATE_SKILL:
            console.log('this is a success message.', action.payload);
            return {...state};
        case ERRORS.CREATE_SKILL:
            console.log('this is the failure message.');
            return {...state};
        default:
            return state;
    }
};

export default productReducer;