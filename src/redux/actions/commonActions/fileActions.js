import types from '../types'

export const getFile = (fileId) => ({
  type: types.COMMON.FILE.GET_FILE,
  payload: {
    fileId
  }
})

export const createFile = (data) => ({
  type: types.COMMON.FILE.CREATE_FILE,
  payload: {
      ...data
  }
})

export const updateFile = ({id, formData, fileParentType}) => ({
  type: types.COMMON.FILE.UPDATE_FILE,
  payload: { id, formData, fileParentType }
})

export const getFiles = (query) => ({
  type: types.COMMON.FILE.GET_FILES,
  payload: {query}
})

export const delMiddleWareFileData = () => ({ // this is not used yet, and may be remove.
  type: types.COMMON.FILE.DEL_MIDDLEWARE_FILE_DATA,
  payload: {}
})

export const getFileByFileRelatedParentId = ({fileRelatedParentId, fileParentType}) => ({
  type: types.COMMON.FILE.GET_FILE_BY_RELATED_PARENT_ID,
  payload: {
    fileRelatedParentId,
    fileParentType,
  }
})

const FileActions = {
  getFile,
  createFile,
  updateFile,
  delMiddleWareFileData,
  getFileByFileRelatedParentId,
}

export default FileActions