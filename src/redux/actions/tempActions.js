import types from "./types"

const removeFileFromTemp = (tempFileKeyName: number | string) => ({
  type: types.COMMON.FILE.REMOVE_FILE_FROM_TEMP_FILE,
  payload: {tempFileKeyName}
})

const setFileProgressTemp = ({fileId, progressDetail}) => ({
  type: types.COMMON.FILE.SET_FILE_PROGRESS_DETAIL,
  payload: {fileId, progressDetail}
})


const TempActions = {
  removeFileFromTemp,
  setFileProgressTemp,
}

export default TempActions