import initialState from '../initialState'
import types from '../../actions/types'
import appendListToStateList from "../sliceReducers/utilsSlices/appendListToStateList"
import pushAnObjToStateList from "../sliceReducers/utilsSlices/pushAnObjToStateList";

import slices from '../sliceReducers/common/certificate'

const certificate = (state = initialState.common.certificate, action) => {
  switch (action.type) {

      /** <--------------- getCertificates -------------- **/
    case types.SUCCESS.COMMON.CERTIFICATE.GET_CERTIFICATES:
      return appendListToStateList.success(state, action)
      /** --------------- getCertificates --------------> **/

      /** <-------------- createCertificate ------------- **/
    case types.SUCCESS.COMMON.CERTIFICATE.CREATE_OBJECT_CERTIFICATE:
      // return pushAnObjToStateList.success(state, action)
      return slices.createCertificate.success(state, action)
      /** -------------- createCertificate -------------> **/

    /** -------------- get Certificate -------------> **/
    case types.SUCCESS.COMMON.CERTIFICATE.GET_CERTIFICATES_BY_IDENTITY:
      return slices.getCertificatesByIdentity.success(state, action)
    /** -------------------------- update Certificate -------------------------> **/
    case types.COMMON.CERTIFICATE.UPDATE_CERTIFICATE:
      return slices.updateCertificate.base(state, action)
    case types.SUCCESS.COMMON.CERTIFICATE.UPDATE_CERTIFICATE:
      return slices.updateCertificate.success(state, action)
    case types.ERRORS.COMMON.CERTIFICATE.UPDATE_CERTIFICATE:
      return slices.updateCertificate.error(state, action)
    /** -------------------------- delete Certificate -------------------------> **/
    case types.COMMON.CERTIFICATE.DELETE_CERTIFICATE:
      return slices.deleteCertificate.base(state, action)
    case types.SUCCESS.COMMON.CERTIFICATE.DELETE_CERTIFICATE:
      return slices.deleteCertificate.success(state, action)
    case types.ERRORS.COMMON.CERTIFICATE.DELETE_CERTIFICATE:
      return slices.deleteCertificate.error(state, action)
    /** -------------- reset -------------> **/
    case types.RESET:
      return initialState.common.certificate
    default:
      return state
  }
};

export default certificate;