import constants from "../../../../consts/constants";

const base = (state, action) => {
}

const success = (state, action) => {
  const {certificateOwnerId, certificateOwnerType, certificateId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject2

  if (certificateOwnerType === constants.USER_TYPES.PERSON) {
    const newDeletedCertificates = previousCertificate.content.filter(id => id !== certificateId);
    return {
      ...state,
      list: {
        ...state.list,
        [certificateOwnerId]: {
          ...state.list[certificateOwnerId],
          certificates: {
            ...previousCertificate,
            content: [...newDeletedCertificates],
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