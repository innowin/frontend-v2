import initialState from '../initialState'
import types from '../../actions/types'
import slices from '../sliceReducers/file'
import appendListToStateList from "../sliceReducers/utilsSlices/appendListToStateList";


const file = (state = initialState.common.file, action) => {
  const {data} = action.payload || {}
  const list = state.list

  switch (action.type) {
    /** --------------------  get file --------------------- **/
    case types.SUCCESS.COMMON.FILE.GET_FILES:
      return appendListToStateList.success(state, action)

    case types.SUCCESS.COMMON.FILE.GET_FILE:
      return {
        ...state,
        list: {...list, [data.id]: data}
      }

    // case types.ERRORS.COMMON.FILE.GET_FILE:
    //     return {
    //         ...state, // is need for more data handling ?
    //     }

    /** ------------------ create file -------------------> **/
    case types.COMMON.FILE.CREATE_FILE:
      return state

    case types.SUCCESS.COMMON.FILE.CREATE_FILE:

      return {
        ...state,
        list: {...list, [data.id]: data}
      }

    case types.ERRORS.COMMON.FILE.CREATE_FILE:
      return {
        ...state,
        // middlewareFileData: {
        //     isCreated: false,
        //     isCreating: false,
        //     content: {} // should be more handled.
        // }
      }
    /** ----------------- delete file -----------------> **/
    case types.COMMON.FILE.DELETE_FILE:
      return slices.deleteFile.base(state, action)
    case types.SUCCESS.COMMON.FILE.DELETE_FILE:
      return slices.deleteFile.success(state, action)
    case types.ERRORS.COMMON.FILE.DELETE_FILE:
      return slices.deleteFile.error(state, action)

      /** ----------------- update file -----------------> **/
    case types.COMMON.FILE.UPDATE_FILE:
      return slices.updateFile.base(state, action)
    case types.SUCCESS.COMMON.FILE.UPDATE_FILE:
      return slices.updateFile.success(state, action)
    case types.ERRORS.COMMON.FILE.UPDATE_FILE:
      return slices.updateFile.error(state, action)

    /** ----------------- set data in file object -----------------> **/
    case types.ENTITY.SET_FILE:
      return slices.setFile(state, action)
    /** ----------------- set data in file object -----------------> **/
    case types.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID:
      return slices.getFileByRelatedParentId.base(state, action)
    case types.SUCCESS.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID:
      return slices.getFileByRelatedParentId.success(state, action)
    case types.ERRORS.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID:
      return slices.getFileByRelatedParentId.error(state, action)
    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.common.file
    default:
      return state
  }
}
export default file