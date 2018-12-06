const base = (state, action) => {
}

const success = (state, action) => {
  const {data, organizationId} = action.payload || {}
  const {client} = state
  const previousAbility = (client && client.abilities) || []

  const arrayOfAbilityId = []
  data.map(ability => {
    if (state.client.organization && organizationId === state.client.organization.id && (!previousAbility.includes(ability.id))) {
      return arrayOfAbilityId.push(ability.id)
    }
    return arrayOfAbilityId
  })
  return {
    ...state,
    client: {
      ...client,
      // abilities: [...previousAbility, ...arrayOfAbilityId]
      abilities: arrayOfAbilityId,
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