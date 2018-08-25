import initialState from '../../initialState';
import types from '../../../actions/types';


const product = (state = initialState.common.product, action) => {
    switch (action.type) {

        /** <-------------- getProduct -------------- **/
        case types.COMMON.GET_PRODUCT_INFO:
            return {
                ...state
            }

        case types.SUCCESS.COMMON.GET_PRODUCT_INFO: {
            const {data} = action
            return {
                list: {
                    ...state.list,
                    [data.id]: {...data, viewed: true}
                }
            }
        }
        case types.ERRORS.COMMON.GET_PRODUCT_INFO:
            return {
                ...state,
            }
        /** --------------- getProduct -------------- **/


        /** <-------------- updateProduct ----------- **/
        case types.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
            }

        case types.SUCCESS.COMMON.UPDATE_PRODUCT: {
            const productData = action.data
            const {id} = productData
            const newList = {
                ...state.list,
                [id]: {
                    ...state.list[id],
                    ...productData
                }
            }
            return {
                ...state,
                list: newList,
            }
        }
        case types.ERRORS.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
            }
        /** --------------- updateProduct ----------> **/


        /** --------------- cerateProduct ----------> **/
        case types.COMMON.CREATE_PRODUCT:
            return {
                ...state,
            }

        case types.SUCCESS.COMMON.CREATE_PRODUCT: {
            const newProduct = action.data
            const {id} = newProduct
            return {
                ...state,
                list: {
                    ...state.list,
                    [id]: {
                        ...newProduct,
                    }
                },
            }
        }

        case types.ERRORS.COMMON.CREATE_PRODUCT:
            return {
                ...state,
            }
        /** --------------- createProduct ----------> **/

        default:
            return state
    }
};

export default product;