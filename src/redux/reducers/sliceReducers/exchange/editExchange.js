const success = (state, action) => {
  const {data} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [data.id]: {
        ...state.list[data.id],
        exchange: {
          ...state.list[data.id].exchange,
          content: {
            ...state.list[data.id].exchange.content,
            name: data.name,
            description: data.description,
            biography: data.biography
            // TODO: add media
          }
        }
      },
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