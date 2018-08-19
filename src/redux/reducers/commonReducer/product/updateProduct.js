import initialState from '../../initialState';
import types from '../../../actions/types';


const updateProduct = (state = initialState.common.product, action) => {
    // should change the data tree and use 'initialState.common.product.list' in later.
    switch (action.type) {
        case types.COMMON.UPDATE_PRODUCT:
            return {
                ...state, // need for more request handling.
            }

        case types.SUCCESS.COMMON.UPDATE_PRODUCT: {
            const {data} = action
            const {id} = data
            const newList = {
                ...state.list,
                [id]: {
                    ...state.list[id],
                    ...data
                }
            }
            return {
                ...state,
                list: newList,
                isLoading: false,
                isLoaded: true
            }
        }
        case types.ERRORS.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error: 'there is some error in update product.'
            }

        default:
            return state
    }
};

export default updateProduct;