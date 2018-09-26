import types from '../types'

export const getCertificatesList = id => ({
  type: types.COMMON.CERTIFICATE.GET_CERTIFICATES,
  payload: {id}
})

export const createCertificate = formData => ({
  type: types.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE,
  payload: {formData}
})

export const resetCreatingObjCertStatus = () => ({
  type: types.COMMON.CERTIFICATE.RESET_CREATE_CERTIFICATE_STATUS,
  payload: {}
})

export const getCertificatesByIdentity = ({identityId, certificateOwnerId, certificateOwnerType}) => ({
  type: types.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY,
  payload: {identityId, certificateOwnerId, certificateOwnerType}
})

export const updateCertificate = ({formValues, certificateId}) => ({
  type: types.COMMON.CERTIFICATE.UPDATE_CERTIFICATE,
  payload: {formValues, certificateId}
})

export const deleteCertificate = ({certificateId, certificateOwnerId, certificateOwnerType, certificateParentId, certificateParentType}) => ({
  type: types.COMMON.CERTIFICATE.DELETE_CERTIFICATE,
  payload: {certificateId, certificateOwnerId, certificateOwnerType, certificateParentId, certificateParentType}
})

const CertificateActions = {
  getCertificatesByIdentity,
  updateCertificate,
  deleteCertificate

}

export default CertificateActions