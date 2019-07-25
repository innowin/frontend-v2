const success = (state, action) => {
  const {data} = action.payload
  const {list = {}} = state
  const oldObj = list[data.id] || {}
  return {
    ...state,
    list: {
      ...state.list,
      [data.id]: {
        ...oldObj,
        ...data,
        isLoading: false,
        error: null,
      },
    },
  }
}

const error = (state, action) => {
  const {id} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [id]: {
        ...state.list[id],
        isLoading: false,
        error: true,
      },
    },
  }
}

const base = (state, action) => {
  const {id} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [id]: {
        ...state.list[id],
        isLoading: true,
        error: null,
      },
    },
  }
}

export default {
  success,
  base,
  error,
}
