const base = (state, action) => {
  const { id } = action.payload
  const previousData = state.list[id]
  return {
    ...state,
    list: {
      ...state.list,
      [id]: { ...previousData, isLoading: true, error: null }
    }
  }
}

const success = (state, action) => {
  const { id, data } = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [id]: { ...data, isLoading: false }
    }
  }
}

const error = (state, action) => {
  const { id, message } = action.payload
  const previousData = state.list.id
  return {
    ...state,
    list: {
      ...state.list,
      [id]: { ...previousData, isLoading: false, error: message }
    }
  }
}

export default {
  base,
  success,
  error
}