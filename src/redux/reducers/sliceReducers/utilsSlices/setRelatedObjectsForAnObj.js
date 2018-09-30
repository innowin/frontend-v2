const success = (state, action, relatedKey) => {
  const {ids=[], destinationId} = action.payload
  const {list} = state
  const oldObj = list[destinationId] = {}
  const oldIds = oldObj[relatedKey] || []
  const newObj = {
    ...oldObj,
    [relatedKey]: [...new Set([...oldIds, ...ids])]
  }
  return {
    ...state,
    list: {
      ...list,
      [destinationId]: newObj
    }
  }
}

const base = (state, action) => {
}

const error = (state, action) => {
}

export default {
  // base,
  success,
  // error
}