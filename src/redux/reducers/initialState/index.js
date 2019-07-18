import authState from './auth'
import commonStates from './common'
import educationState from './education'
import exchangesState from './exchanges'
import identitiesState from './identities'
import intlState from './intl'
import paramState from './param'
import researchState from './research'
import skillState from './skill'
import tempState from './temp'
import toastState from './toast'
import workExperienceState from './workExperience'
import modalState from './modal'

export default {
  auth: authState,
  education: educationState,
  exchanges: exchangesState,
  identities: identitiesState,
  intl: intlState,
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
    proposal: commonStates.proposalState,
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
  education: educationState,
  exchanges: exchangesState,
  identities: identitiesState,
  intl: intlState,
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
    proposal: commonStates.proposalState,
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