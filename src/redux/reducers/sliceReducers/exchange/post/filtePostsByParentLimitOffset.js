const success = (state, action) => {
  const {data, postParentId} = action.payload
  const postResults = data.results
  const postIds = postResults.map(post => post.id)
  if (postIds.length > 0) {
    const exchangeId = postParentId
    return {
      ...state,
      list:{
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
  }else return state
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