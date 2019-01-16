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
import customerState from './customer'
import abilityState from './ability'
import favoriteState from './favorite'
import tempState from "./temp"
import toastState from './toast'

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
  customer: customerState,
  ability: abilityState,
  favorite: favoriteState,
  common: {
    agencyRequest: commonStates.agencyRequestState,
    badges: commonStates.badgeState,
    category: commonStates.categoryState,
    certificate: commonStates.certificateState,
    exchangeMembership: commonStates.exchangeMembershipState,
    file: commonStates.fileState,
    hashTag: commonStates.hashTagState,
    location: commonStates.locationState,
    post: commonStates.postState,
    product: commonStates.productState,
    social: commonStates.socialState,
    comment: commonStates.commentState,
    university: commonStates.universityState,
    educationField: commonStates.educationFieldState,
  },
  intl: intlState,
  param: paramState,
  temp: tempState,
  toast: toastState,
}