import initialState from '../../initialState';
import types from '../../../actions/types';


const city = (state = initialState.common.location.city, action) => {
    switch (action.type) {

        /** <------------------- get cities ------------------ **/
        case types.COMMON.GET_CITIES:
            return {
                ...state,
            }

        case types.SUCCESS.COMMON.GET_CITIES:
            return {
                list: action.data,
            }

        case types.ERRORS.COMMON.GET_CITIES:
            return {
                ...state // need for more error handling.
            }
        /** ------------------- get cities ------------------> **/

        default:
            return { ...state }
    }
}

export default city

