const base = (state, action) => {
}

const success = (state, action) => {
  const {abilityId} = action.payload || {}
  const {client} = state
  const previousAbilityId = (client && client.abilities) || []

  const newDeletedAbilityId = previousAbilityId.filter(id => id !== abilityId);
  return {
    ...state,
    client: {
      ...client,
      abilities: [...newDeletedAbilityId]
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