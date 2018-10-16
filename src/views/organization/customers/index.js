// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames"
import {getMessages} from "../../../redux/selectors/translateSelector"
import CustomerInfoContainer from "./CustomerContainer";
import {bindActionCreators} from "redux";
import CustomerActions from "../../../redux/actions/organization/customerActions";
import CustomerInfoCreateForm from "./CustomerInfoCreateForm";
import CheckOwner from "../../common/CheckOwner";

type PropsCustomers = {
  organizationId: number,
  translate: { [string]: string },
  actions: {
    createOrgCustomer: Function,
  }
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

  _createCustomer = ({formValues}) => {
    const {actions, organizationId} = this.props
    const {createOrgCustomer} = actions
    const generatedFormValues = {customer_organization: organizationId, customer_picture: 1, related_customer: 1, ...formValues}
    createOrgCustomer({organizationId, formValues: generatedFormValues})
  }

  render() {
    const {translate, organizationId} = this.props
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
            <div className='customer-create-container'>
              <p className='customer-create-header'>{translate['Customer']}</p>
              <CustomerInfoCreateForm hideEdit={this._hideCustomerCreateForm} create={this._createCustomer}
                                      translate={translate}
                                      organizationId={organizationId}/>

            </div>
            }
          </CheckOwner>
          <FrameCard>
            <ListGroup>
              <CustomerInfoContainer
                  organizationId={organizationId}
                  translate={translate}
              />
            </ListGroup>
          </FrameCard>
        </div>
    )
  }
}

Customers.propTypes = {
  organizationId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  translate: getMessages(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createOrgCustomer: CustomerActions.createOrgCustomer,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Customers)