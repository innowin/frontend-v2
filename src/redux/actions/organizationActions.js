import types from './types';

//organization
const getOrganization = (organizationId) => ({
	type: types.ORG.GET_ORGANIZATION,
	payload: {
		organizationId
	}
})

const getMetaDataOrganization = () => ({
	type: types.ORG.GET_META_DATA_ORGANIZATION,
	payload: {
	}
})

const getOrganizationMembers = (organizationId) => ({
    type: types.ORG.GET_ORGANIZATION_MEMBERS,
	payload: {
        organizationId
	}
})

const getOrgFollowers = (organizationId) =>({
    type: types.ORG.GET_ORG_FOLLOWERS,
	payload: {
        organizationId
	} 
})

const getOrgFollowings = (organizationId) =>({
    type: types.ORG.GET_ORG_FOLLOWINGS,
	payload: {
        organizationId
	} 
})

const getOrgExchanges= (organizationId) =>({
    type: types.ORG.GET_ORG_EXCHANGES,
	payload: {
        organizationId
	} 
})

const getOrgCustomers = (organizationId) =>({
    type: types.ORG.GET_ORG_CUSTOMERS,
    payload: {
        organizationId
    }
})

const getOrgCertificates = (organizationId) => ({
    type:types.ORG.GET_ORG_CERTIFICATES,
    payload: {
        organizationId
    }
})
//abilities
const getAbilities = (organizationId) => ({
    type: types.ORG.GET_ABILITIES,
	payload: {
        organizationId
	}
})
const updateAbility = (formValues, abilityId) => ({
	type: types.ORG.UPDATE_ABILITY,
	payload: {
    ...formValues,
    abilityId
	}
})

const createAbility = (formValues, organizationId) => ({//TODO amir add organization id to formvalues
	type: types.ORG.CREATE_ABILITY,
	payload: {
    ...formValues,
    organizationId
	}
})

const deleteAbility = (abilityId) => ({
	type: types.ORG.DELETE_ABILITY,
	payload: {
    abilityId
	}
})

//basic information
const updateOrganization = (formValues, organizationId, hideEdit) => ({
	type: types.ORG.UPDATE_ORGANIZATION_INFO,
	payload: {
        formValues,
        organizationId,
        hideEdit
	}
})

const updateCertificate = (formValues, certId, hideEdit) => ({
  type: types.ORG.UPDATE_CERTIFICATE,
	payload: {
    ...formValues,
    certId,
    hideEdit
	}
})

const createCertificate = (formValues) => ({ //TODO amir add organizationId to formValues
  type: types.ORG.UPDATE_CERTIFICATE,
	payload: {
    ...formValues
	}
})

const deleteCertificate = (certId) => ({
  type: types.ORG.UPDATE_CERTIFICATE,
	payload: {
    certId
	}
})

const updateCustomer = (formValues, customerId, hideEdit) => ({
  type: types.ORG.UPDATE_CUSTOMER,
	payload: {
        formValues,
        customerId,
        hideEdit
	}
})

const createCustomer = (formValues) => ({ //TODO  amir add organizationId to formVAlue
  type: types.ORG.CREATE_CUSTOMER,
	payload: {
    formValues
	}
})

const deleteCustomer = (customerId) => ({
  type: types.ORG.DELETE_CUSTOMER,
	payload: {
    customerId
	}
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

const createProduct = (formValues, organizationId = null, hideEdit ) => ({ //TODO amir add orgnaizationid to formvalues
  type: types.CREATE_PRODUCT,
	payload: {
        formValues,
        organizationId,
        hideEdit
	}
})

const deleteProduct = ( productId) => ({
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

const getProductPicture= (productId) =>({
    type: types.ORG.GET_PRODUCT_PICTURE,
    payload:{
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
  getProductPicture,
  
  deletePicture,
  addPicture
};

export default OrganizationActions;