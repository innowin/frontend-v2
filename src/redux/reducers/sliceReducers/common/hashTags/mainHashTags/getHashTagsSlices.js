const success = (state, action) => {
  const list = state.list
  const {data} = action.payload || {}
  return {
    ...state,
    list: {...list, ...data}
  }
}

const error = (state, action) => {}

const base = (state, action) => {}

export default {
  success,
  // error,
  // base
}