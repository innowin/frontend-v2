const success = (state, action, relatedKey) => {
  const {ids=[], destinationId} = action.payload
  const destId = +destinationId
  const {list} = state
  const oldObj = list[destId] || {}
  const oldIds = oldObj[relatedKey] || []
  const newObj = {
    ...oldObj,
    [relatedKey]: [...new Set([...oldIds, ...ids])]
  }
  // console.log('--- slice --->> setRelatedObjectsForAnObj >> state: ', state)
  // console.log('--- slice --->> setRelatedObjectsForAnObj >> state[destinationId]: ', state.list[destinationId])
  // console.log('--- slice --->> setRelatedObjectsForAnObj >> state[destId]: ', state.list[destId])
  return {
    ...state,
    list: {
      ...list,
      [destId]: newObj
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