const base = (state, action) => {
}

const success = (state, action) => {
  const {certificateId} = action.payload || {}
  const {client} = state
  const previousCertificate = (client && client.certificates) || []

  const newDeletedCertificates = previousCertificate.filter(id => id !== certificateId);
  return {
    ...state,
    client: {
      ...client,
      certificates: [...newDeletedCertificates]
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