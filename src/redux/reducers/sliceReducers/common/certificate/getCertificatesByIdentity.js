const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedCertificate = {}
  data.forEach(certificate => {
    const prevCertificate = state.list[certificate.id]
    indexedCertificate[certificate.id] = {...prevCertificate, ...certificate, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedCertificate,
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