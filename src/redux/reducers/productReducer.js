import initialState from './initialState';
import types, {SUCCESS, FAILED, REQUEST} from '../actions/actionTypes';

const productReducer = (state = initialState.product, action) => {
    switch (action.type) {
        case types.ADD_CONTRIBUTION + REQUEST:
            console.log("oh yes that's so clever thing.", action);
            return { ...state };
        case types.ADD_CONTRIBUTION + SUCCESS:
            console.log('this is a success message.');
            return {...state};
        case types.ADD_CONTRIBUTION + FAILED:
            console.log('this is the failure message.');
            return {...state};
        default:
            return state;
    }
};

export default productReducer;