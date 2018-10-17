const base = (state, action) => {
}

const success = (state, action) => {
  const {organizationId, organLogoId, organBannerId} = action.payload || {}
  const organLogo_ = organLogoId || state.list[organizationId].organLogoId
  const organBanner_ = organBannerId || state.list[organizationId].organBannerId

  return {
    ...state,
    list: {
      ...state.list,
      [organizationId]: {
        ...state.list[organizationId],
        organLogoId:organLogo_,
        organBannerId:organBanner_
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