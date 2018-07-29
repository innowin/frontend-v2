import initialState from './initialState';
import types from '../actions/types';

const common = (state = initialState.common, action) => {
    switch (action.type) {
        /** ----------------------- get viewingProduct ------------------------> **/
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

        /** ---------------------- update viewingProduct ----------------------> **/
        case types.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
                viewingProduct: {...state.viewingProduct, isLoading: true, isLoaded: false}
            }

        case types.SUCCESS.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
                viewingProduct: {content: action.data, isLoading: false, isLoaded: true}
            }

        case types.ERRORS.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
                viewingProduct: {...state.viewingProduct, isLoading: false, isLoaded: false}
                // this is not completed and need for more error handling.
            }

        /** -------------------------- get categories -------------------------> **/
        case types.COMMON.GET_CATEGORIES:
            return {
                ...state,
                categories: {...state.categories, isLoading: true, isLoaded: false}
            }

        case types.SUCCESS.COMMON.GET_CATEGORIES:
            console.log('---------< --------------< : ', action.data)
            return {
                ...state,
                categories: {content: action.data, isLoading: false, isLoaded: true}
            }

        case types.ERRORS.COMMON.GET_CATEGORIES:
            return {
                ...state,
                viewingProduct: {...state.viewingProduct, isLoading: false, isLoaded: false}
                // this is not completed and need for more error handling.
            }

        default:
            return state
    }
};

export default common;