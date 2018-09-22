import commonTypes from './common/index'
import userTypes from './user'
import orgTypes from './organization'
import authTypes from './auth'
import exchangeTypes from './exchange'
import entityTypes from './entity'
import workExperienceTypes from './workExperience'
import educationTypes from './education'
import skillTypes from './skill'


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
    SKILL: skillTypes.ERROR
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
    SKILL: skillTypes.SUCCESS
  },
  COMMON: commonTypes.BASE,
  AUTH: authTypes.BASE,
  USER: userTypes.BASE,
  ORG: orgTypes.BASE,
  EXCHANGE: exchangeTypes.BASE,
  ENTITY: entityTypes.BASE,
  WORK_EXPERIENCE: workExperienceTypes.BASE,
  EDUCATION: educationTypes.BASE,
  SKILL: skillTypes.BASE
}

export default types