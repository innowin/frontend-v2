const base = (state, action) => {
}

const success = (state, action) => {
  const {userId, educationId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousEducation = (state.list[userId] && state.list[userId].educations) || defaultObject2

  const newDeletedEducations = previousEducation.content.filter(id => id !== educationId);
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        educations: {
          ...previousEducation,
          content: [...newDeletedEducations],
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