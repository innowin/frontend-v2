const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousAbility = (state.list[organizationId] && state.list[organizationId].abilities) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        abilities: {
          ...previousAbility,
          content: [...previousAbility.content, data.id],
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