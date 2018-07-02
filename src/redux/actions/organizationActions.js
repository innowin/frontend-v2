import types from './actionTypes';

//organization
const getOrganization = (organId) => ({
	type: types.GET_ORGANIZATION,
	payload: {
		organId
	}
})

const getMetaDataOrganization = () => ({
	type: types.GET_META_DATA_ORGANIZATION,
	payload: {
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
    abilityId
	}
})

const deleteAbility = (abilityId) => ({
	type: types.DELETE_ABILITY,
	payload: {
    abilityId
	}
})

//basic information
const updateOrganization = (formValues, organizationId) => ({
	type: types.DELETE_ABILITY,
	payload: {
    ...formValues,
    organizationId
	}
})

const updateCertificate = (formValues, certId) => ({
  type: types.UPDATE_CERTIFICATE,
	payload: {
    ...formValues,
    certId
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

const updateCustomer = (formValues) => ({
  type: types.UPDATE_CUSTOMER,
	payload: {
    ...formValues,
    customerId
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

const updateProduct = (formValues, productId) => ({
  type: types.UPDATE_PRODUCT,
	payload: {
    ...formValues,
    productId
	}
})

const createProduct = (formValues) => ({ //TODO amir add orgnaizationid to formvalues
  type: types.CREATE_PRODUCT,
	payload: {
    ...formValues
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

  getAbilities,
  updateAbility,
  createAbility,
  deleteAbility,

  updateOrganization,

  updateCertificate,
  createCertificate,
  deleteCertificate,

  updateCustomer,
  createCustomer,
  deleteCustomer,

  updateProduct,
  createProduct,
  deleteProduct,
  
  deletePicture,
  addPicture
};

export default OrganizationActions;