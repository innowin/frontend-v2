import initialState from './initialState';
import types from '../actions/types';

const common = (state = initialState.common, action) => {
    switch (action.type) {

        case types.COMMON.GET_PRODUCT_INFO:
            return {
                ...state,
                viewingProduct: {...state.viewingProduct, isLoading: true}
            }

        case types.SUCCESS.COMMON.GET_PRODUCT_INFO:
            return {
                ...state,
                viewingProduct: {content: action.data, isLoading: false, isLoaded: true}
            }

        case types.ERRORS.COMMON.GET_PRODUCT_INFO:
            return {
                ...state,
                viewingProduct: {content: {}, isLoading: false, isLoaded: false}
            }

        default:
            return state
    }
};

export default common;