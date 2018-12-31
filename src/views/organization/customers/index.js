// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames"
import {getMessages} from "src/redux/selectors/translateSelector"
import CustomerInfoContainer from "./CustomerContainer";
import {bindActionCreators} from "redux";
import CustomerActions from "src/redux/actions/organization/customerActions";
import CustomerInfoCreateForm from "./CustomerInfoCreateForm";
import CheckOwner from "../../common/CheckOwner";
import getCustomersSelector from "src/redux/selectors/organization/organGetCustomersSelector";
import type {CustomerType} from "src/consts/flowTypes/organization/customer";


type PropsCustomers = {
  organizationId: number,
  translate: { [string]: string },
  actions: {
    getCustomersByOrganizationId: Function,
  },
  customers: (CustomerType)[],
  customerObjectIsLoading: boolean,
  customerObjectError: {} | string | null,
}
type StatesCustomer = {
  customerCreateForm: boolean,
}

class Customers extends React.Component<PropsCustomers, StatesCustomer> {
  constructor(props: PropsCustomers) {
    super(props)

    this.state = {
      customerCreateForm: false,
    }
  }

  _showCustomerCreateForm = () => {
    this.setState({customerCreateForm: true})
  }

  _hideCustomerCreateForm = () => {
    this.setState({customerCreateForm: false})
  }


  componentDidMount() {
    const {actions, organizationId} = this.props
    const {getCustomersByOrganizationId} = actions
    getCustomersByOrganizationId({organizationId})
  }

  render() {
    const {translate, organizationId, customers, customerObjectError, customerObjectIsLoading} = this.props
    const {customerCreateForm} = this.state

    return (
      <div>
        <CategoryTitle
          title={translate['Customers']}
        />
        <CheckOwner id={organizationId}>
          {!(customerCreateForm) &&
          <div className='customer-add-container'>
            <button className='customer-add-button pulse'
                    onClick={this._showCustomerCreateForm}>{`${translate['Add']} ${translate['Customer']}`}</button>
          </div>
          }
          {customerCreateForm &&
          <FrameCard className='customer-tab'>
            <ListGroup>
                <p className='customer-create-header'>{translate['Customer']}</p>
                <CustomerInfoCreateForm
                  hideEdit={this._hideCustomerCreateForm}
                  translate={translate}
                  organizationId={organizationId}
                />
            </ListGroup>
          </FrameCard>
          }
        </CheckOwner>
        <FrameCard>
          <ListGroup>
            <CustomerInfoContainer
              organizationId={organizationId}
              translate={translate}
              customers={customers}
              error={customerObjectError}
              isLoading={customerObjectIsLoading}
            />
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

Customers.propTypes = {
  organizationId: PropTypes.number.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const {organizationId} = ownProps
  const defaultObject = {content: [], isLoading: false, error: null}
  const customerObject = (state.organs[organizationId] && state.organs[organizationId].customers) || defaultObject
  return {
    customers: getCustomersSelector(state, ownProps),
    customerObjectIsLoading: customerObject.isLoading,
    customerObjectError: customerObject.error,
    translate: getMessages(state)
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCustomersByOrganizationId: CustomerActions.getCustomersByOrganizationId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Customers)