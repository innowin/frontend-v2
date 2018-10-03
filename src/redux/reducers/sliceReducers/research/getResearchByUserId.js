const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedResearch = {}
  data.forEach(research => {
    const prevResearch = state.list[research.id]
    indexedResearch[research.id] = {...prevResearch, ...research, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedResearch,
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