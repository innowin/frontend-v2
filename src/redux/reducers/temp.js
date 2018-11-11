import initialState from './initialState'
import types from './../actions/types'


const temp = (state = initialState.temp, action) => {

  switch (action.type) {

    /** ----------------- set created file in  temporaryFile -----------------> **/
    case types.COMMON.SET_FILE_IDS_IN_TEMP_FILE:
      const file = state.file
      const {tempFileChildName, fileId} = action.payload || {}
      const restArray = file[tempFileChildName] || []
      return {
        ...state,
        file: {
          ...file,
          [tempFileChildName]:[...restArray, fileId]
        }
      }

    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.temp
    default:
      return state
  }
}
export default temp