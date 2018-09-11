const success = (state, action, relatedKey) => {
  const {list} = state
  const {destinationId, relatedObjId} = action.payload
  const oldObject = list[destinationId]
  const newObject = oldObject[relatedKey] ? {
    ...oldObject,
    [relatedKey]: [...oldObject[relatedKey], relatedObjId]
  } : {
    ...oldObject,
    [relatedKey]: [relatedObjId]
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