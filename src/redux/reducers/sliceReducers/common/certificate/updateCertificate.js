const base = (state, action) => {
  const {certificateId} = action.payload
  const prevCertificate = state.list[certificateId]
  return {
    ...state,
    list:{
      ...state.list,
      [certificateId]: {...prevCertificate, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {data, certificateId} = action.payload
  const prevCertificate = state.list[certificateId]
  return {
    ...state,
    list:{
      ...state.list,
      [certificateId]: {
        ...prevCertificate,
        ...data,
        isLoading: false,
        error: null
      }
    }
  }
}

const error = (state, action) => {
  const {message, certificateId} = action.payload
  const prevCertificate = state.list[certificateId]
  return {
    ...state,
    list:{
      ...state.list,
      [certificateId]: {...prevCertificate, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}