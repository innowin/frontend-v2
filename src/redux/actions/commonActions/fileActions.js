import types from '../types'


export const createFile = (formData) => ({
    type: types.COMMON.CREATE_FILE,
    formData
})