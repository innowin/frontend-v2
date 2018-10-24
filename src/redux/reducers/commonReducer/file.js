import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/file'
import appendListToStateList from "../sliceReducers/utilsSlices/appendListToStateList";


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
    case types.SUCCESS.COMMON.GET_FILES:
      return appendListToStateList.success(state, action)
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
        temporaryFile: {
          content: null,
          isLoading: true,
          error: null
        }
      }

    case types.SUCCESS.COMMON.CREATE_FILE:

      return {
        ...state,
        list: {...list, [data.id]: data}
      }

    case types.ERRORS.COMMON.CREATE_FILE:
      return {
        ...state,
        // middlewareFileData: {
        //     isCreated: false,
        //     isCreating: false,
        //     content: {} // should be more handled.
        // TODO : handle error in create file and in temporaryFile
        // }
        temporaryFile: {
          content: null,
          isLoading: false,
          error: null
        }
      }

    /** ----------------- set created file in  temporaryFile -----------------> **/
    case types.COMMON.SET_CREATED_FILE_IN_TEMPORARY_FILE:
      return {
        ...state,
        temporaryFile: {
          content: data,
          isLoading: false,
          error: null
        }
      }
    case types.COMMON.RESET_TEMPORARY_FILE:
      return {
        ...state,
        temporaryFile: {
          content: null,
          isLoading: false,
          error: null
        }
      }


    /** ----------------- set data in file object -----------------> **/
    case types.ENTITY.SET_FILE:
      return slices.setFile(state, action)
    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.common.file
    default:
      return state
  }
}
export default file