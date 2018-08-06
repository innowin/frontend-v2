import initialState from '../initialState'
import types from '../../actions/types'
import status from '../statusChoices'


const certificate = (state = initialState.common.certificate, action) => {
    switch (action.type) {
        /** -------------------------- get categories -------------------------> **/
        case types.COMMON.GET_OBJECT_CERTIFICATES:
            return {
                ...state,
                objectCertificates: {
                    ...state.objectCertificates,
                    isLoading: true,
                    isLoaded: false
                }
            }

        case types.SUCCESS.COMMON.GET_OBJECT_CERTIFICATES:
            return {
                ...state,
                objectCertificates: {
                    content: action.data,
                    isLoading: false,
                    isLoaded: true
                }
            }

        case types.ERRORS.COMMON.GET_OBJECT_CERTIFICATES:
            return {
                ...state,
                objectCertificates: {
                    content: {},
                    isLoading: false,
                    isLoaded: true
                }
            }

        /** ---------------------- create object certificate ----------------------> **/
        case types.COMMON.CREATE_OBJECT_CERTIFICATE:
            return {
                ...state,
                objectCertificates: {
                    ...state.objectCertificates,
                    isLoaded: false,
                    isLoading: true
                }
            }

        case types.SUCCESS.COMMON.CREATE_OBJECT_CERTIFICATE: {
            const {id, data} = action
            console.log('hi from create object certificate reducer. the guy data is: ', {...state.objectCertificates.content, [id]: data})
            return {
                ...state,
                objectCertificates: {
                    content: {...state.objectCertificates.content, [id]: data},
                    isLoading: false,
                    isLoaded: true,
                },
                creatingObjCertStatus: status.SUCCEED
            }
        }

        case types.ERRORS.COMMON.CREATE_OBJECT_CERTIFICATE:
            return {
                ...state,
                objectCertificates: { // need for more handling !
                    ...state.objectCertificates,
                    isLoading: false,
                    isLoaded: true,
                }
            }

        /** ----------------- Reset Creating Object Cert Status ------------------> **/
        case types.COMMON.RESET_CREATE_CERTIFICATE_STATUS:
            return {
                ...state,
                creatingObjCertStatus: status.NEUTRAL
            }

        default:
            return state
    }
};

export default certificate;