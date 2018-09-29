const base = (state, action) => {
  const {userId} = action.payload || {}
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
          isLoading: true,
          error: null
        }
      }
    }
  }
}

const success = (state, action) => {
  const {userId, data} = action.payload || {}

  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousResearch = (state.list[userId] && state.list[userId].researches) || defaultObject2

  const arrayOfResearchId = data.map(research => research.id)
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        researches: {
          ...previousResearch,
          content: [...new Set([...previousResearch.content, ...arrayOfResearchId])],
          isLoading: false,
          error: null
        }
      }
    }
  }
}

const error = (state, action) => {
  const {userId, message} = action.payload || {}
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
          isLoading: false,
          error: message
        }
      }
    }
  }
}

export default {
  base,
  success,
  error,
}