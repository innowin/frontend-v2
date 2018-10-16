import types from "../types";

const getCustomersByOrganizationId = ({organizationId}) => ({
  type: types.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID,
  payload: {
    organizationId
  }
})

const updateOrgCustomer = ({formValues, customerId}) => ({
  type: types.ORG.UPDATE_CUSTOMER,
  payload: {
    formValues,
    customerId,
  }
})

const createOrgCustomer = ({formValues, organizationId}) => ({
  type: types.ORG.CREATE_CUSTOMER,
  payload: {
    formValues,
    organizationId,
  }
})

const deleteOrgCustomer = ({customerId, organizationId}) => ({
  type: types.ORG.DELETE_CUSTOMER,
  payload: {
    customerId,
    organizationId
  }
})

const CustomerActions = {
  getCustomersByOrganizationId,
  updateOrgCustomer,
  createOrgCustomer,
  deleteOrgCustomer,

};

export default CustomerActions;