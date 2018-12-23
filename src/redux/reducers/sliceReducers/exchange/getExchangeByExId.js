const success = (state, action) => {
  const {data} = action.payload
  if (state.list[data.id].exchange)
    return {
      ...state,
      list: {
        ...state.list,
        [data.id]: {
          ...state.list[data.id],
          exchange: {
            content: {...state.list[data.id].exchange.content, ...data},
            isLoading: false,
            error: null
          }
        }

      }
    }
  else return {
    ...state,
    list: {
      ...state.list,
      [data.id]: {
        ...state.list[data.id],
        exchange: {
          content: {...data},
          isLoading: false,
          error: null
        }
      }

    }
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success
}