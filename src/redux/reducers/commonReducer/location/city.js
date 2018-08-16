import initialState from '../../initialState';
import types from '../../../actions/types';


const city = (state = initialState.common.location.city, action) => {
    switch (action.type) {

        /** <------------------- get cities ------------------ **/
        case types.COMMON.GET_CITIES:
            return {
                ...state,
                isLoaded: false,
                isLoading: true
            }

        case types.SUCCESS.COMMON.GET_CITIES:
            console.log('---------------------- > > > > get cities reducer. action is: ', action)
            return {
                content: action.data,
                isLoaded: true,
                isLoading: false
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

