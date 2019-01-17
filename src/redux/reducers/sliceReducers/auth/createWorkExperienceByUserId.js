const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const client = {...state.client}
  const previousWorkExperiences = (client && client.workExperiences) || []

  return {
    ...state,
    client: {
      ...client,
      workExperiences: [...previousWorkExperiences, data.id]
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