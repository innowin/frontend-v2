const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedMembership = {}
  data.forEach(exchangeMembership => {
    const prevMembership = state.list[exchangeMembership.id]
    indexedMembership[exchangeMembership.id] = {...prevMembership, ...exchangeMembership, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedMembership,
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