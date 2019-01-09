import types from '../types'

export const getFile = (fileId) => ({
  type: types.COMMON.GET_FILE,
  payload: {
    fileId
  }
})

export const createFile = (data) => ({
  type: types.COMMON.CREATE_FILE,
  payload: {
      ...data
  }
})

export const updateFile = ({id, formData}) => ({
  type: types.COMMON.UPDATE_FILE,
  payload: { id, formData }
})

export const getFiles = (query) => ({
  type: types.COMMON.GET_FILES,
  payload: {query}
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