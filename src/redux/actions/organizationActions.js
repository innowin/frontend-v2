import types from './actionTypes';

//organization
const getOrganization = (organizationId) => ({
	type: types.ORGANIZTION.GET_ORGANIZATION,
	payload: {
		organizationId
	}
})

const getMetaDataOrganization = () => ({
	type: types.ORGANIZTION.GET_META_DATA_ORGANIZATION,
	payload: {
	}
})

const getOrganizationMembers = (organizationId) => ({
    type: types.ORGANIZTION.GET_ORGANIZATION_MEMBERS,
	payload: {
        organizationId
	}
})

const getOrgFollowers = (organizationId) =>({
    type: types.ORGANIZTION.GET_ORG_FOLLOWERS,
	payload: {
        organizationId
	} 
})

const getOrgFollowings = (organizationId) =>({
    type: types.ORGANIZTION.GET_ORG_FOLLOWINGS,
	payload: {
        organizationId
	} 
})

const getOrgExchanges= (organizationId) =>({
    type: types.ORGANIZTION.GET_ORG_EXCHANGES,
	payload: {
        organizationId
	} 
})

const getOrgCustomers = (organizationId) =>({
    type: types.ORGANIZTION.GET_ORG_CUSTOMERS,
    payload: {
        organizationId
    }
})

const getOrgCertificates = (organizationId) => ({
    type:types.ORGANIZTION.GET_ORG_CERTIFICATES,
    payload: {
        organizationId
    }
})
//abilities
const getAbilities = (organizationId) => ({
    type: types.ORGANIZTION.GET_ABILITIES,
	payload: {
        organizationId
	}
})
const updateAbility = (formValues, abilityId) => ({
	type: types.ORGANIZTION.UPDATE_ABILITY,
	payload: {
    ...formValues,
    abilityId
	}
})

const createAbility = (formValues, organizationId) => ({//TODO amir add organization id to formvalues
	type: types.ORGANIZTION.CREATE_ABILITY,
	payload: {
    ...formValues,
    organizationId
	}
})

const deleteAbility = (abilityId) => ({
	type: types.ORGANIZTION.DELETE_ABILITY,
	payload: {
    abilityId
	}
})

//basic information
const updateOrganization = (formValues, organizationId, hideEdit) => ({
	type: types.ORGANIZTION.UPDATE_ORGANIZATION_INFO,
	payload: {
        formValues,
        organizationId,
        hideEdit
	}
})

const updateCertificate = (formValues, certId, hideEdit) => ({
  type: types.ORGANIZTION.UPDATE_CERTIFICATE,
	payload: {
    ...formValues,
    certId,
    hideEdit
	}
})

const createCertificate = (formValues) => ({ //TODO amir add organizationId to formValues
  type: types.ORGANIZTION.UPDATE_CERTIFICATE,
	payload: {
    ...formValues
	}
})

const deleteCertificate = (certId) => ({
  type: types.ORGANIZTION.UPDATE_CERTIFICATE,
	payload: {
    certId
	}
})

const updateCustomer = (formValues, customerId, hideEdit) => ({
  type: types.ORGANIZTION.UPDATE_CUSTOMER,
	payload: {
        formValues,
        customerId,
        hideEdit
	}
})

const createCustomer = (formValues) => ({ //TODO  amir add organizationId to formVAlue
  type: types.ORGANIZTION.CREATE_CUSTOMER,
	payload: {
    formValues
	}
})

const deleteCustomer = (customerId) => ({
  type: types.ORGANIZTION.DELETE_CUSTOMER,
	payload: {
    customerId
	}
})

const getProducts = (organizationId) => ({
    type: types.ORGANIZTION.GET_PRODUCTS,
	payload: {
        organizationId
	}   
})

const updateProduct = (formValues, productId) => ({
  type: types.ORGANIZTION.UPDATE_PRODUCT,
	payload: {
    ...formValues,
    productId
	}
})

const createProduct = (formValues) => ({ //TODO amir add orgnaizationid to formvalues
  type: types.ORGANIZTION.CREATE_ORG_PRODUCT,
	payload: {
    ...formValues
	}
})

const deleteProduct = ( productId) => ({
  type: types.ORGANIZTION.DELETE_PRODUCT,
	payload: {
    productId
	}
})

const deletePicture = (pictures, picture) => ({
  type: types.ORGANIZTION.DELETE_PICTURE,
	payload: {
    pictures, 
    picture
	}
})

const addPicture = (picture_media, picture_product) => ({
  type: types.ORGANIZTION.ADD_PICTURE,
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