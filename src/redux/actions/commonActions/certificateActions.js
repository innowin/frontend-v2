import types from '../types'

export const getCertificatesList = id => ({
    type: types.COMMON.GET_OBJECT_CERTIFICATES,
    id
})