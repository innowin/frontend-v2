const base = (state, action) => {
  const {userId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousEducation = (state.list[userId] && state.list[userId].educations) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        educations: {
          ...previousEducation,
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
  const previousEducation = (state.list[userId] && state.list[userId].educations) || defaultObject2

  const arrayOfEducationId = data.map(education => education.id)
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        educations: {
          ...previousEducation,
          // content: [...new Set([...previousEducation.content, ...arrayOfEducationId])],
          content: arrayOfEducationId,
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
  const previousEducation = (state.list[userId] && state.list[userId].educations) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        educations: {
          ...previousEducation,
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