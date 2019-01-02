const base = (state, action) => {
}

const success = (state, action) => {
  const {data, identityId} = action.payload || {}
  const {client} = state
  const previousCertificate = (client && client.certificates) || []

  data.map(certificate => {
    if (identityId === state.client.identity.id && (!previousCertificate.includes(certificate.id))) {
      return previousCertificate.push(certificate.id)
    }
    return previousCertificate
  })
  return {
    ...state,
    client: {
      ...client,
      // certificates: [...previousCertificate, ...arrayOfCertificateId],
      certificates: previousCertificate,
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