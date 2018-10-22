const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedAbility = {}
  data.forEach(ability => {
    const prevAbility = state.list[ability.id]
    indexedAbility[ability.id] = {...prevAbility, ...ability, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedAbility,
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