import types from "src/redux/actions/types"
import {takeEvery} from "redux-saga/effects"

/**********    %% WORKERS %%    **********/
import {getOrganizationByOrganId} from "./getOrganSagas"
import {updateOrganization} from "./updateOrgan"
import {
  addPictureProduct,
  agencyRequest,
  createOrgCustomer,
  createProduct,
  deleteOrgCustomer,
  getCustomers,
  getOrganizationMembers,
  getOrgStaff,
  getProductPicture,
  getProductsSuccess,
  updateCustomer
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

// get org customers
function* watchGetCustomers() {
  yield takeEvery(types.ORG.GET_ORG_CUSTOMERS, getCustomers)
}

// update org customer
function* watchUpdateCustomer() {
  yield takeEvery(types.ORG.UPDATE_CUSTOMER, updateCustomer)
}

function* watchCreateOrgProduct() {
  yield takeEvery(types.ORG.CREATE_PRODUCT, createProduct)
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
  watchGetCustomers(),
  watchUpdateCustomer(),
  watchCreateOrgProduct(),
  watchAddProductPicture(),
  watchGetProductPictures(),
  watchGetProductsSuccess(),
  watchGetStaff(),
  watchCreateCustomer(),
  watchDeleteCustomer(),
  watchAgencyRequest(),
]