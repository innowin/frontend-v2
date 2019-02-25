import abilityTypes from './ability'
import authTypes from './auth'
import commonTypes from './common/index'
import educationTypes from './education'
import entityTypes from './entity'
import eventTypes from './event'
import eventAssignmentTypes from './eventAssignment'
import exchangeTypes from './exchange'
import favoriteTypes from './favorite'
import orgTypes from './organization'
import paramTypes from './param'
import researchTypes from './research'
import skillTypes from './skill'
import toastTypes from './toast'
import userTypes from './user'
import workExperienceTypes from './workExperience'


const types = {
  RESET: 'RESET',
  ERRORS: {
    ABILITY: abilityTypes.ERROR,
    AUTH: authTypes.ERROR,
    COMMON: commonTypes.ERROR,
    EDUCATION: educationTypes.ERROR,
    ENTITY: entityTypes.ERROR,
    EVENT: eventTypes.ERROR,
    EVENT_ASSIGNMENT: eventAssignmentTypes.ERROR,
    EXCHANGE: exchangeTypes.ERROR,
    FAVORITE: favoriteTypes.ERROR,
    ORG: orgTypes.ERROR, // organization errors
    PARAM: paramTypes.ERROR,
    RESEARCH: researchTypes.ERROR,
    SKILL: skillTypes.ERROR,
    TOAST: toastTypes.ERROR,
    USER: userTypes.ERROR,
    WORK_EXPERIENCE: workExperienceTypes.ERROR,
  },
  SUCCESS: {
		RESEARCH: researchTypes.SUCCESS,
    ABILITY: abilityTypes.SUCCESS,
    AUTH: authTypes.SUCCESS,
    COMMON: commonTypes.SUCCESS,
    EDUCATION: educationTypes.SUCCESS,
    ENTITY: entityTypes.SUCCESS,
    EVENT: eventTypes.SUCCESS,
    EVENT_ASSIGNMENT: eventAssignmentTypes.SUCCESS,
    EXCHANGE: exchangeTypes.SUCCESS,
    FAVORITE: favoriteTypes.SUCCESS,
    ORG: orgTypes.SUCCESS, // organization success
    PARAM: paramTypes.SUCCESS,
    SKILL: skillTypes.SUCCESS,
    TOAST: toastTypes.SUCCESS,
    USER: userTypes.SUCCESS,
    WORK_EXPERIENCE: workExperienceTypes.SUCCESS,
  },
	RESEARCH: researchTypes.BASE,
  ABILITY: abilityTypes.BASE,
  AUTH: authTypes.BASE,
  COMMON: commonTypes.BASE,
  EDUCATION: educationTypes.BASE,
  ENTITY: entityTypes.BASE,
  EVENT: eventTypes.BASE,
  EVENT_ASSIGNMENT: eventAssignmentTypes.BASE,
  EXCHANGE: exchangeTypes.BASE,
  FAVORITE: favoriteTypes.BASE,
  ORG: orgTypes.BASE,
  PARAM: paramTypes.BASE,
  SKILL: skillTypes.BASE,
  TOAST: toastTypes.BASE,
  USER: userTypes.BASE,
  WORK_EXPERIENCE: workExperienceTypes.BASE,
}

export default types