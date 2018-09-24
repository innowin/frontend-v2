import {all} from 'redux-saga/effects'
import authWatchers from './auth'
import commonWatchers from './common/index'
import educationWatchers from './education'
import exchangeWatchers from "./exchange"
import identityWatchers from "./getIdentity"
import organizationWatchers from "./organization"
import researchWatchers from './research'
import skillWatchers from './skill'
import userWatchers from "./user"
import workExperienceWatchers from './workExperience'

const rootSaga = function* () {
  yield all([
    //Exchange sagas
    ...exchangeWatchers,

    // auth watchers
    ...authWatchers,

    // identity watchers
    ...identityWatchers,

    // user watchers
    ...userWatchers,

    // organization watchers
    ...organizationWatchers,

    // work experiences
    ...workExperienceWatchers,

    // educations
    ...educationWatchers,

    // research
    ...researchWatchers,

    // skill
    ...skillWatchers,

    // NOTE: the common watchers pushed to common/index.js to prevent from conflict.
    // common
    ...commonWatchers
  ])
}

export default rootSaga
