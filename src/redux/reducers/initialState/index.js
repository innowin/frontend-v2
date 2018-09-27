import authState from "./auth"
import usersState from "./users"
import skillState from "./skill"
import organizationState from "./organization"
import organsState from "./organs"
import exchangesState from "./exchanges"
import commonStates from "./common"
import intlState from "./intl"
import workExperienceState from './workExperience'
import educationState from './education'
import researchState from './research'
import paramState from './param'
import identitiesState from "./identities"

export default {
  auth: authState,
  identities: identitiesState,
  users: usersState,
  skill: skillState,
  research: researchState,
  organization: organizationState,
  organs: organsState,
  exchanges: exchangesState,
  workExperience: workExperienceState,
  education: educationState,
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
  param: paramState,
}