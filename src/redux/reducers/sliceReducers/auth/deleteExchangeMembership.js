const base = (state, action) => {
}

const success = (state, action) => {
  const {exchangeMembershipId} = action.payload || {}
  const {client} = state
  const previousMembership = (client && client.exchangeMemberships) || []

  const newDeletedMemberships = previousMembership.filter(id => id !== exchangeMembershipId);
  return {
    ...state,
    client: {
      ...client,
      exchangeMemberships: [...newDeletedMemberships]
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