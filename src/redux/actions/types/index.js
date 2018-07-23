import commonTypes from './common'
import contributionTypes from './contribution'


const types = {
    ERRORS: {
        COMMON: commonTypes.ERROR,
        CONT: contributionTypes.ERROR // contribution errors
    },

    SUCCESS: {
        COMMON: commonTypes.SUCCESS,
        CONT: contributionTypes.SUCCESS // contribution success
    },

    COMMON: commonTypes.BASE,
    CONT: contributionTypes.BASE // contribution base
}

export default types