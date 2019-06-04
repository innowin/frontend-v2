import types from '../types/index'

const getMetaDataOrganization = () => ({
  type: types.ORG.GET_META_DATA_ORGANIZATION,
  payload: {}
})

const getOrganizationMembers = (organizationId) => ({
  type: types.ORG.GET_ORGANIZATION_MEMBERS,
  payload: {
    organizationId
  }
})

const getOrgExchanges = (organizationId) => ({
  type: types.ORG.GET_ORG_EXCHANGES,
  payload: {
    organizationId
  }
})

//basic information
const updateOrganization = ({formValues, organizationId}) => ({
  type: types.ORG.UPDATE_ORGANIZATION_INFO,
  payload: {formValues, organizationId}
})

const getProducts = (organizationId) => ({
  type: types.ORG.GET_PRODUCTS,
  payload: {
    organizationId
  }
})

const updateProduct = (formValues, productId, hideEdit) => ({
  type: types.ORG.UPDATE_PRODUCT,
  payload: {
    formValues,
    productId,
    hideEdit
  }
})

const createProduct = (formValues, organizationId = null, hideEdit) => ({ //TODO amir add orgnaizationid to formvalues
  type: types.CREATE_PRODUCT,
  payload: {
    formValues,
    organizationId,
    hideEdit
  }
})

const deleteProduct = (productId) => ({
  type: types.ORG.DELETE_PRODUCT,
  payload: {
    productId
  }
})

const deletePicture = (pictures, picture) => ({
  type: types.ORG.DELETE_PICTURE,
  payload: {
    pictures,
    picture
  }
})

const getProductPicture = (productId) => ({
  type: types.ORG.GET_PRODUCT_PICTURE,
  payload: {
    productId
  }
})

const addPicture = (picture_media, picture_product) => ({
  type: types.ORG.ADD_PRODUCT_PICTURE,
  payload: {
    picture_media,
    picture_product
  }
})

const getProductPrice = (productId) => ({
  type: types.ORG.GET_PRODUCT_PRICE,
  payload: {
    productId
  }
})

const getOrgStaff = (organizationId) => ({
  type: types.ORG.GET_STAFF,
  payload: {
    organizationId
  }
})

const agencyRequest = (description, hideLoading) => ({
  type: types.ORG.AGENCY_REQUEST,
  payload: {
    description,
    hideLoading
  }
})

const getOrganizationsFilterByOfficialName = ({officialName}) => ({
  type: types.ORG.GET_ORGANIZATION_FILTER_BY_OFFICIAL_NAME,
  payload: {
    officialName,
  }
})

const emptySearchedOrganization = () => ({
  type: types.ORG.EMPTY_SEARCHED_ORGANIZATION,
  payload: {}
})


const OrganizationActions = {
  getMetaDataOrganization,
  getOrganizationMembers,
  getOrgExchanges,
  updateOrganization,
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductPicture,
  getProductPrice,
  deletePicture,
  addPicture,
  getOrgStaff,
  agencyRequest,
  getOrganizationsFilterByOfficialName,
  emptySearchedOrganization,
};

export default OrganizationActions;