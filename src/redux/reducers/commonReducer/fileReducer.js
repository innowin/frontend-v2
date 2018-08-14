import initialState from '../initialState'
import types from '../../actions/types'


const file = (state = initialState.common.file, action) => {
  const {fileId, data, message} = action.payload || {}
  const files = state.files
  const previousFile = files[fileId] || {
    content: {},
    isLoading: false,
    error: {
      message: null
    }
  }
  switch (action.type) {
    /** --------------------  get file --------------------- **/
    case types.COMMON.GET_FILE:
      return {
        ...state,
        files: {
          ...files,
          [fileId]: {
            ...previousFile,
            isLoading: true
          }
        }
      }

    case types.SUCCESS.COMMON.GET_FILE:
      return {
        ...state,
        files: {
          ...files,
          [fileId]: {
            ...previousFile,
            isLoading: false,
            content: {...data}
          }
        }
      }

    case types.ERRORS.COMMON.GET_FILE:
      return {
        ...state,
        files: {
          ...files,
          [fileId]: {
            ...previousFile,
            isLoading: false,
            error: {
              message
            }
          }
        }
      }
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
      return {
        ...state,
        middlewareFileData: {
          isCreated: false,
          isCreating: false,
          content: {} // should be more handled.
        }
      }

    case types.RESET:
      return initialState.common.file
    default:
      return {...state}
  }
}
export default file