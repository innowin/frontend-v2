import initialState from '../../initialState';
import types from '../../../actions/types';


const productPicture = (state=initialState.common.product.productPicture, action) => {
    const {data} = action
    const {list} = state
    switch (action.case) {
        /** <----------------- createProductPicture -------------------**/
        case types.COMMON.CREATE_PRODUCT_PICTURE:
            return {
                ...state
            }

        case types.SUCCESS.COMMON.CREATE_PRODUCT_PICTURE:
            return {
                ...state,
                list: {
                    ...list,
                    [data.id]: data
                }
            }

        case types.ERRORS.COMMON.CREATE_PRODUCT_PICTURE:
            return {
                ...state
            }
        /** ----------------- createProductPicture ------------------>**/

        default:
            return {
                ...state
            }
    }
}

export default productPicture