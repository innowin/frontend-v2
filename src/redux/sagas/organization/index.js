import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getOrganizationByOrganId} from "./getOrganSagas"
import {updateOrganization} from "./updateOrgan"
import {
  addPictureProduct,
  agencyRequest,
  createCertificate,
  createOrgCustomer,
  createProduct,
  deleteOrgCustomer,
  deleteProduct,
  getCertificates,
  getCustomers,
  getExchanges,
  getFollowers,
  getOrganizationMembers,
  getOrgStaff,
  getProductPicture,
  getProducts,
  getProductsSuccess,
  updateCertificate,
  updateCustomer,
  updateProduct,
  getFollowings,
} from "./organization"


/**********    %% WATCHERS %%    **********/

// get organization by organId
function* watchGetOrganizationByOrganId() {
  yield takeEvery(types.ORG.GET_ORGANIZATION, getOrganizationByOrganId)
}

// get organization - members
function* watchGetOrganizationMembers() {
  yield takeEvery(types.ORG.GET_ORGANIZATION_MEMBERS, getOrganizationMembers)
}

// update organization
function* watchUpdateOrganization() {
  yield takeEvery(types.ORG.UPDATE_ORGANIZATION_INFO, updateOrganization)
}

// get products
function* watchGetProducts() {
  yield takeEvery(types.ORG.GET_PRODUCTS, getProducts)
}

// get org followers
function* watchGetOrgFollowers() {
  yield takeEvery(types.ORG.GET_ORG_FOLLOWERS, getFollowers)
}

// get org followings
function* watchGetOrgFollowings() {
  yield takeEvery(types.ORG.GET_ORG_FOLLOWINGS, getFollowings)
}

// get org exchanges
function* watchGetOrgExchanges() {
  yield takeEvery(types.ORG.GET_ORG_EXCHANGES, getExchanges)
}

// get org customers
function* watchGetCustomers() {
  yield takeEvery(types.ORG.GET_ORG_CUSTOMERS, getCustomers)
}

// get org certificates
function* watchGetCertificates() {
  yield takeEvery(types.ORG.GET_ORG_CERTIFICATES, getCertificates)
}

function* watchCreateCertificate() {
  yield takeEvery(types.ORG.CREATE_CERTIFICATE, createCertificate)
}

// update org certificate
function* watchUpdateCertificate() {
  yield takeEvery(types.ORG.UPDATE_CERTIFICATE, updateCertificate)
}

// update org customer
function* watchUpdateCustomer() {
  yield takeEvery(types.ORG.UPDATE_CUSTOMER, updateCustomer)
}

function* watchCreateOrgProduct() {
  yield takeEvery(types.ORG.CREATE_PRODUCT, createProduct)
}

function* watchUpdateOrgProduct() {
  yield takeEvery(types.ORG.UPDATE_PRODUCT, updateProduct)
}

function* watchAddProductPicture() {
  yield takeEvery(types.ORG.ADD_PRODUCT_PICTURE, addPictureProduct)
}

function* watchGetProductPictures() {
  yield takeEvery(types.ORG.GET_PRODUCT_PICTURE, getProductPicture)
}

// get products success
function* watchGetProductsSuccess() {
  yield takeEvery(types.SUCCESS.ORG.GET_PRODUCTS, getProductsSuccess)
}

function* watchDeleteProduct() {
  yield takeEvery(types.ORG.DELETE_PRODUCT, deleteProduct)
}

function* watchGetStaff() {
  yield takeEvery(types.ORG.GET_STAFF, getOrgStaff)
}

function* watchCreateCustomer() {
  yield takeEvery(types.ORG.CREATE_CUSTOMER, createOrgCustomer)
}

function* watchDeleteCustomer() {
  yield takeEvery(types.ORG.DELETE_CUSTOMER, deleteOrgCustomer)
}

function* watchAgencyRequest() {
  yield takeEvery(types.ORG.AGENCY_REQUEST, agencyRequest)
}

export default [
  watchGetOrganizationByOrganId(),
  watchGetOrganizationMembers(),
  watchUpdateOrganization(),
  watchGetProducts(),
  watchGetOrgFollowers(),
  watchGetOrgFollowings(),
  watchGetOrgExchanges(),
  watchGetCustomers(),
  watchGetCertificates(),
  watchCreateCertificate(),
  watchUpdateCertificate(),
  watchUpdateCustomer(),
  watchCreateOrgProduct(),
  watchUpdateOrgProduct(),
  watchAddProductPicture(),
  watchGetProductPictures(),
  watchGetProductsSuccess(),
  watchDeleteProduct(),
  watchGetStaff(),
  watchCreateCustomer(),
  watchDeleteCustomer(),
  watchAgencyRequest(),
]