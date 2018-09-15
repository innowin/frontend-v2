const base = (state, action) => {
}

const success = (state, action) => {
  const {userId, data} = action.payload || {}
  const defaultObject2 = { content: [], isLoading: false, error: null }
  const previousWorkExperience = (state[userId] && state[userId].workExperiences) || defaultObject2

  return {
    ...state,
    [userId]: {
      ...state[userId],
      workExperiences: {
        ...previousWorkExperience,
        content: [...previousWorkExperience.content, data.id],
        isLoading: false,
        error: null
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