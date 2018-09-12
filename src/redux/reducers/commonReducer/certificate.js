import initialState from '../initialState'
import types from '../../actions/types/index'

const certificate = (state = initialState.common.certificate, action) => {
    switch (action.type) {
        /** <--------------- getCertificates -------------- **/
        case types.SUCCESS.COMMON.GET_CERTIFICATES:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.data
                }
            }
        /** --------------- getCertificates --------------> **/


        /** <-------------- createCertificate ------------- **/
        case types.SUCCESS.COMMON.CREATE_OBJECT_CERTIFICATE: {
            const newCert = action.data
            return {
                ...state,
                list: {
                    ...state.list,
                    [newCert.id]: newCert
                }
            }
        }
        /** -------------- createCertificate -------------> **/
        case types.RESET:
            return initialState.common.certificate
        default:
            return state
    }
};

export default certificate;