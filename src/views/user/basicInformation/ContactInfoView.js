// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import {Field, FieldLabel, FieldValue, ItemHeader} from '../../common/cards/Frames'
import type {userProfileType} from 'src/consts/flowTypes/user/basicInformation'

// flow type of ContactInfoView
type PropsContactInfoView = {
  showEdit: Function,
  user: userProfileType,
  translate: { [string]: string }
}

const ContactInfoView = (props: PropsContactInfoView) => {
  const {showEdit, translate, user} = props
  return (
      <div>
        <ItemHeader title={translate['Contact info']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Address'] + ': '}/>
          <FieldValue value={user.address}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Mobile'] + ': '}/>
          <FieldValue value={<span className="dir-rtl">{user.mobile}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Phone'] + ': '}/>
          <FieldValue value={<span className="dir-rtl">{user.phone}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Website'] + ': '}/>
          <FieldValue value={<span className="dir-rtl">{user.web_site}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Public email'] + ': '}/>
          <FieldValue value={user.public_email}/>
        </Field>
      </div>
  )
}
ContactInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
}

export default ContactInfoView