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
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import {watchGetExchangesByMemberIdentity} from "./exchange/exchange"
import productWatchers from './common/product/product'
import categoryWatchers from './common/category/category'
import fileWatchers from './common/file/file'
import badgeWatchers from "./common/badge/badge"
import certificateWatchers from './common/certificate/certificate'
import watchUsernameCheck from "./user/checkUsernameSaga"
import {watchGetUserByUserId, watchGetProfileByUserId, watchGetIdentityByUserId} from "./user/getUserSagas"
import {watchCreateUserPerson, watchCreateUserOrgan,} from "./user/createUserSagas"


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
    watchAgencyRequest(),

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
    badgeWatchers.watchGetUserBadges()
  ])
}


export default rootSaga
