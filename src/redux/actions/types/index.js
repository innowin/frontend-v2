import commonTypes from './common'
import contributionTypes from './contribution'
import userTypes from './user'
import orgTypes from './organization'
import authTypes from "./auth"


const types = {
  ERRORS: {
    COMMON: commonTypes.ERROR,
    AUTH: authTypes.ERROR,
    CONT: contributionTypes.ERROR, // contribution errors
    USER: userTypes.ERROR,
    ORG: orgTypes.ERROR, // organization errors
  },

  SUCCESS: {
    COMMON: commonTypes.SUCCESS,
    AUTH: authTypes.SUCCESS,
    CONT: contributionTypes.SUCCESS, // contribution success
    USER: userTypes.SUCCESS,
    ORG: orgTypes.SUCCESS, // organization success
  },

  COMMON: commonTypes.BASE,
  AUTH: authTypes.BASE,
  CONT: contributionTypes.BASE, // contribution base
  USER: userTypes.BASE,
  ORG: orgTypes.BASE, // organization base
}

export default types