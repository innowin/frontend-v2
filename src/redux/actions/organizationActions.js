import types from './actionTypes';

//organization
const getOrganization = (organizationId) => ({
	type: types.GET_ORGANIZATION,
	payload: {
		organizationId
	}
})

const getMetaDataOrganization = () => ({
	type: types.GET_META_DATA_ORGANIZATION,
	payload: {
	}
})

const getOrganizationMembers = (organizationId) => ({
    type: types.GET_ORGANIZATION_MEMBERS,
	payload: {
        organizationId
	}
})

const getOrgFollowers = (organizationId) =>({
    type: types.GET_ORG_FOLLOWERS,
	payload: {
        organizationId
	} 
})

const getOrgFollowings = (organizationId) =>({
    type: types.GET_ORG_FOLLOWINGS,
	payload: {
        organizationId
	} 
})

const getOrgExchanges= (organizationId) =>({
    type: types.GET_ORG_EXCHANGES,
	payload: {
        organizationId
	} 
})

const getOrgCustomers = (organizationId) =>({
    type: types.GET_ORG_CUSTOMERS,
    payload: {
        organizationId
    }
})

const getOrgCertificates = (organizationId) => ({
    type:types.GET_ORG_CERTIFICATES,
    payload: {
        organizationId
    }
})
//abilities
const getAbilities = (organizationId) => ({
    type: types.GET_ABILITIES,
	payload: {
        organizationId
	}
})
const updateAbility = (formValues, abilityId) => ({
	type: types.UPDATE_ABILITY,
	payload: {
    ...formValues,
    abilityId
	}
})

const createAbility = (formValues, organizationId) => ({//TODO amir add organization id to formvalues
	type: types.CREATE_ABILITY,
	payload: {
    ...formValues,
    organizationId
	}
})

const deleteAbility = (abilityId) => ({
	type: types.DELETE_ABILITY,
	payload: {
    abilityId
	}
})

//basic information
const updateOrganization = (formValues, organizationId, hideEdit) => ({
	type: types.UPDATE_ORGANIZATION_INFO,
	payload: {
        formValues,
        organizationId,
        hideEdit
	}
})

const updateCertificate = (formValues, certId, hideEdit) => ({
  type: types.UPDATE_CERTIFICATE,
	payload: {
    ...formValues,
    certId,
    hideEdit
	}
})

const createCertificate = (formValues) => ({ //TODO amir add organizationId to formValues
  type: types.UPDATE_CERTIFICATE,
	payload: {
    ...formValues
	}
})

const deleteCertificate = (certId) => ({
  type: types.UPDATE_CERTIFICATE,
	payload: {
    certId
	}
})

const updateCustomer = (formValues, customerId, hideEdit) => ({
  type: types.UPDATE_CUSTOMER,
	payload: {
        formValues,
        customerId,
        hideEdit
	}
})

const createCustomer = (formValues) => ({ //TODO  amir add organizationId to formVAlue
  type: types.CREATE_CUSTOMER,
	payload: {
    formValues
	}
})

const deleteCustomer = (customerId) => ({
  type: types.DELETE_CUSTOMER,
	payload: {
    customerId
	}
})

const getProducts = (organizationId) => ({
    type: types.GET_PRODUCTS,
	payload: {
        organizationId
	}   
})

const updateProduct = (formValues, productId) => ({
  type: types.UPDATE_PRODUCT,
	payload: {
    ...formValues,
    productId
	}
})

const createProduct = (formValues, organizationId = null, hideEdit ) => ({ //TODO amir add orgnaizationid to formvalues
  type: types.CREATE_PRODUCT,
	payload: {
        formValues,
        organizationId,
        hideEdit
	}
})

const deleteProduct = ( productId) => ({
  type: types.DELETE_PRODUCT,
	payload: {
    productId
	}
})

const deletePicture = (pictures, picture) => ({
  type: types.DELETE_PICTURE,
	payload: {
    pictures, 
    picture
	}
})

const addPicture = (picture_media, picture_product) => ({
  type: types.ADD_PICTURE,
	payload: {
    picture_media, 
    picture_product
	}
})

const OrganizationActions = {
  getOrganization,
  getMetaDataOrganization,
  getOrganizationMembers,
  getOrgFollowers,
  getOrgFollowings,
  getOrgExchanges,

  getAbilities,
  updateAbility,
  createAbility,
  deleteAbility,

  updateOrganization,

  getOrgCertificates,
  updateCertificate,
  createCertificate,
  deleteCertificate,
  
  getOrgCustomers,
  updateCustomer,
  createCustomer,
  deleteCustomer,

  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  
  deletePicture,
  addPicture
};

export default OrganizationActions;