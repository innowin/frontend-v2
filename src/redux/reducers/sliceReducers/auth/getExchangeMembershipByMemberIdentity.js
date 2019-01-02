const base = (state, action) => {
}

const success = (state, action) => {
  const {data, identityId} = action.payload || {}
  const {client} = state
  // const previousMembership = (client && client.exchangeMemberships) || []

  const arrayOfMembershipId = []
  data.map(exchangeMembership => {
    if (identityId === state.client.identity.content) { //&& (!previousMembership.includes(exchangeMembership.id))) {
      return arrayOfMembershipId.push(exchangeMembership.id)
    }
    return arrayOfMembershipId
  })

  return {
    ...state,
    client: {
      ...client,
      // exchangeMemberships: [...previousMembership, ...arrayOfMembershipId],
      exchangeMemberships: arrayOfMembershipId,
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