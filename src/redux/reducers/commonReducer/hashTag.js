import initialState from '../initialState'
import types from '../../actions/types'

const hashTag = (state = initialState.common.hashTag, action) => {
    switch (action.type) {

        /** <------------------ get all hashTags ------------------ **/
        case types.COMMON.GET_HASH_TAGS:
            return {
                ...state,
                list: {
                    ...state.list,
                    isLoading: true,
                    isLoaded: false
                }
            }

        case types.SUCCESS.COMMON.GET_HASH_TAGS:
            return {
                ...state,
                list: {
                    content: action.data,
                    isLoaded: true,
                    isLoading: false
                }
            }

        case types.ERRORS.COMMON.GET_HASH_TAGS:
            return {
                ...state, // NOTE! : this need for more error handling.
            }
        /** ------------------ get all hashTags ------------------> **/

        default:
            return { ...state }
    }
}

export default hashTag