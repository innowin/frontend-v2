const setFile = (state, action) => {
  const {data} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [data.id]: data
    }
  }
}
export default setFile