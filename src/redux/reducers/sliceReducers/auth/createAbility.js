const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const {client} = state
  const previousAbilities = (client && client.abilities) || []

  return {
    ...state,
    client: {
      ...client,
      abilities: [...previousAbilities, data.id]
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