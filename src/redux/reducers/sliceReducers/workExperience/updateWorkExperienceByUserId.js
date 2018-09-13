const base = (state, action) => {
  const {workExperienceId} = action.payload
  const prevWorkExperience = state.list[workExperienceId]
  return {
    ...state,
    list:{
      ...state.list,
      [workExperienceId]: {...prevWorkExperience, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {data, workExperienceId} = action.payload
  const prevWorkExperience = state.list[workExperienceId]
  return {
    ...state,
    list:{
      ...state.list,
      [workExperienceId]: {
        ...prevWorkExperience,
        ...data,
        isLoading: false,
        error: null
      }
    }
  }
}

const error = (state, action) => {
  const {message, workExperienceId} = action.payload
  const prevWorkExperience = state.list[workExperienceId]
  return {
    ...state,
    list:{
      ...state.list,
      [workExperienceId]: {...prevWorkExperience, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}