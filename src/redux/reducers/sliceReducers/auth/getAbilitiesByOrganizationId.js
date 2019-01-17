const base = (state, action) => {
}

const success = (state, action) => {
  const {data, organizationId} = action.payload || {}
  const client = {...state.client}
  const previousAbility = (client && client.abilities) || []

  data.map(ability => {
    if (state.client.organization && organizationId === state.client.organization.id && (!previousAbility.includes(ability.id))) {
      return previousAbility.push(ability.id)
    }
    return previousAbility
  })
  return {
    ...state,
    client: {
      ...client,
      // abilities: [...previousAbility, ...arrayOfAbilityId]
      abilities: previousAbility,
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