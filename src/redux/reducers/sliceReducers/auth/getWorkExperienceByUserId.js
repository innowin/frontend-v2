const base = (state, action) => {
}

const success = (state, action) => {
  const {data, userId} = action.payload || {}
  const {client} = state
  const previousWorkExperience = (client && client.workExperiences) || []

  data.map(workExperience => {
    if (userId === state.client.user.id && (!previousWorkExperience.includes(workExperience.id))) {
      return previousWorkExperience.push(workExperience.id)
    }
    return previousWorkExperience
  })
  return {
    ...state,
    client: {
      ...client,
      // workExperiences: [...previousWorkExperience, ...arrayOfWorkExperienceId],
      workExperiences: previousWorkExperience,
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