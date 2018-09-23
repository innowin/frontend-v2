import {all, fork} from 'redux-saga/effects'
import {
	watchGetOrganizationMembers,
	watchUpdateOrganization,
	watchGetProducts,
	watchGetOrgFollowers,
	watchGetOrgFollowings,
	watchGetOrgExchanges,
	watchGetCustomers,
	watchGetCertificates,
	watchUpdateCustomer,
	watchCreateOrgProduct,
	watchUpdateOrgProduct,
	watchAddProductPicture,
	watchGetProductPictures,
	watchGetProductsSuccess,
	watchDeleteProduct,
	watchCreateCertificate,
	watchGetStaff,
	watchCreateCustomer,
	watchDeleteCustomer,
	watchAgencyRequest,
} from './organization/organizationSaga'
import {watchGetOrganization} from "./organization/getOrganSagas"
// TODO: mohammad all auth sagas must go to ./auth/auth.js and just one import here from ./auth/auth.js
import {watchSignIn, watchSignOut, watchSignInError} from './auth/auth'
import authWatchers from './auth/auth'
import userWatchers from "./user"
import {
  watchGetExchangeByExId,
  watchCreateExchange,
} from "./exchange"

import identityWatchers from "./getIdentity"
import commonWatchers from './common/index'
import workExperienceWatchers from './workExperience'
import educationWatchers from './education'
import researchWatchers from './research'
import skillWatchers from './skill'

const rootSaga = function* () {
  yield all([
    watchSignInError(),
    watchSignOut(),
    watchSignIn(),
    watchGetCertificates(),
    watchGetCustomers(),
    watchGetOrganization(),
    watchGetOrganizationMembers(),
    watchGetOrgExchanges(),
    watchGetOrgFollowers(),
    watchGetOrgFollowings(),
    watchGetProducts(),
    watchUpdateOrganization(),
    watchUpdateCustomer(),
    watchUpdateOrgProduct(),
    watchAddProductPicture(),
    watchGetProductPictures(),
    watchGetProductsSuccess(),
    watchDeleteProduct(),
    watchCreateCertificate(),
    watchCreateOrgProduct(),
    watchGetStaff(),
    watchCreateCustomer(),
    watchDeleteCustomer(),

    //Exchange sagas
    watchGetExchangeByExId(),
    watchUpdateCustomer(),
    watchAgencyRequest(),
    watchCreateExchange(),

    // auth watchers
    authWatchers.watchVerifyToken(),

    // identity watchers
    identityWatchers.watchGetUserIdentity(),
    identityWatchers.watchGetOrgIdentity(),

    // user watchers
    ...userWatchers,

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
