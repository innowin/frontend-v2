// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import type {organizationType} from "src/consts/flowTypes/organization/organization"
import LockSvg from "../../../images/common/lock_svg";

// flow type of OrganizationInfoView
type PropsOrganizationInfoView = {
  showEdit: Function,
  organization: organizationType,
  translate: { [string]: string }
}

const PrivateInfoView = (props: PropsOrganizationInfoView) => {
  const {organization, showEdit, translate} = props

  return (
      <div>
        <ItemHeader title={translate['Private info']} showEdit={showEdit}/>
        <LockSvg className='user-lock-private'/>
        <Field>
          <FieldLabel label={translate['Official name'] + ": "}/>
          <FieldValue value={organization.official_name}/>
        </Field>
        <Field>
          <FieldLabel label={translate['National code'] + ": "}/>
          <FieldValue value={organization.national_code}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Established year'] + ": "}/>
          <FieldValue value={organization.established_year}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Registration ads url'] + ": "}/>
          <FieldValue value={organization.registration_ads_url}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Staff count'] + ": "}/>
          <FieldValue value={organization.staff_count}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Email'] + ": "}/>
          <FieldValue value={organization.email}/>
        </Field>
      </div>
  )
}

PrivateInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default PrivateInfoView