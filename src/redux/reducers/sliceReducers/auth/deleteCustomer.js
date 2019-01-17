const base = (state, action) => {
}

const success = (state, action) => {
  const {customerId} = action.payload || {}
  const client = {...state.client}
  const previousCustomerId = (client && client.customers) || []

  const newDeletedCustomerId = previousCustomerId.filter(id => id !== customerId);
  return {
    ...state,
    client: {
      ...client,
      customers: [...newDeletedCustomerId]
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