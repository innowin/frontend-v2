const success = (state, action) => {
  const {isDone} = action.payload

  return {
    ...state,
    client: {
      ...state.client,
      isBeeDone: isDone,
    },
  }
}

export default {
  success,
}