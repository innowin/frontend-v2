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
} from './organization/organizationSaga'
import {watchGetOrganization} from "./organization/getOrganSagas"
// TODO: mohammad all auth sagas must go to ./auth/auth.js and just one import here from ./auth/auth.js
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/auth'
import authWatchers from './auth/auth'
import {watchGetExchangesByMemberIdentity} from "./exchange/exchange"
import productWatchers from './common/product/product'
import categoryWatchers from './common/category/category'
import fileWatchers from './common/file/file'
import badgeWatchers from "./common/badge/badge"
import certificateWatchers from './common/certificate/certificate'
import watchUsernameCheck from "./user/checkUsernameSaga"
import {watchGetUserByUserId, watchGetProfileByUserId, watchGetIdentityByUserId} from "./user/getUserSagas"
import {watchCreateUserPerson, watchCreateUserOrgan,} from "./user/createUserSagas"
// TODO: mohammad all user sagas must go to ./user/user.js and just one import here from ./user/user.js
import userWatchers from './user/user'


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
    watchGetExchangesByMemberIdentity(),
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

    // product watchers
    productWatchers.watchGetProductInfo(),
    productWatchers.watchUpdateProduct(),

    // category watchers
    categoryWatchers.watchGetCategoriesList(),

    // file watchers
    fileWatchers.watchGetFile(),
    fileWatchers.watchCreateFile(),
    fileWatchers.watchUpdateFile(),
    fileWatchers.watchDelFileMiddleWareData(),

    // certificate watchers
    certificateWatchers.watchGetObjectCertificates(),
    certificateWatchers.watchCreateObjectCertificate(),
    certificateWatchers.watchResetCreatingObjectCertStatus(),

    // badge watchers
    badgeWatchers.watchGetOrganBadges(),
    badgeWatchers.watchGetUserBadges(),

    // user watchers
    userWatchers.watchUpdateUserByUserId(),

    // auth watchers
    authWatchers.watchVerifyToken(),
  ])
}


export default rootSaga
