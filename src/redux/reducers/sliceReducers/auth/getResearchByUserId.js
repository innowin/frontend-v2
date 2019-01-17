const base = (state, action) => {
}

const success = (state, action) => {
  const {data, userId} = action.payload || {}
  const client = {...state.client}
  const previousResearch = (client && client.researches) || []

  const arrayOfResearchId = []
  data.map(research => {
    if (userId === state.client.user.id && (!previousResearch.includes(research.id))) {
      return arrayOfResearchId.push(research.id)
    }
    return arrayOfResearchId
  })
  return {
    ...state,
    client: {
      ...client,
      // researches: [...previousResearch, ...arrayOfResearchId],
      researches: arrayOfResearchId,
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