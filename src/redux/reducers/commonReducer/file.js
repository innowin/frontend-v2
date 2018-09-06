import initialState from '../initialState'
import types from '../../actions/types'


const file = (state = initialState.common.file, action) => {
    const {data, fileId} = action.payload || {}
    const list = state.list

    switch (action.type) {
        /** --------------------  get file --------------------- **/
        // case types.COMMON.GET_FILE:
        //     return {
        //         ...state,
        //         list: {...list, [fileId]: data}
        //     }

        case types.SUCCESS.COMMON.GET_FILE:
            return {
                ...state,
                list: {...list, [data.id]: data}
            }

        // case types.ERRORS.COMMON.GET_FILE:
        //     return {
        //         ...state, // is need for more data handling ?
        //     }

        /** ------------------ create file -------------------> **/
        case types.COMMON.CREATE_FILE:
            return {
                ...state,
            }

        case types.SUCCESS.COMMON.CREATE_FILE:

            return {
                ...state,
                list: {...list, [data.id]: data}
            }

        // case types.ERRORS.COMMON.CREATE_FILE:
        //     return {
        //         ...state,
        //         middlewareFileData: {
        //             isCreated: false,
        //             isCreating: false,
        //             content: {} // should be more handled.
        //         }
        //     }

        /** ----------------- delete middleware file data -----------------> **/

        case types.RESET:
            return initialState.common.file
        default:
            return state
    }
}
export default file