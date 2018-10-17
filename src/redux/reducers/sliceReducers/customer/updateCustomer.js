const base = (state, action) => {
  const {customerId} = action.payload
  const prevCustomer = state.list[customerId]
  return {
    ...state,
    list:{
      ...state.list,
      [customerId]: {...prevCustomer, error: null, isLoading: true}
    }
  }
}

const success = (state, action) => {
  const {data, customerId} = action.payload
  const prevCustomer = state.list[customerId]
  return {
    ...state,
    list:{
      ...state.list,
      [customerId]: {
        ...prevCustomer,
        ...data,
        isLoading: false,
        error: null
      }
    }
  }
}

const error = (state, action) => {
  const {message, customerId} = action.payload
  const prevCustomer = state.list[customerId]
  return {
    ...state,
    list:{
      ...state.list,
      [customerId]: {...prevCustomer, isLoading: true, error: message}
    }
  }
}

export default {
  base,
  success,
  error,
}