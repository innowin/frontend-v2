const base = (state, action) => {
}

const success = (state, action) => {
  const {data, membershipOwnerIdentity} = action.payload || {}
  const {client} = state
  const previousMembership = (client && client.membership) || []

  const arrayOfMembershipId = []
  data.map(membership => {
    if (membershipOwnerIdentity === state.client.identity.id && (!previousMembership.includes(membership.id))) {
      return arrayOfMembershipId.push(membership.id)
    }
    return arrayOfMembershipId
  })
  return {
    ...state,
    client: {
      ...client,
      membership: [...previousMembership, ...arrayOfMembershipId]
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