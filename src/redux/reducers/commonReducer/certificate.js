import initialState from '../initialState'
import types from '../../actions/types'
import appendListToStateList from "../sliceReducers/utilsSlices/appendListToStateList"
import pushAnObjToStateList from "../sliceReducers/utilsSlices/pushAnObjToStateList";

const certificate = (state = initialState.common.certificate, action) => {
  switch (action.type) {

      /** <--------------- getCertificates -------------- **/
    case types.SUCCESS.COMMON.GET_CERTIFICATES:
      return appendListToStateList.success(state, action)
      /** --------------- getCertificates --------------> **/

      /** <-------------- createCertificate ------------- **/
    case types.SUCCESS.COMMON.CREATE_OBJECT_CERTIFICATE:
      return pushAnObjToStateList.success(state, action)
      /** -------------- createCertificate -------------> **/

    case types.RESET:
      return initialState.common.certificate

    default:
      return state
  }
};

export default certificate;