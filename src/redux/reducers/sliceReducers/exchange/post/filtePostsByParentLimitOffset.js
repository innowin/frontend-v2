const success = (state, action) => {
  const {data, postParentId} = action.payload
  const postResults = data.results
  const postIds = postResults.map(post => post.id)
  if (postIds.length > 0) {
    const exchangeId = postParentId
    return {
      ...state,
      [exchangeId]: {
        ...state[exchangeId],
        posts: {
          content: postIds,
          isLoading: false,
          error:null
        }
      }
    }
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

const filterPostsByPostParentLimitOffset = {
  base,
  error,
  success
}

export default filterPostsByPostParentLimitOffset