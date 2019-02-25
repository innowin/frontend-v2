import {all} from 'redux-saga/effects'
import abilityWatchers from './ability'
import authWatchers from './auth'
import commonWatchers from './common'
import educationWatchers from './education'
import eventWatchers from './event'
import exchangeWatchers from "./exchange"
import favoriteWatchers from './favorite'
import identityWatchers from "./getIdentity"
import organizationWatchers from "./organization"
import researchWatchers from './research'
import skillWatchers from './skill'
import userWatchers from "./user"
import workExperienceWatchers from './workExperience'
import eventAssignmentWatchers from './eventAssignment'

const rootSaga = function* () {
  yield all([
    //Exchange sagas
    ...exchangeWatchers,
    
    // auth watchers
    ...authWatchers,
    
    // event watchers
    ...eventWatchers,
    
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
    
    // common
    ...commonWatchers,
    
    //ability
    ...abilityWatchers,
    
    //favorite
    ...favoriteWatchers,

    // event assignments
    ...eventAssignmentWatchers,
  ])
}

export default rootSaga
