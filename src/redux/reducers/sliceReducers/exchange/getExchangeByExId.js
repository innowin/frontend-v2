const success = (state, action) => {
  const {data} = action.payload
  const previous = state.list[data.id] ? {...state.list[data.id]} : {}
  return {
    ...state,
    list: {
      ...state.list,
      [data.id]: {
        ...previous,
        ...data,
      },
    },
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success,
}