import types from '../types'

export const getCertificatesList = id => ({
    type: types.COMMON.GET_OBJECT_CERTIFICATES,
    payload: {id}
})

export const createCertificate = formData => ({
    type: types.COMMON.CREATE_OBJECT_CERTIFICATE,
    payload: {formData}
})

export const resetCreatingObjCertStatus = () => ({
    type: types.COMMON.RESET_CREATE_CERTIFICATE_STATUS,
    payload: {}
})