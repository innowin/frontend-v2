const success = (state, action) => {
  return {
    ...state,
    list: {
      ...state.list,
      ...action.data
    }
  }
}

const error = (state, action) => {}

const base = (state, action) => {}

export default {
  success,
  // error,
  // base
}