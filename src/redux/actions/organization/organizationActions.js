import types from '../types/index'

//organization
const getOrganizationByOrganId = (organizationId) => ({
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

const updateCustomer = (formValues, customerId, hideEdit) => ({
  type: types.ORG.UPDATE_CUSTOMER,
	payload: {
        formValues,
        customerId,
        hideEdit
	}
})

const createCustomer = (formValues, hideEdit, organizationId) => ({ //TODO  amir add organizationId to formVAlue
  type: types.ORG.CREATE_CUSTOMER,
	payload: {
        formValues,
        organizationId,
        hideEdit
	}
})

const deleteCustomer = (customerId, hideEdit) => ({
  type: types.ORG.DELETE_CUSTOMER,
	payload: {
        customerId,
        hideEdit
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


const OrganizationActions = {
  getOrganizationByOrganId,
  getMetaDataOrganization,
  getOrganizationMembers,
  getOrgExchanges,

  getAbilities,
  updateAbility,
  createAbility,
  deleteAbility,

  updateOrganization,
  
  getOrgCustomers,
  updateCustomer,
  createCustomer,
  deleteCustomer,

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

};

export default OrganizationActions;