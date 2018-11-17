// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {LockSvg} from "src/images/icons"
import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import type {userProfileType, userType} from "src/consts/flowTypes/user/basicInformation"

// flow type of PrivateInfoView
type PropsPrivateInfoView = {
  showEdit: Function,
  profile: userProfileType,
  translate: { [string]: string },
  user: userType,
}

const PrivateInfoView = (props: PropsPrivateInfoView) => {
  const {showEdit, translate, profile, user} = props
  return (
      <div>
        <ItemHeader title={translate['Private info']} showEdit={showEdit}/>
        <LockSvg className='user-lock-private'/>
        <Field>
          <FieldLabel label={translate['National code'] + ": "}/>
          <FieldValue value={profile.national_code}/>
        </Field>
        <Field>
          <FieldLabel label={translate['BirthDate'] + ": "}/>
          <FieldValue value={profile.birth_date}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Email'] + ": "}/>
          <FieldValue value={user.email}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Phone'] + ": "}/>
          <FieldValue value={user.auth_mobile}/>
        </Field>
      </div>
  )
}

PrivateInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default PrivateInfoView