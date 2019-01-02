const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const indexedCustomer = {}
  data.forEach(customer => {
    const prevCustomer = state.list[customer.id]
    indexedCustomer[customer.id] = {...prevCustomer, ...customer, error: null, isLoading: false}
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...indexedCustomer,
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