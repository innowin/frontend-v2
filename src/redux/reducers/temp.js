import initialState from './initialState'
import types from './../actions/types'


const temp = (state = initialState.temp, action) => {

  switch (action.type) {

    /** ----------------- set created file in  temporaryFile -----------------> **/
    case types.COMMON.SET_FILE_IDS_IN_TEMP_FILE:
      const file = state.file
      const {tempFileChildName, fileId} = action.payload || {}
      let data;
      let existFile = file[tempFileChildName]
      if (existFile) {
        if (!(Array.isArray(existFile))) {
          existFile = [file[tempFileChildName]]
        }
        data = [...existFile, fileId]
      } else {
        data = fileId
      }

      return {
        ...state,
        file: {
          ...file,
          [tempFileChildName]: data
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