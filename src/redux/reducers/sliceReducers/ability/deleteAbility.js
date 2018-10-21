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
  const {abilityId} = action.payload
  const {[`${abilityId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
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