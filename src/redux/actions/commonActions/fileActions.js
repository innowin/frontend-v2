import types from '../types'

export const getFile = (fileId) => ({
  type: types.COMMON.GET_FILE,
  payload: {
    fileId
  }
})

export const createFile = ({file_string, nextActionData, nextActionType, fileIdKey, toWhatLayer}) => ({
  type: types.COMMON.CREATE_FILE,
  payload: {file_string, nextActionData, nextActionType, fileIdKey, toWhatLayer}
})

export const updateFile = (payload) => ({
  type: types.COMMON.UPDATE_FILE,
  payload
})

export const delMiddleWareFileData = () => ({ // this is not used yet, and may be remove.
  type: types.COMMON.DEL_MIDDLEWARE_FILE_DATA,
  payload: {}
})

const FileActions = {
  getFile,
  createFile,
  updateFile,
  delMiddleWareFileData
}

export default FileActions