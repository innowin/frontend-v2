import types from '../types'


export const createFile = (formData) => ({
    type: types.COMMON.CREATE_FILE,
    payload: {
        formData
    }
})

export const delMiddleWareFileData = () => ({
    type: types.COMMON.DEL_MIDDLEWARE_FILE_DATA,
    payload: {}
})