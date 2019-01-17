const base = (state, action) => {
}

const success = (state, action) => {
  const {data, organizationId} = action.payload || {}
  const client = {...state.client}
  const previousCustomer = (client && client.customers) || []

  data.map(customer => {
    if (organizationId === state.client.organization.id && (!previousCustomer.includes(customer.id))) {
      return previousCustomer.push(customer.id)
    }
    return previousCustomer
  })
  return {
    ...state,
    client: {
      ...client,
      // customers: [...previousCustomer, ...arrayOfCustomerId],
      customers: previousCustomer
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