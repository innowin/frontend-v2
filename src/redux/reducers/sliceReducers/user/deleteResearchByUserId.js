const base = (state, action) => {
}

const success = (state, action) => {
  const {userId, researchId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousResearch = (state.list[userId] && state.list[userId].researches) || defaultObject2

  const newDeletedResearches = previousResearch.content.filter(id => id !== researchId);
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        researches: {
          ...previousResearch,
          content: [...newDeletedResearches],
          isLoading: false,
          error: null
        }
      }
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