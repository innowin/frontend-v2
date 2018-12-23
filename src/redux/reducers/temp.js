import initialState from './initialState'
import types from './../actions/types'


const temp = (state = initialState.temp, action) => {

  switch (action.type) {

    /** ----------------- set created file in  temporaryFile -----------------> **/
    case types.COMMON.SET_FILE_IDS_IN_TEMP_FILE:
      const file = state.file
      let lastKey = state.lastKey
      const {tempFileKeyName, fileId} = action.payload || {}
      if (Number.isInteger(tempFileKeyName)) {
        lastKey = [...lastKey, tempFileKeyName]
      }
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
        },
        lastKey
      }

    /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.temp
    default:
      return state
  }
}
export default temp