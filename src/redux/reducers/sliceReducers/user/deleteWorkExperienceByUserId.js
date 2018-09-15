const base = (state, action) => {
}

const success = (state, action) => {
  const {userId, workExperienceId} = action.payload || {}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const previousWorkExperience = (state.list[userId] && state.list[userId].workExperiences) || defaultObject2

  const newDeletedWorkExperiences = previousWorkExperience.content.filter(id => id !== workExperienceId);
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        workExperiences: {
          ...previousWorkExperience,
          content: [...newDeletedWorkExperiences],
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