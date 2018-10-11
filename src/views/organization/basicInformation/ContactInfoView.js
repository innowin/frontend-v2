// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import type {organizationType} from "src/consts/flowTypes/organization/organization"

// flow type of OrganizationInfoView
type PropsOrganizationInfoView = {
  showEdit: Function,
  organization: organizationType,
  translate: { [string]: string }
}

const ContactInfoView = (props: PropsOrganizationInfoView) => {
  const {organization, showEdit, translate} = props
  //FixMe: mohammad address 2, phone 2
  return (
      <div>
        <ItemHeader title={translate['Contact Information']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Address'] + ": "}/>
          <FieldValue value={organization.address}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Address'] + " 2: "}/>
          <FieldValue value={organization.address}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Phone'] + ": "}/>
          <FieldValue value={organization.phone}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Phone'] + " 2: "}/>
          <FieldValue value={organization.phone}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Website'] + ": "}/>
          <FieldValue value={organization.web_site}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Email'] + ": "}/>
          <FieldValue value={organization.public_email}/>
        </Field>
      </div>
  )
}

ContactInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default ContactInfoView