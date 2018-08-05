import initialState from '../initialState'
import types from '../../actions/types'


const file = (state = initialState.file, action) => {
    switch (action.type) {
        case types.COMMON.CREATE_FILE:
            return {
                ...state,
                newOrUpdatingFile: {
                    content: {},
                    isCreating: true,
                    isCreated: false
                }
            }

        case types.SUCCESS.COMMON.CREATE_FILE:
            return {
                ...state,
                newOrUpdatingFile: {
                    content: action.data,
                    isCreated: true,
                    isCreating: false,
                }, // should be changed.
            }

        case types.ERRORS.COMMON.CREATE_FILE:
            return {
                ...state,
                isCreated: false,
                isCreating: false,
                content: {} // should be more handled.
            }

        default:
            return { ...state }
    }
}
export default file