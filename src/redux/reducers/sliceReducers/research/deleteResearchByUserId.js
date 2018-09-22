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
  const {researchId} = action.payload
  const {[`${researchId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
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