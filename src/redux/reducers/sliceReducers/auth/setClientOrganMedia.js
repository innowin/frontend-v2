
const base = (state, action) => {
}

const success = (state, action) => {
  const {organLogoId, organBannerId, organizationId} = action.payload || {}
  const {client} = state
  if(client.organization && organizationId === client.organization.id) {
    const organLogo_ = organLogoId || client.organization.organization_logo
    const organBanner_ = organBannerId || client.organization.organization_banner
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
  else {
    return state
  }
}

const error = (state, action) => {
}

export default {
  base,
  success,
  error,
}