const base = (state, action) => {
  const {data} = action.payload
  return {
    ...state,
    list:{
      ...state.list,
      [data.id]: {...data}
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
  error,
}