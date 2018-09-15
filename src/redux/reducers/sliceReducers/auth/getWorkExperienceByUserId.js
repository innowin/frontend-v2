const base = (state, action) => {
}

const success = (state, action) => {
  const {data, userId} = action.payload || {}
  const {client} = state
  const previousWorkExperience = (client && client.workExperiences) || []

  const arrayOfWorkExperienceId = []
  data.map(workExperience => {
    if (userId === state.client.user.id && (!previousWorkExperience.includes(workExperience.id))) {
      return arrayOfWorkExperienceId.push(workExperience.id)
    }
    return arrayOfWorkExperienceId
  })
  return {
    ...state,
    client: {
      ...client,
      workExperiences: [...previousWorkExperience, ...arrayOfWorkExperienceId]
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