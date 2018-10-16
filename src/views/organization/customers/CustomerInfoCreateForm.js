// @flow
import * as React from "react"
import PropTypes from "prop-types"

import CustomerInfoForm from './CustomerInfoForm'
import type {CustomerType} from "../../../consts/flowTypes/organization/customer";

// flow type of CustomerInfoForm
type PropsCustomerInfoForm = {
  create: Function,
  hideEdit: Function,
  translate: { [string]: string },
  organizationId: number,
}

const CustomerInfoCreateForm = (props: PropsCustomerInfoForm) => {
  const _onSubmit = (values: CustomerType) => {
    const {hideEdit, create} = props

    const formFormat = {
      title: values.title ? values.title : null,

      //TODO: mohammad fix this hard code numbers
      relatedCustomer: 42,
      customerPicture: 1,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    create({formValues})
    hideEdit()
  }
  const {translate, organizationId, hideEdit} = props

  return (
      <CustomerInfoForm organizationId={organizationId}
                         translate={translate}
                         onSubmit={_onSubmit}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </CustomerInfoForm>
  )
}

CustomerInfoCreateForm.propTypes = {
  hideEdit: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  organizationId: PropTypes.number.isRequired,
}

export default CustomerInfoCreateForm