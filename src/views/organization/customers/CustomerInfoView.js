// @flow
import * as React from "react"
import PropTypes from "prop-types"

import type {CustomerType} from 'src/consts/flowTypes/organization/customer'
import CheckOwner from "../../common/CheckOwner"
import {EditIcon} from "../../../images/icons"

type PropsCustomerInfo = {
  customer: CustomerType,
  showEdit: Function,
  organizationId: number,
  translate: { [string]: string }
}

const CustomerInfoView = (props: PropsCustomerInfo) => {
  const {customer, showEdit, organizationId} = props
  return (
      <div className='customer-view-container'>
        <CheckOwner id={organizationId}>
          <div className="customer-edit -item-edit-btn pulse" onClick={showEdit}>
            <EditIcon/>
          </div>
        </CheckOwner>
        <div className='customer-image'>
          <img src={customer.customer_picture.file}/>
        </div>
        <div className='customer-title'>{customer.title}</div>
      </div>
  )
}

CustomerInfoView.propTypes = {
  customer: PropTypes.object.isRequired,
  showEdit: PropTypes.func.isRequired,
  organizationId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
}

export default CustomerInfoView