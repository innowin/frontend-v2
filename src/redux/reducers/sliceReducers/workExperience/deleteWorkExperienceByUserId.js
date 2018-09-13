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
  const {workExperienceId} = action.payload
  const {[`${workExperienceId}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
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