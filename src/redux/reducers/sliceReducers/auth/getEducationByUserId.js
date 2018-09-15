const base = (state, action) => {
}

const success = (state, action) => {
  const {data, userId} = action.payload || {}
  const {client} = state
  const previousEducation = (client && client.educations) || []

  const arrayOfEducationId = []
  data.map(education => {
    if (userId === state.client.user.id && (!previousEducation.includes(education.id))) {
      return arrayOfEducationId.push(education.id)
    }
    return arrayOfEducationId
  })
  return {
    ...state,
    client: {
      ...client,
      educations: [...previousEducation, ...arrayOfEducationId]
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