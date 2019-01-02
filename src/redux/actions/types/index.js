import commonTypes from './common/index'
import userTypes from './user'
import orgTypes from './organization'
import authTypes from './auth'
import exchangeTypes from './exchange'
import entityTypes from './entity'
import workExperienceTypes from './workExperience'
import educationTypes from './education'
import researchTypes from './research'
import skillTypes from './skill'
import paramTypes from './param'
import abilityTypes from './ability'
import favoriteTypes from './favorite'
import toastTypes from './toast'


const types = {
  RESET: 'RESET',
  ERRORS: {
    COMMON: commonTypes.ERROR,
    AUTH: authTypes.ERROR,
    USER: userTypes.ERROR,
    ORG: orgTypes.ERROR, // organization errors
    EXCHANGE: exchangeTypes.ERROR,
    ENTITY: entityTypes.ERROR,
    WORK_EXPERIENCE: workExperienceTypes.ERROR,
    EDUCATION: educationTypes.ERROR,
    RESEARCH: researchTypes.ERROR,
    SKILL: skillTypes.ERROR,
    PARAM: paramTypes.ERROR,
    ABILITY: abilityTypes.ERROR,
    FAVORITE: favoriteTypes.ERROR,
    TOAST: toastTypes.ERROR,
  },
  SUCCESS: {
    COMMON: commonTypes.SUCCESS,
    AUTH: authTypes.SUCCESS,
    USER: userTypes.SUCCESS,
    ORG: orgTypes.SUCCESS, // organization success
    EXCHANGE: exchangeTypes.SUCCESS,
    ENTITY: entityTypes.SUCCESS,
    WORK_EXPERIENCE: workExperienceTypes.SUCCESS,
    EDUCATION: educationTypes.SUCCESS,
		RESEARCH: researchTypes.SUCCESS,
    SKILL: skillTypes.SUCCESS,
    PARAM: paramTypes.SUCCESS,
    ABILITY: abilityTypes.SUCCESS,
    FAVORITE: favoriteTypes.SUCCESS,
    TOAST: toastTypes.SUCCESS,
  },
  COMMON: commonTypes.BASE,
  AUTH: authTypes.BASE,
  USER: userTypes.BASE,
  ORG: orgTypes.BASE,
  EXCHANGE: exchangeTypes.BASE,
  ENTITY: entityTypes.BASE,
  WORK_EXPERIENCE: workExperienceTypes.BASE,
  EDUCATION: educationTypes.BASE,
	RESEARCH: researchTypes.BASE,
  SKILL: skillTypes.BASE,
  PARAM: paramTypes.BASE,
  ABILITY: abilityTypes.BASE,
  FAVORITE: favoriteTypes.BASE,
  TOAST: toastTypes.BASE,
}

export default types