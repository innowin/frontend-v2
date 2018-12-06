const base = (state, action) => {
}

const success = (state, action) => {
  const {data, organizationId} = action.payload || {}
  const {client} = state
  const previousCustomer = (client && client.customers) || []

  const arrayOfCustomerId = []
  data.map(customer => {
    if (organizationId === state.client.organization.id && (!previousCustomer.includes(customer.id))) {
      return arrayOfCustomerId.push(customer.id)
    }
    return arrayOfCustomerId
  })
  return {
    ...state,
    client: {
      ...client,
      // customers: [...previousCustomer, ...arrayOfCustomerId],
      customers: arrayOfCustomerId
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