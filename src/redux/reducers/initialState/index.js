import authState from "./auth"
import usersState from "./users"
import skillsState from "./skills"
import organizationState from "./organization"
import organsState from "./organs"
import exchangesState from "./exchanges"
import commonStates from "./common"
import intlState from "./intl"


export default {
  auth: authState,
  users: usersState,
  skills: skillsState,
  organization: organizationState,
  organs: organsState,
  exchanges: exchangesState,
  common: {
    agencyRequest: commonStates.agencyRequestState,
    badge: commonStates.badgeState,
    category: commonStates.categoryState,
    certificate: commonStates.certificateState,
    exchangeMembership: commonStates.exchangeMembershipState,
    file: commonStates.fileState,
    hashTag: commonStates.hashTagState,
    location: commonStates.locationState,
    post: commonStates.postState,
    product: commonStates.productState,
    social: commonStates.socialState
  },
  intl: intlState,
}