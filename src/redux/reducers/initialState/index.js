import abilityState from './ability'
import authState from './auth'
import commonStates from './common'
import customerState from './customer'
import educationState from './education'
import eventState from './event'
import eventAssignmentState from './eventAssignments'
import exchangesState from './exchanges'
import favoriteState from './favorite'
import identitiesState from './identities'
import intlState from './intl'
import organizationState from './organization'
import paramState from './param'
import researchState from './research'
import skillState from './skill'
import tempState from './temp'
import toastState from './toast'
import workExperienceState from './workExperience'
import modalState from './modal'

export default {
  auth: authState,
  ability: abilityState,
  customer: customerState,
  education: educationState,
  event: eventState,
  eventAssignment: eventAssignmentState,
  exchanges: exchangesState,
  favorite: favoriteState,
  identities: identitiesState,
  intl: intlState,
  organization: organizationState,
  param: paramState,
  research: researchState,
  skill: skillState,
  temp: tempState,
  toast: toastState,
  workExperience: workExperienceState,
  common: {
    badges: commonStates.badgeState,
    category: commonStates.categoryState,
    certificate: commonStates.certificateState,
    comment: commonStates.commentState,
    educationField: commonStates.educationFieldState,
    exchangeMembership: commonStates.exchangeMembershipState,
    file: commonStates.fileState,
    hashTag: commonStates.hashTagState,
    location: commonStates.locationState,
    post: commonStates.postState,
    product: commonStates.productState,
    social: commonStates.socialState,
    university: commonStates.universityState,
  },
  modal: modalState,
}

export const clearCache = {
  ability: abilityState,
  customer: customerState,
  education: educationState,
  event: eventState,
  eventAssignment: eventAssignmentState,
  exchanges: exchangesState,
  favorite: favoriteState,
  identities: identitiesState,
  intl: intlState,
  organization: organizationState,
  param: paramState,
  research: researchState,
  skill: skillState,
  temp: tempState,
  toast: toastState,
  workExperience: workExperienceState,
  common: {
    badges: commonStates.badgeState,
    category: commonStates.categoryState,
    certificate: commonStates.certificateState,
    comment: commonStates.commentState,
    educationField: commonStates.educationFieldState,
    exchangeMembership: commonStates.exchangeMembershipState,
    file: commonStates.fileState,
    hashTag: commonStates.hashTagState,
    location: commonStates.locationState,
    post: commonStates.postState,
    product: commonStates.productState,
    social: commonStates.socialState,
    university: commonStates.universityState,
  },
  modal: modalState,
}