const base = (state, action) => {
  const {organizationId} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCustomer = (state.list[organizationId] && state.list[organizationId].customers) || defaultObject
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        customers: {
          ...previousCustomer,
          isLoading: true,
          error: null
        }
      }
    }
  }
}

const success = (state, action) => {
  const {organizationId, data} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCustomer = (state.list[organizationId] && state.list[organizationId].customers) || defaultObject
  const arrayOfCustomerId = data.map(customer => customer.id)
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        customers: {
          content: [...new Set([...previousCustomer.content, ...arrayOfCustomerId])],
          isLoading: false,
          error: null
        }
      }
    }
  }
}

const error = (state, action) => {
  const {organizationId, message} = action.payload || {}
  const defaultObject = {content: [], isLoading: false, error: null}
  const previousCustomer = (state.list[organizationId] && state.list[organizationId].customers) || defaultObject
  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        customers: {
          ...previousCustomer,
          isLoading: false,
          error: message
        }
      }
    }
  }
}

export default {
  base,
  success,
  error,
}