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
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/auth'
import authWatchers from './auth/auth'
import watchUsernameCheck from "./user/checkUsernameSaga"
import {
  watchGetExchangesByMemberIdentity,
  watchGetExchangeByExId,
  watchGetExchangeMembersByExId,
  watchDeleteExchangeMembership
} from "./exchange/exchange"
import {watchGetUserByUserId, watchGetProfileByUserId, watchGetIdentityByUserId} from "./user/getUserSagas"
import {watchCreateUserPerson, watchCreateUserOrgan,} from "./user/createUserSagas"
// TODO: mohammad all user sagas must go to ./user/user.js and just one import here from ./user/user.js
import userWatchers from './user/user'
import commonWatchers from './common/index'


const rootSaga = function* () {
  yield all([
    fork(watchUsernameCheck),
    watchCreateUserPerson(),
    watchCreateUserOrgan(),
    watchGetUserByUserId(),
    watchGetProfileByUserId(),
    watchGetIdentityByUserId(),
    watchLSignInError(),
    watchLSignOut(),
    watchLSignIn(),
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
    watchGetExchangesByMemberIdentity(),
    watchGetExchangeMembersByExId(),
    watchDeleteExchangeMembership(),
    watchUpdateCustomer(),
    watchAgencyRequest(),

    // user watchers
    userWatchers.watchUpdateUserByUserId(),
    userWatchers.watchUpdateProfileByProfileId(),

    // auth watchers
    authWatchers.watchVerifyToken(),

    // NOTE: the common watchers pushed to common/index.js to prevent from conflict.
    // common
    ...commonWatchers
  ])
}

export default rootSaga
