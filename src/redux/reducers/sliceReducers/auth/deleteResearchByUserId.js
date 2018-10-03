const base = (state, action) => {
}

const success = (state, action) => {
  const {researchId} = action.payload || {}
  const {client} = state
  const previousResearchId = (client && client.researches) || []

  const newDeletedResearchId = previousResearchId.filter(id => id !== researchId);
  return {
    ...state,
    client: {
      ...client,
      researches: [...newDeletedResearchId]
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