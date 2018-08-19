import commonTypes from './common'
import contributionTypes from './contribution'
import userTypes from './user'
import orgTypes from './organization'
import authTypes from './auth'
import exchangeTypes from './exchange'
import postTypes from './post'

const types = {
  RESET:'RESET',
  ERRORS: {
    COMMON: commonTypes.ERROR,
    AUTH: authTypes.ERROR,
    CONT: contributionTypes.ERROR, // contribution errors
    USER: userTypes.ERROR,
    ORG: orgTypes.ERROR, // organization errors
		EXCHANGE: exchangeTypes.ERROR,
    POST: postTypes.ERROR
  },

  SUCCESS: {
    COMMON: commonTypes.SUCCESS,
    AUTH: authTypes.SUCCESS,
    CONT: contributionTypes.SUCCESS, // contribution success
    USER: userTypes.SUCCESS,
    ORG: orgTypes.SUCCESS, // organization success
		EXCHANGE: exchangeTypes.SUCCESS,
    POST: postTypes.SUCCESS,
  },
  COMMON: commonTypes.BASE,
  AUTH: authTypes.BASE,
  CONT: contributionTypes.BASE,
  USER: userTypes.BASE,
  ORG: orgTypes.BASE,
	EXCHANGE: exchangeTypes.BASE,
  POST: postTypes.BASE,
}

export default types