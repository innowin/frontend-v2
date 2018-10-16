// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import CustomerInfo from './CustomerInfo'
import type {CustomerType} from "src/consts/flowTypes/organization/customer"
import {ContributionIcon} from "../../../images/icons"
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames"
import getCustomersSelector from "src/redux/selectors/organization/organGetCustomersSelector"
import CustomerActions from "../../../redux/actions/organization/customerActions";

type PropsCustomers = {
  organizationId: number,
  translate: { [string]: string },
  customers: (CustomerType)[],
  actions: {
    getCustomersByOrganizationId: Function,
    deleteOrgCustomer: Function,
    updateOrgCustomer: Function,
  },
  isLoading: boolean,
  error: {} | string | null,
}

class CustomerInfoContainer extends React.Component<PropsCustomers> {

  static propTypes = {
    organizationId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    customers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  componentDidMount() {
    const {actions, organizationId} = this.props
    const {getCustomersByOrganizationId} = actions
    getCustomersByOrganizationId({organizationId})
  }

  render() {
    const {translate, customers, organizationId, actions} = this.props
    const {updateOrgCustomer, deleteOrgCustomer} = actions

    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <ItemWrapper icon={<ContributionIcon/>}>
          <ItemHeader title={translate['Customers']}/>
          <div className='customers-wrapper'>
            {
              customers.map((customer, index) => (
                  <CustomerInfo
                      organizationId={organizationId}
                      updateOrgCustomer={updateOrgCustomer}
                      deleteOrgCustomer={deleteOrgCustomer}
                      customer={customer}
                      key={index + "CustomerInfo"}
                      translate={translate}
                  />
              ))
            }
          </div>
        </ItemWrapper>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {organizationId} = ownProps
  const defaultObject = {content: [], isLoading: false, error: null}
  const customerObject = (state.organs[organizationId] && state.organs[organizationId].customers) || defaultObject
  return {
    customers: getCustomersSelector(state, ownProps),
    isLoading: customerObject.isLoading,
    error: customerObject.error,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCustomersByOrganizationId: CustomerActions.getCustomersByOrganizationId,
    updateOrgCustomer: CustomerActions.updateOrgCustomer,
    deleteOrgCustomer: CustomerActions.deleteOrgCustomer,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoContainer)