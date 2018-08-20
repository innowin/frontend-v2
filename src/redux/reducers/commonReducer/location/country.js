import initialState from '../../initialState';
import types from '../../../actions/types';


const country = (state = initialState.common.location.country, action) => {
    switch (action.type) {

        /** <------------------- get countries ------------------ **/
        case types.COMMON.GET_COUNTRIES:
            return {
                ...state,
                isLoaded: false,
                isLoading: true
            }

        case types.SUCCESS.COMMON.GET_COUNTRIES:
            console.log('---------------------- > > > > get countries reducer. action is: ', action)
            return {
                content: action.data,
                isLoaded: true,
                isLoading: false
            }

        case types.ERRORS.COMMON.GET_COUNTRIES:
            return {
                ...state // need for more error handling.
            }
        /** ------------------- get countries ------------------> **/

        default:
            return { ...state }
    }
}

export default country

