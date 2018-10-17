const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, customerId} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCustomer = (state.list[organizationId] && state.list[organizationId].customers) || defaultObject
  const newDeletedCustomers = previousCustomer.content.filter(id => id !== customerId)
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        customers: {
          content: newDeletedCustomers,
          isLoading: false,
          error: null
        }
      }
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