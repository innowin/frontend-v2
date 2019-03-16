const base = (state, action) => {
}

const success = (state, action) => {
  const {certificateOwnerId, certificateId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject2

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

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}