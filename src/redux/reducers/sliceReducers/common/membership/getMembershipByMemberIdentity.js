const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedMembership = {}
  data.forEach(membership => {
    const prevPost = state.list[membership.id]
    indexedMembership[membership.id] = {...prevPost, ...membership, error: null, isLoading: false}
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