import {all, fork} from 'redux-saga/effects'
import {
  watchGetOrganization,
  watchGetOrganizationSuccess,
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
} from './organization/organizationSaga'
import {watchLSignIn, watchLSignOut, watchLSignInError} from './auth/authSaga'
import {watchCreateSkill, watchCreateProduct} from './addingContribution/addContributionSagas'
import {watchGetProductInfo, watchUpdateProduct} from './common/productSagas'
import {watchLGetExchangesByMemberIdentity} from "./exchange/exchange"
import {watchGetCategories} from './common/categorySagas'
import {watchUsernameCheck, watchCreateUserPerson, watchCreateUserOrgan} from "./user/userSagas"


const rootSaga = function* () {
  yield all([
    fork(watchUsernameCheck),
    watchCreateUserPerson(),
    watchCreateUserOrgan(),
    watchLSignInError(),
    watchLSignOut(),
    watchLSignIn(),
    watchGetCertificates(),
    watchGetCustomers(),
    watchGetOrganization(),
    watchGetOrganizationMembers(),
    watchGetOrganizationSuccess(),
    watchGetOrgExchanges(),
    watchGetOrgFollowers(),
    watchGetOrgFollowings(),
    watchGetProducts(),
    watchUpdateOrganization(),
    watchLGetExchangesByMemberIdentity(),
    watchUpdateCustomer(),
    watchCreateSkill(),
    watchUpdateOrgProduct(),
    watchAddProductPicture(),
    watchGetProductPictures(),
    watchGetProductsSuccess(),
    watchDeleteProduct(),
    watchCreateCertificate(),
    // watchCreateProduct(),
    watchCreateOrgProduct(),
    // common sagas
    watchGetProductInfo(),
    watchUpdateProduct(),
    watchGetCategories()
  ])
}


export default rootSaga
