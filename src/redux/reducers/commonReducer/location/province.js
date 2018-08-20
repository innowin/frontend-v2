import initialState from '../../initialState';
import types from '../../../actions/types';


const province = (state = initialState.common.location.province, action) => {
    switch (action.type) {

        /** <------------------- get provinces ------------------ **/
        case types.COMMON.GET_PROVINCES:
            return {
                ...state,
                isLoaded: false,
                isLoading: true
            }

        case types.SUCCESS.COMMON.GET_PROVINCES:
            console.log('---- REDUCER---- >> province >> action is: ', action)
            return {
                content: action.data,
                isLoaded: true,
                isLoading: false
            }

        case types.ERRORS.COMMON.GET_PROVINCES:
            return {
                ...state // need for more error handling.
            }
        /** ------------------- get provinces ------------------> **/

        default:
            return { ...state }
    }
}

export default province

