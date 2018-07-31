import initialState from '../initialState';
import types from '../../actions/types';

const category = (state = initialState.common.category, action) => {
    switch (action.type) {
        /** -------------------------- get categories -------------------------> **/
        case types.COMMON.GET_CATEGORIES:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    isLoading: true,
                    isLoaded: false
                }
            }

        case types.SUCCESS.COMMON.GET_CATEGORIES:
            return {
                ...state,
                categories: {
                    content: action.data,
                    isLoading: false,
                    isLoaded: true
                }
            }

        case types.ERRORS.COMMON.GET_CATEGORIES:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    isLoading: false,
                    isLoaded: false
                }// this is not completed and need for more error handling.
            }

        default:
            return state
    }
};

export default category;