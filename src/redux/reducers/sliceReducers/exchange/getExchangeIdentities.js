const success = (state, action) => {
  const {data} = action.payload
  return {
    ...state,
    ...data
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