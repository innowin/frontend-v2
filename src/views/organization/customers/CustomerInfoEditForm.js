// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"

import {Confirm} from "../../common/cards/Confirm"
import CustomerInfoForm from './CustomerInfoForm'
import type {CustomerType, CustomerFormType} from "../../../consts/flowTypes/organization/customer";

// flow type of CustomerInfoForm
type PropsCustomerInfoForm = {
  update: Function,
  deleteOrgCustomer: Function,
  hideEdit: Function,
  customer: CustomerType,
  translate: { [string]: string },
}
type StateCustomerEditForm = {
  confirm: boolean
}

class CustomerInfoEditForm extends Component<PropsCustomerInfoForm, StateCustomerEditForm> {
  static propTypes = {
    update: PropTypes.func.isRequired,
    deleteOrgCustomer: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    customer: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
  }

  constructor(props: PropsCustomerInfoForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: CustomerFormType) => {
    const {customer, update, hideEdit} = this.props

    const customerId: number = customer.id

    const formFormat = {
      title: customer.title === values.title ? null : values.title,
      relatedCustomer: customer.related_customer === values.relatedCustomer ? null : values.relatedCustomer,
      customerPicture: customer.customer_picture === values.customerPicture ? null : values.customerPicture,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, customerId})
    hideEdit()
  }

  render() {
    const {confirm} = this.state
    const {translate, customer, deleteOrgCustomer, hideEdit} = this.props
    return (
        confirm ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteOrgCustomer}/>
            : <CustomerInfoForm onSubmit={this._onSubmit} customer={customer} translate={translate}>
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </CustomerInfoForm>
    )
  }
}

export default CustomerInfoEditForm