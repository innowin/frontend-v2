const base = (state, action) => {
  const {exchangeId} = action.payload

  return {
    ...state,
    client: {
      ...state.client,
      selectedExchange: exchangeId
    }
  }
}

const success = (state, action) => {
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error
}