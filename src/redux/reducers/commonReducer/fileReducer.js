import initialState from '../initialState'
import types from '../../actions/types'


const file = (state = initialState.file, action) => {
    switch (action.type) {
        /** ------------------ create file -------------------> **/
        case types.COMMON.CREATE_FILE:
            return {
                ...state,
                middlewareFileData: {
                    content: {},
                    isCreating: true,
                    isCreated: false
                }
            }

        case types.SUCCESS.COMMON.CREATE_FILE:
            return {
                ...state,
                middlewareFileData: {
                    content: action.data,
                    isCreated: true,
                    isCreating: false,
                }, // should be changed.
            }

        case types.ERRORS.COMMON.CREATE_FILE:
            return {
                ...state,
                middlewareFileData: {
                    isCreated: false,
                    isCreating: false,
                    content: {} // should be more handled.
                }
            }

        /** ----------------- delete middleware file data -----------------> **/

        case types.COMMON.DEL_MIDDLEWARE_FILE_DATA:
            console.log('hi from deleting middleware file data request.')
            return {
                ...state,
                middlewareFileData: {
                    isCreated: false,
                    isCreating: false,
                    content: {} // should be more handled.
                }
            }

        default:
            return { ...state }
    }
}
export default file