const base = (state, action) => {
  const {organizationId} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousAbility = (state.list[organizationId] && state.list[organizationId].abilities) || defaultObject
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        abilities: {
          ...previousAbility,
          isLoading: true,
          error: null
        }
      }
    }
  }
}

const success = (state, action) => {
  const {organizationId, data} = action.payload || {}
  // const defaultObject = {content: [], isLoading: false, error: null}
  // const previousAbility = (state.list[organizationId] && state.list[organizationId].abilities) || defaultObject
  const arrayOfAbilityId = data.map(ability => ability.id)
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        abilities: {
          // content: [...new Set([...previousAbility.content, ...arrayOfAbilityId])],
          content: arrayOfAbilityId,
          isLoading: false,
          error: null
        }
      }
    }
  }
}

const error = (state, action) => {
  const {organizationId, message} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousAbility = (state.list[organizationId] && state.list[organizationId].abilities) || defaultObject
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        abilities: {
          ...previousAbility,
          isLoading: false,
          error: message
        }
      }
    }
  }
}

export default {
  base,
  success,
  error,
}