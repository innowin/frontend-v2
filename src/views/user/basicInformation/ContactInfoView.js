// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"

// flow type of ContactInfoView
type PropsContactInfoView = {
  showEdit: Function,
  profile: userProfileType,
  translate: { [string]: string }
}

const ContactInfoView = (props: PropsContactInfoView) => {
  const {showEdit, translate, profile} = props
  return (
      <div>
        <ItemHeader title={translate['Contact info']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Address'] + ": "}/>
          <FieldValue value={profile.address}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Mobile'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{profile.mobile}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Phone'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{profile.phone}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Website'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{profile.web_site}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Public email'] + ": "}/>
          <FieldValue value={profile.public_email}/>
        </Field>
      </div>
  )
}
ContactInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default ContactInfoView