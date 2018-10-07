// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import {JalaliDateWithDot} from "../../common/JalaliWithFarsiMonth"
import type {organizationType} from "src/consts/flowTypes/organization/organization"

// flow type of OrganizationInfoView
type PropsOrganizationInfoView = {
  showEdit: Function,
  organization: organizationType,
  translate: { [string]: string }
}

const BasicInfoView = (props: PropsOrganizationInfoView) => {
  const {organization, showEdit, translate} = props

  return (
      <div>
        <ItemHeader title={translate['Basic Information']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Username'] + ": "}/>
          <FieldValue value={organization.username}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Organization name'] + ": "}/>
          <FieldValue value={organization.nike_name}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Date joined'] + ": "}/>
          <FieldValue value={JalaliDateWithDot(organization.created_time)}/>
        </Field>
      </div>
  )
}

BasicInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default BasicInfoView