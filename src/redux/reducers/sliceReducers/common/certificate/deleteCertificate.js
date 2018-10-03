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
  const {certificateId} = action.payload
  const {[`${certificateId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
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