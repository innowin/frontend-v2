// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {list_of_badge} from "../../common/Functions"
import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"

// flow type of ContactInfoView
type PropsContactInfoView = {
  showEdit: Function,
  profile: userProfileType,
  translate: { [string]: string }
}

type listOfBadge = (?React.Element<'span'>)[]

const ContactInfoView = (props: PropsContactInfoView) => {
  const {showEdit, translate, profile} = props
  const listMobile: listOfBadge = list_of_badge(profile.mobile)
  const listPhone: listOfBadge = list_of_badge(profile.phone)
  const listWebSite: listOfBadge = list_of_badge(profile.web_site)
  return (
      <div>
        <ItemHeader title={translate['Contact info']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Address'] + ": "}/>
          <FieldValue value={profile.address}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Phone'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{listPhone}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Mobile'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{listMobile}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Website'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{listWebSite}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Public email'] + ": "}/>
          <FieldValue value={profile.public_email}/>
        </Field>


        {/*<Field>*/}
        {/*<FieldLabel label={translate['Fax'] + ": "}/>*/}
        {/*<FieldValue value={<span className="d-inline-block dir-rtl">{profile.fax}</span>}/>*/}
        {/*</Field>*/}
        {/*<Field>*/}
        {/*<FieldLabel label={translate['Telegram account'] + ": "}/>*/}
        {/*<FieldValue value={<span className="d-inline-block dir-rtl">{profile.telegram_account}</span>}/>*/}
        {/*</Field>*/}
        {/*<Field>*/}
        {/*<FieldLabel label={translate['Description'] + ": "}/>*/}
        {/*<FieldValue value={profile.description}/>*/}
        {/*</Field>*/}
      </div>
  )
}
ContactInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default ContactInfoView