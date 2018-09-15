const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const {client} = state
  const previousEducations = (client && client.educations) || []

  return {
    ...state,
    client: {
      ...client,
      educations: [...previousEducations, data.id]
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