const base = (state, action) => {
  const {abilityId} = action.payload
  const prevAbility = state.list[abilityId]
  return {
    ...state,
    list:{
      ...state.list,
      [abilityId]: {...prevAbility, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {data, abilityId} = action.payload
  const prevAbility = state.list[abilityId]
  return {
    ...state,
    list:{
      ...state.list,
      [abilityId]: {
        ...prevAbility,
        ...data,
        isLoading: false,
        error: null
      }
    }
  }
}

const error = (state, action) => {
  const {message, abilityId} = action.payload
  const prevAbility = state.list[abilityId]
  return {
    ...state,
    list:{
      ...state.list,
      [abilityId]: {...prevAbility, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}