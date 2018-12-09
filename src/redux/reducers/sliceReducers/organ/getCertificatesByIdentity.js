import constants from "src/consts/constants"

const base = (state, action) => {
  const {certificateOwnerId, certificateOwnerType} = action.payload || {}
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
            ...previousCertificate,
            isLoading: true,
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

const success = (state, action) => {
  const {certificateOwnerId, certificateOwnerType, data} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject
  if (certificateOwnerType === constants.USER_TYPES.ORG) {
    const arrayOfCertificateId = data.map(certificate => certificate.id)
    return {
      ...state,
      list: {
        ...state.list,
        [certificateOwnerId]: {
          ...state.list[certificateOwnerId],
          certificates: {
            ...previousCertificate,
            // content: [...new Set([...previousCertificate.content, ...arrayOfCertificateId])],
            content: arrayOfCertificateId,
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
  const {certificateOwnerId, certificateOwnerType, message} = action.payload || {}
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
            ...previousCertificate,
            isLoading: false,
            error: message
          }
        }
      }
    }
  }
  else {
    return state
  }
}

export default {
  base,
  success,
  error,
}