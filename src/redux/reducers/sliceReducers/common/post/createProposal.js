const base = (state, action) => {
  const {postId} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [postId]: {
        ...state.list[postId],
        proposals: {
          list: state.list[postId].proposals && state.list[postId].proposals.list ? [...state.list[postId].proposals.list] : [],
          loading: true,
        },
      },
    },
  }
}

const success = (state, action) => {
  const {data, postId} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [postId]: {
        ...state.list[postId],
        post_proposals_count: state.list[postId].post_proposals_count + 1,
        proposals: {
          list: [...state.list[postId].proposals.list, data.id],
          loading: false,
        },
      },
    },
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}