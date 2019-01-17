const base = (state, action) => {
}

const success = (state, action) => {
  const {workExperienceId} = action.payload || {}
  const client = {...state.client}
  const previousWorkExperienceId = (client && client.workExperiences) || []

  const newDeletedWorkExperienceId = previousWorkExperienceId.filter(id => id !== workExperienceId);
  return {
    ...state,
    client: {
      ...client,
      workExperiences: [...newDeletedWorkExperienceId]
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