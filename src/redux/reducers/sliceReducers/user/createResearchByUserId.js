const base = (state, action) => {
}

const success = (state, action) => {
  const {userId, data} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousResearch = (state.list[userId] && state.list[userId].researches) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        researches: {
          ...previousResearch,
          content: [...previousResearch.content, data.id],
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