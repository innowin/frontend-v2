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
import watchUsernameCheck from "./user/checkUsernameSaga"
import {
  watchGetExchangeByExId,
  watchCreateExchange,
} from "./exchange"
import {watchGetUserByUserId, watchGetProfileByUserId, watchGetUsers} from "./user/getUserSagas"
import {watchCreateUserPerson, watchCreateUserOrgan,} from "./user/createUserSagas"
import identityWatchers from "./getIdentity"
// TODO: mohammad all user sagas must go to ./user/user.js and just one import here from ./user/user.js
import userWatchers from './user/user'
import commonWatchers from './common/index'
import workExperienceWatchers from './workExperience'
import educationWatchers from './education'
import researchWatchers from './research'
import skillWatchers from './skill/skill'


const rootSaga = function* () {
  yield all([
    fork(watchUsernameCheck),
    watchCreateUserPerson(),
    watchCreateUserOrgan(),
    watchGetUserByUserId(),
    watchGetUsers(),
    watchGetProfileByUserId(),
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

    // user watchers
    userWatchers.watchUpdateUserByUserId(),
    userWatchers.watchUpdateProfileByProfileId(),

    // skill
    ...skillWatchers,

    // auth watchers
    authWatchers.watchVerifyToken(),

    // identity watchers
    identityWatchers.watchGetUserIdentity(),
    identityWatchers.watchGetOrgIdentity(),

    // work experiences
    ...workExperienceWatchers,

    // educations
    ...educationWatchers,

    // research
    ...researchWatchers,

    // NOTE: the common watchers pushed to common/index.js to prevent from conflict.
    // common
    ...commonWatchers
  ])
}

export default rootSaga
