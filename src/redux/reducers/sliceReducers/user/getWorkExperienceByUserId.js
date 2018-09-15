const base = (state, action) => {
  const {userId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousWorkExperience = (state.list[userId] && state.list[userId].workExperiences) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        workExperiences: {
          ...previousWorkExperience,
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
  const previousWorkExperience = (state.list[userId] && state.list[userId].workExperiences) || defaultObject2

  const arrayOfWorkExperienceId = data.map(post => post.id)
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        workExperiences: {
          ...previousWorkExperience,
          content: [...new Set([...previousWorkExperience.content, ...arrayOfWorkExperienceId])],
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
  const previousWorkExperience = (state.list[userId] && state.list[userId].workExperiences) || defaultObject2

  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        workExperiences: {
          ...previousWorkExperience,
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