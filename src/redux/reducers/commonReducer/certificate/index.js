import initialState from '../../initialState'
import types from '../../../actions/types'


const certificate = (state = initialState.common.certificate, action) => {
    switch (action.type) {
        /** <--------------- getCertificates -------------- **/
        case types.COMMON.GET_CERTIFICATES:
            return {
                ...state,
            }

        case types.SUCCESS.COMMON.GET_CERTIFICATES:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.data
                }
            }

        case types.ERRORS.COMMON.GET_CERTIFICATES:
            return {
                ...state,
            }
        /** --------------- getCertificates --------------> **/


        /** <-------------- createCertificate ------------- **/
        case types.COMMON.CREATE_OBJECT_CERTIFICATE:
            return {
                ...state,
            }

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
        case types.ERRORS.COMMON.CREATE_OBJECT_CERTIFICATE:
            return {
                ...state,
            }
        /** -------------- createCertificate -------------> **/

        default:
            return state
    }
};

export default certificate;