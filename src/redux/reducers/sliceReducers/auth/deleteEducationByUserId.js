const base = (state, action) => {
}

const success = (state, action) => {
  const {educationId} = action.payload || {}
  const client = {...state.client}
  const previousEducationId = (client && client.educations) || []

  const newDeletedEducationId = previousEducationId.filter(id => id !== educationId);
  return {
    ...state,
    client: {
      ...client,
      educations: [...newDeletedEducationId]
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