import commonTypes from './common'
import contributionTypes from './contribution'
import userTypes from './user'
import orgTypes from './organization'
import authTypes from './auth'
import exchangeTypes from './exchange'

const types = {
  ERRORS: {
    COMMON: commonTypes.ERROR,
    AUTH: authTypes.ERROR,
    CONT: contributionTypes.ERROR, // contribution errors
    USER: userTypes.ERROR,
    ORG: orgTypes.ERROR, // organization errors
		EXCHANGE: exchangeTypes.ERROR
  },

  SUCCESS: {
    COMMON: commonTypes.SUCCESS,
    AUTH: authTypes.SUCCESS,
    CONT: contributionTypes.SUCCESS, // contribution success
    USER: userTypes.SUCCESS,
    ORG: orgTypes.SUCCESS, // organization success
		EXCHANGE: exchangeTypes.SUCCESS
  },

  IS_LOADING: {
    COMMON: commonTypes.IS_LOADING,
    AUTH: authTypes.IS_LOADING,
    CONT: contributionTypes.IS_LOADING, // contribution isLoading
    USER: userTypes.IS_LOADING,
    ORG: orgTypes.IS_LOADING, // organization isLoading
    EXCHANGE: exchangeTypes.IS_LOADING
  },

  COMMON: commonTypes.BASE,
  AUTH: authTypes.BASE,
  CONT: contributionTypes.BASE,
  USER: userTypes.BASE,
  ORG: orgTypes.BASE,
	EXCHANGE: exchangeTypes.BASE
}

export default types