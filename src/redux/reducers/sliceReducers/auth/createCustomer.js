const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload || {}
  const {client} = state
  const previousCustomers = (client && client.customers) || []

  return {
    ...state,
    client: {
      ...client,
      customers: [...previousCustomers, data.id]
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