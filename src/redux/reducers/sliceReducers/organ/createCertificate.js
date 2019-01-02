import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {certificateOwnerId, certificateOwnerType, data} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject
  if (certificateOwnerType === constants.USER_TYPES.ORG) {
    return {
      ...state,
      list: {
        ...state.list,
        [certificateOwnerId]: {
          ...state.list[certificateOwnerId],
          certificates: {
            content: [...previousCertificate.content, data.id],
            isLoading: false,
            error: null
          }
        }
      }
    }
  }
  else {
    return state
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}