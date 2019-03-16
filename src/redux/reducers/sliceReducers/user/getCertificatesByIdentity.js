const base = (state, action) => {
  const {certificateOwnerId} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject

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

const success = (state, action) => {
  const {certificateOwnerId, data} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject

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

const error = (state, action) => {
  const {certificateOwnerId, message} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCertificate = (state.list[certificateOwnerId] && state.list[certificateOwnerId].certificates) || defaultObject

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

export default {
  base,
  success,
  error,
}