const base = (state, action) => {
}

const success = (state, action) => {
  const {data, identityId} = action.payload || {}
  const {client} = state
  const previousMembership = (client && client.memberships) || []

  const arrayOfMembershipId = []
  data.map(membership => {
    if (identityId === state.client.identity.id && (!previousMembership.includes(membership.id))) {
      return arrayOfMembershipId.push(membership.id)
    }
    return arrayOfMembershipId
  })
  return {
    ...state,
    client: {
      ...client,
      memberships: [...previousMembership, ...arrayOfMembershipId]
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