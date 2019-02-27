const success = (state, action) => {
  const {data, postParentId} = action.payload
  const postIds = data.map(post => post.id)
  if (postIds.length > 0) {
    const exchangeId = postParentId
    return {
      ...state,
      list: {
        ...state.list,
        [exchangeId]: {
          ...state.list[exchangeId],
          posts: {
            content: postIds,
            isLoading: false,
            error: null
          }
        }
      }
    }
  } else return state
}

const error = (state, action) => {

}

const base = (state, action) => {
  const {postParentId} = action.payload
  const exchangeId = postParentId
  return {
    ...state,
    list: {
      ...state.list,
      [exchangeId]: {
        ...state.list[exchangeId],
        posts: state.list[exchangeId] ? {
              ...state.list[exchangeId].posts,
              isLoading: true,
              error: null
            }
            : {
              isLoading: true,
              error: null
            }
      }
    }
  }
}

export default {
  base,
  error,
  success
}