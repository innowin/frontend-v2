const base = (state, action) => {
  const {userId} = action.payload || {}
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
      },
    },
  }
}

const success = (state, action) => {
  const {identity, data} = action.payload || {}

  return {
    ...state,
    list: {
      ...state.list,
      [identity]: {
        ...state.list[identity],
        ...data,
      },
    },
  }
}

const error = (state, action) => {
  const {userId} = action.payload || {}
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
      },
    },
  }
}

export default {
  base,
  success,
  error,
}