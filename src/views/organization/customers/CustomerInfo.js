import type {CustomerType} from "src/consts/flowTypes/organization/customer";
import {Component} from "react";
import PropTypes from "prop-types";
import CustomerInfoEditForm from "./CustomerInfoEditForm";
import * as React from "react";
import {VerifyWrapper} from "../../common/cards/Frames";
import CustomerInfoView from "./CustomerInfoView";
import {bindActionCreators} from "redux";
import FileActions from "src/redux/actions/commonActions/fileActions";
import {connect} from "react-redux";

type PropsCustomerInfo = {
  updateOrgCustomer: Function,
  deleteOrgCustomer: Function,
  getFile: Function,
  customer: CustomerType,
  customerPictureLink: ?string,
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
    this.state = {edit: false, confirm: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _showEditConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelEditConfirm = () => {
    this.setState({confirm: false})
  }

  _delete = () => {
    const {deleteOrgCustomer, customer} = this.props
    const customerId = customer ? customer.id :null
    const organizationId = customer ? customer.customer_organization : null
    customerId && deleteOrgCustomer({customerId, organizationId})
    this._hideEdit()
  }

  render() {
    const {translate, actions, updateOrgCustomer, organizationId, customer, customerPictureLink} = this.props
    const {getFile} = actions
    const {edit, confirm} = this.state
    // FixMe: mohammad isLoading and error come from redux
    return (
      <VerifyWrapper isLoading={false} error={false} className='customer-wrapper'>
        {edit ? <CustomerInfoEditForm
            organizationId={organizationId}
            customer={customer}
            customerPictureLink={customerPictureLink}
            hideEdit={this._hideEdit}
            updateOrgCustomer={updateOrgCustomer}
            deleteOrgCustomer={this._delete}
            getFile={getFile}
            translate={translate}
            confirm={confirm}
            showConfirm={this._showEditConfirm}
            cancelConfirm={this._cancelEditConfirm}
          />
          : <CustomerInfoView translate={translate} customer={customer} showEdit={this._showEdit}
                              organizationId={organizationId}/>
        }
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {customer} = ownProps
  const customerPictureId = customer && customer.customer_picture
  const customerPictureLink = customerPictureId &&
    state.common.file.list[customerPictureId] &&
    state.common.file.list[customerPictureId].file
  return {
    customerPictureLink
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFile: FileActions.getFile,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo)