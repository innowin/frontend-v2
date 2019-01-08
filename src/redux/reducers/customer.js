import initialState from "./initialState"
import types from "../actions/types/index"
import slices from './sliceReducers/customer'

const customer = (state = initialState.customer, action) => {
  switch (action.type) {
    /** -------------------------- get org customers by organization id-------------------------> **/
    case types.SUCCESS.ORG.GET_CUSTOMERS_BY_ORGANIZATION_ID:
      return slices.getCustomersByOrganizationId.success(state, action)
    /** -------------------------- get customer by customer id-------------------------> **/
    case types.SUCCESS.ORG.GET_CUSTOMER_BY_CUSTOMER_ID:
      return slices.getCustomerByCustomerId.success(state, action)
    /** -------------------------- create customer -------------------------> **/
    case types.SUCCESS.ORG.CREATE_CUSTOMER:
      return slices.createCustomer.success(state, action)
    /** -------------------------- delete customer -------------------------> **/
    case types.ORG.DELETE_CUSTOMER:
      return slices.deleteCustomer.base(state, action)
    case types.SUCCESS.ORG.DELETE_CUSTOMER:
      return slices.deleteCustomer.success(state, action)
    case types.ERRORS.ORG.DELETE_CUSTOMER:
      return slices.deleteCustomer.error(state, action)
    /** -------------------------- update customer  -------------------------> **/
    case types.ORG.UPDATE_CUSTOMER:
      return slices.updateCustomer.base(state, action)
    case types.SUCCESS.ORG.UPDATE_CUSTOMER:
      return slices.updateCustomer.success(state, action)
    case types.ERRORS.ORG.UPDATE_CUSTOMER:
      return slices.updateCustomer.error(state, action)
    /** -------------------------- reset  -------------------------> **/
    case types.RESET:
      return initialState.customer
    default:
      return state
  }
}
export default customer
