const success = (state, action) => {
  const {data} = action.payload
  if (state.list[data.id])
    return {
      ...state,
      list: {
        ...state.list,
        [data.id]: {
          ...state.list[data.id],
        },
      },
    }
  else return {
    ...state,
    list: {
      ...state.list,
      [data.id]: {
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