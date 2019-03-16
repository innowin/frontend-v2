const base = (state, action) => {
}

const success = (state, action) => {
  const {certificateOwnerId, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [certificateOwnerId]: {
        ...state.list[certificateOwnerId],
        certificates: {
          ...previousCertificate,
          content: [...previousCertificate.content, data.id],
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