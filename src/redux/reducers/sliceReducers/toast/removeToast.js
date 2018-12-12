const base = (state, action) => {
  const {id} = action.payload
  const {[`${id}`]: deleted, ...deleteRest} = state.list
  return {
    ...state,
    list: {...deleteRest}
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