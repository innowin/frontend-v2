const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const client = {...state.client}
  const previousResearches = (client && client.researches) || []

  return {
    ...state,
    client: {
      ...client,
      researches: [...previousResearches, data.id]
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