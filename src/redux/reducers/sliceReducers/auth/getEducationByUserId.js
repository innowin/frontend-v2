const base = (state, action) => {
}

const success = (state, action) => {
  const {data, userId} = action.payload || {}
  const {client} = state
  const previousEducation = (client && client.educations) || []

  data.map(education => {
    if (userId === state.client.user.id && (!previousEducation.includes(education.id))) {
      return previousEducation.push(education.id)
    }
    return previousEducation
  })
  return {
    ...state,
    client: {
      ...client,
      // educations: [...previousEducation, ...arrayOfEducationId],
      educations: previousEducation,
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