import type {CustomerType} from "src/consts/flowTypes/organization/customer";
import {Component} from "react";
import PropTypes from "prop-types";
import CustomerInfoEditForm from "./CustomerInfoEditForm";
import * as React from "react";
import {VerifyWrapper} from "../../common/cards/Frames";
import CustomerInfoView from "./CustomerInfoView";

type PropsCustomerInfo = {
  updateOrgCustomer: Function,
  deleteOrgCustomer: Function,
  customer: CustomerType,
  organizationId: number,
  translate: { [string]: string },
}
type StateCustomerInfo = {
  edit: boolean,
}

class CustomerInfo extends Component<PropsCustomerInfo, StateCustomerInfo> {
  static propTypes = {
    customer: PropTypes.object.isRequired,
    updateOrgCustomer: PropTypes.func.isRequired,
    deleteOrgCustomer: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    organizationId: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _delete = () => {
    const {deleteOrgCustomer, customer} = this.props
    const customerId = customer.id
    const organizationId = customer.customer_organization
    deleteOrgCustomer({customerId, organizationId})
    this._hideEdit()
  }

  render() {
    const {translate, updateOrgCustomer, organizationId, customer} = this.props
    const {edit} = this.state
    // FixMe: mohammad isLoading and error come from redux
    return (
        <VerifyWrapper isLoading={false} error={false} className='customer-wrapper'>
          {edit ? <CustomerInfoEditForm
                  organizationId={organizationId}
                  customer={customer}
                  hideEdit={this._hideEdit}
                  update={updateOrgCustomer}
                  deleteOrgCustomer={this._delete}
                  translate={translate}
              />
              : <CustomerInfoView translate={translate} customer={customer} showEdit={this._showEdit} organizationId={organizationId}/>
          }
        </VerifyWrapper>
    )
  }
}

export default CustomerInfo