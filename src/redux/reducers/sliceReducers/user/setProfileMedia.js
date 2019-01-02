const base = (state, action) => {
}

const success = (state, action) => {
  const {userId, profileMediaId, profileBannerId} = action.payload || {}
  const profileMedia_ = profileMediaId || state.list[userId].profileMediaId
  const profileBanner_ = profileBannerId || state.list[userId].profileBannerId
  return {
    ...state,
    list: {
      ...state.list,
      [userId]: {
        ...state.list[userId],
        profileMediaId: profileMedia_,
        profileBannerId: profileBanner_
      }
    }
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}