const base = (state, action) => {
}

const success = (state, action) => {
  const {commentId} = action.payload
  let comments = {...state.list}
  delete comments[commentId]
  return {
    ...state,
    list: {...comments},
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}