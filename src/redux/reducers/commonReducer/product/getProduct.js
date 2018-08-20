import initialState from '../../initialState';
import types from '../../../actions/types';


const getProduct = (state = initialState.common.product, action) => {
    switch (action.type) {
        case types.COMMON.GET_PRODUCT_INFO:
            return {
                ...state,
                isLoaded: false,
                isLoading: true,
                error: null
            }

        case types.SUCCESS.COMMON.GET_PRODUCT_INFO: {
            const {data} = action
            return {
                list: {
                    ...state.list, [data.id]: {...data, viewed: true}
                },
                isLoading: false,
                isLoaded: true,
                viewingId: data.id
            }
        }
        case types.ERRORS.COMMON.GET_PRODUCT_INFO:
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            }

        default:
            return state
    }
};

export default getProduct;