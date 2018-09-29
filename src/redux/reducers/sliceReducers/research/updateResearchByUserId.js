const base = (state, action) => {
  const {researchId} = action.payload
  const prevResearch = state.list[researchId]
  return {
    ...state,
    list:{
      ...state.list,
      [researchId]: {...prevResearch, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {data, researchId} = action.payload
  const prevResearch = state.list[researchId]
  return {
    ...state,
    list:{
      ...state.list,
      [researchId]: {
        ...prevResearch,
        ...data,
        isLoading: false,
        error: null
      }
    }
  }
}

const error = (state, action) => {
  const {message, researchId} = action.payload
  const prevResearch = state.list[researchId]
  return {
    ...state,
    list:{
      ...state.list,
      [researchId]: {...prevResearch, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}