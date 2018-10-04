import constants from "src/consts/constants"

const base = (state, action) => {
}

const success = (state, action) => {
  const {certificateOwnerId, certificateOwnerType, certificateId} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject
  if (certificateOwnerType === constants.USER_TYPES.ORG) {
    const newDeletedCertificates = previousCertificate.content.filter(id => id !== certificateId)
    console.log("certificateOwnerType in succss delete:", certificateOwnerId, newDeletedCertificates)
    return {
      ...state,
      list: {
        ...state.list,
        [certificateOwnerId]: {
          ...state.list[certificateOwnerId],
          certificates: {
            content: newDeletedCertificates,
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