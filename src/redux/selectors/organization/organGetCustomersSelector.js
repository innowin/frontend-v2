import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getCustomers = state => state.customer.list
const getOrganizationCustomers = (state, props) => {
  const {organizationId} = props
  const organizationsList = state.identities.list
  if (organizationsList[organizationId] && organizationsList[organizationId].customers)
    return organizationsList[organizationId].customers.content
  else return undefined
}
const getOrganizationId = (state, props) => props.organizationId

/** this selector selects customers. **/
const getCustomersSelector = createSelector(
    [getCustomers, getOrganizationCustomers, getOrganizationId],
    (customers, organizationCustomers, organizationId) => {
      if (customers && Object.keys(customers).length !== 0 && customers.constructor === Object && organizationCustomers && organizationId) {
        const arrayCustomers = helpers.getObjectOfArrayKeys(organizationCustomers, customers)
        return [...arrayCustomers]
      }
      return []
    }
)

export default getCustomersSelector