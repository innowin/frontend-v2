

const base = (state, action) => {
}

const success = (state, action) => {
  const {profileMediaId, profileBannerId} = action.payload || {}
  const profileMedia_ = profileMediaId || state.client.profile.profile_media
  const profileBanner_ = profileBannerId || state.client.profile.profile_banner
  const client = {...state.client}
  return {
    ...state,
    client: {
      ...client,
      profile: {
        ...client.profile,
        profile_media:profileMedia_,
        profile_banner:profileBanner_
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