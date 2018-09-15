const success = (state, action, relatedKey) => {
  const {list} = state
  const {destinationId, relatedObjId} = action.payload
  const oldObject = list[destinationId]
  const relatedIds = oldObject[relatedKey] || []
  relatedIds.push(relatedObjId)
  const newObject = {
      ...oldObject,
    [relatedKey]: [...new Set(relatedIds)]
  }
  return {
    ...state,
    list: {
      ...list,
      [destinationId]: newObject
    }
  }
}

const error = (state, action) => {}

const base = (state, action) => {}

export default {
  success
}