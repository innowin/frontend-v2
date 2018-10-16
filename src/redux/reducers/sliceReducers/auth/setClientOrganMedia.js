
const base = (state, action) => {
}

const success = (state, action) => {
  const {organLogoId, organBannerId} = action.payload || {}
  const organLogo_ = organLogoId || state.auth.client.organization.organization_logo
  const organBanner_ = organBannerId || state.auth.client.organization.organization_banner
  const {client} = state
  return {
    ...state,
    client: {
      ...client,
      organization: {
        ...client.organization,
        organization_logo:organLogo_,
        organization_banner:organBanner_
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