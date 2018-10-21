const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, abilityId} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousAbility = (state.list[organizationId] && state.list[organizationId].abilities) || defaultObject
  const newDeletedAbilities = previousAbility.content.filter(id => id !== abilityId)
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        abilities: {
          content: newDeletedAbilities,
          isLoading: false,
          error: null
        }
      }
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