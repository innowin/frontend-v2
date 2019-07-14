const base = (state, action) => {
  const {like_parent} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [like_parent]: {
        ...state.list[like_parent],
        is_post_liked_by_logged_in_user: !state.list[like_parent].is_post_liked_by_logged_in_user,
        likes_count: !state.list[like_parent].is_post_liked_by_logged_in_user === true ? state.list[like_parent].likes_count + 1 : state.list[like_parent].likes_count - 1,
      },
    },
  }
}

const success = (state, action) => {

}

const error = (state, action) => {
  const {like_parent} = action.payload
  return {
    ...state,
    list: {
      ...state.list,
      [like_parent]: {
        ...state.list[like_parent],
        is_post_liked_by_logged_in_user: !state.list[like_parent].is_post_liked_by_logged_in_user,
        likes_count: !state.list[like_parent].is_post_liked_by_logged_in_user === true ? state.list[like_parent].likes_count + 1 : state.list[like_parent].likes_count - 1,
      },
    },
  }
}

export default {
  base,
  success,
  error,
}