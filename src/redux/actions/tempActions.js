// @flow
import types from "./types"

const removeFileFromTemp = (tempFileKeyName: number | string) => ({
  type: types.COMMON.FILE.REMOVE_FILE_FROM_TEMP_FILE,
  payload: {tempFileKeyName}
})



const TempActions = {
  removeFileFromTemp
}

export default TempActions