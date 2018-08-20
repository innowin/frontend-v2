import initialState from '../../initialState';
import types from '../../../actions/types';


const createProduct = (state = initialState.common.product, action) => {
    switch (action.type) {
        case types.COMMON.CREATE_PRODUCT:
            return {
                ...state,
                // isLoaded: false,
                // isLoading: true
            }

        case types.SUCCESS.COMMON.CREATE_PRODUCT: {
            // const {data} = action
            // const {id} = data
            // const newList = {
            //     ...state.list,
            //     [data.id]: {
            //         ...data,
            //     }
            // }
            return {
                ...state,
                // list: newList,
                // isLoading: false,
                // isLoaded: true
            }
        }
        case types.ERRORS.COMMON.CREATE_PRODUCT:
            return {
                ...state,
                //
                // isLoading: false,
                // isLoaded: false
            }

        default:
            return state
    }
};

export default createProduct;