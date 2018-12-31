// @flow
import * as React from "react"
import PropTypes from "prop-types"


import CustomerInfo from './CustomerInfo'
import type {CustomerType} from "src/consts/flowTypes/organization/customer"
import {ContributionIcon} from "../../../images/icons"
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames"

type PropsCustomers = {
  organizationId: number,
  translate: { [string]: string },
  customers: (CustomerType)[],
  isLoading: boolean,
  error: {} | string | null,
}

const CustomerInfoContainer = (props: PropsCustomers) => {
  const {translate, customers, organizationId, isLoading, error} = props
  return (
    //<VerifyWrapper isLoading={isLoading} error={error}>
    <ItemWrapper icon={<ContributionIcon/>}>
      <ItemHeader title={translate['Customers']}/>
      <div className='customers-wrapper'>
        {
          customers.map((customer, index) => (
            <CustomerInfo
              organizationId={organizationId}
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

CustomerInfoContainer.propTypes = {
  organizationId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
  customers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
}

export default CustomerInfoContainer