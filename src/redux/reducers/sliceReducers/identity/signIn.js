const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload
  const {identity} = data
  return {
    ...state,
    list: {
      ...state.list,
      [identity.id]: {...identity}
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