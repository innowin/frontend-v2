import types from '../types'

export const getCertificatesList = id => ({
  type: types.COMMON.CERTIFICATE.GET_CERTIFICATES,
  payload: {id}
})

export const createCertificate = ({formValues, certificateOwnerId}) => ({
  type: types.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE,
  payload: {formValues, certificateOwnerId}
})

export const resetCreatingObjCertStatus = () => ({
  type: types.COMMON.CERTIFICATE.RESET_CREATE_CERTIFICATE_STATUS,
  payload: {}
})

export const getCertificatesByIdentity = ({identityId, certificateOwnerId}) => ({
  type: types.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY,
  payload: {identityId, certificateOwnerId}
})

export const updateCertificate = ({formValues, certificateId}) => ({
  type: types.COMMON.CERTIFICATE.UPDATE_CERTIFICATE,
  payload: {formValues, certificateId}
})

export const deleteCertificate = ({certificateId, certificateOwnerId, certificateParentId, certificateParentType}) => ({
  type: types.COMMON.CERTIFICATE.DELETE_CERTIFICATE,
  payload: {certificateId, certificateOwnerId, certificateParentId, certificateParentType}
})

const CertificateActions = {
  getCertificatesByIdentity,
  updateCertificate,
  deleteCertificate,
  createCertificate
}

export default CertificateActions