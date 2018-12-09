const base = (state, action) => {
}

const success = (state, action) => {
  const {data, identityId} = action.payload || {}
  const {client} = state
  const previousCertificate = (client && client.certificates) || []

  const arrayOfCertificateId = []
  data.map(certificate => {
    if (identityId === state.client.identity.id && (!previousCertificate.includes(certificate.id))) {
      return arrayOfCertificateId.push(certificate.id)
    }
    return arrayOfCertificateId
  })
  return {
    ...state,
    client: {
      ...client,
      // certificates: [...previousCertificate, ...arrayOfCertificateId],
      certificates: arrayOfCertificateId,
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