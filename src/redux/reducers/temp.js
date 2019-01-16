import initialState from './initialState'
import types from './../actions/types'


const temp = (state = initialState.temp, action) => {
  const file = state.file
  const {tempFileKeyName, fileId} = action.payload || {}

  switch (action.type) {

    /** ----------------- set created file in  temporaryFile -----------------> **/
    case types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE:
      let data;
      let existFile = file[tempFileKeyName]
      if (existFile) {
        if (!(Array.isArray(existFile))) {
          existFile = [file[tempFileKeyName]]
        }
        data = [...existFile, fileId]
      } else {
        data = fileId
      }

      return {
        ...state,
        file: {
          ...file,
          [tempFileKeyName]: data
        }
      }

    /** -----------------   remove file from  temporaryFile -----------------> **/
    case types.COMMON.FILE.REMOVE_FILE_FROM_TEMP_FILE:
      const {[`${tempFileKeyName}`]: deleted, ...rest} = file
      return {
        ...state,
        file: {...rest}
      }

    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.temp
    default:
      return state
  }
}
export default temp