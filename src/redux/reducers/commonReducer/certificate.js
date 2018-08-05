import initialState from '../initialState';
import types from '../../actions/types';

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

        default:
            return state
    }
};

export default certificate;