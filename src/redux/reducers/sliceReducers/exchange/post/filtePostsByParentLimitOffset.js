const SUCCESS = (state, action) => {
  const {data, postParentId, postParentType} = action.payload
  const postResults = data.results
  const postIds = postResults.map(post => post.id)
  if (postParentType === 'exchange' && postIds.length > 0) {
    const exchangeId = postParentId
    const prevPostIds = (state[postParentId] && state[postParentId].posts) ? state[postParentId].posts.content : []
    return {
      ...state,
      [exchangeId]: {
        ...state[exchangeId],
        posts: {
          content: [ ...postIds, ...prevPostIds],
          isLoading: false,
          error:null
        }
      }
    }
  }
  return {...state}
}

const ERROR = (state, action) => {

}

const BASE = (state, action) => {

}

const filterPostsByPostParentLimitOffset = {
  BASE,
  ERROR,
  SUCCESS
}

export default filterPostsByPostParentLimitOffset