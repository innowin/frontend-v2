const base = (state, action) => {
}

const success = (state, action) => {
  const {data} = action.payload

  console.log('here: ', data)

  return {
    ...state,
    follows: {
      ...state.follows,
      list: {
        ...state.follows.list,
        [data.id]: {...data, isLoading: false, error: null},
      },
    },
  }
}

const error = (state, action) => {
}

export default {
  success,
  error,
  base,
}