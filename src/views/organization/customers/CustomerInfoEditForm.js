// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

import {Confirm} from "../../common/cards/Confirm"
import CustomerInfoForm from './CustomerInfoForm'
import type {CustomerType} from "../../../consts/flowTypes/organization/customer";

// flow type of CustomerInfoForm
type PropsCustomerInfoForm = {
  deleteOrgCustomer: Function,
  hideEdit: Function,
  customer: CustomerType,
  customerPictureLink: ?string,
  translate: { [string]: string },
  showConfirm: Function,
  cancelConfirm: Function,
  confirm: boolean,
}

const CustomerInfoEditForm = (props: PropsCustomerInfoForm) => {

  const {translate, customer, customerPictureLink, deleteOrgCustomer, hideEdit, showConfirm, cancelConfirm, confirm} = props
  return (
    confirm ? <Confirm cancelRemoving={cancelConfirm} remove={deleteOrgCustomer}/>
      : <CustomerInfoForm
        customer={customer}
        customerPictureLink={customerPictureLink}
        translate={translate}
        hideEdit={hideEdit}
      >
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-danger mr-auto" onClick={showConfirm}>
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

CustomerInfoEditForm.propTypes = {
  deleteOrgCustomer: PropTypes.func.isRequired,
  hideEdit: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  customerPictureLink: PropTypes.string,
  showConfirm: PropTypes.func.isRequired,
  cancelConfirm: PropTypes.func.isRequired,
  confirm: PropTypes.bool,
}

export default CustomerInfoEditForm