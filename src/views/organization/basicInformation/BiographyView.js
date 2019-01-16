// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {Field, FieldLabel, ItemHeader} from "../../common/cards/Frames"
import type {organizationType} from "src/consts/flowTypes/organization/organization"

// flow type of OrganizationInfoView
type PropsOrganizationInfoView = {
  showEdit: Function,
  organization: organizationType,
  translate: { [string]: string }
}

const BiographyView = (props: PropsOrganizationInfoView) => {
  const {organization, showEdit, translate} = props

  return (
      <div>
        <ItemHeader title={translate['Organization biography']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={organization.biography}/>
        </Field>
      </div>
  )
}

BiographyView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default BiographyView