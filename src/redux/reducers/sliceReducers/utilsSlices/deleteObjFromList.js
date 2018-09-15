const success = (state, action) => {
  const {deletingId} = action.payload
  const {[`${deletingId}`]: deletingItem, ...newList} = state.list
  return {
      ...state,
    list: newList
  }
}

const error = (state, action) => {}

const base = (state, action) => {}

export default {
  success
}