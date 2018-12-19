// @flow
import * as React from "react"
import PropTypes from "prop-types"

import CustomerInfoForm from './CustomerInfoForm'

// flow type of CustomerInfoForm
type PropsCustomerInfoForm = {
  createOrgCustomer: Function,
  hideEdit: Function,
  translate: { [string]: string },
  organizationId: number,
  createFile: Function
}

const CustomerInfoCreateForm = (props: PropsCustomerInfoForm) => {
  const {translate, organizationId, createOrgCustomer, hideEdit, createFile} = props

  return (
    <CustomerInfoForm organizationId={organizationId}
                      translate={translate}
                      createFile={createFile}
                      createOrgCustomer={createOrgCustomer}
                      hideEdit={hideEdit}
    >
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
  createOrgCustomer: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired,
  organizationId: PropTypes.number.isRequired,
  createFile: PropTypes.func.isRequired
}

export default CustomerInfoCreateForm