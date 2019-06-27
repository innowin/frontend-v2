// @flow

import * as React from "react"
import * as PropTypes from 'prop-types'
import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import {JalaliDateWithDot} from "../../common/JalaliWithFarsiMonth"
import type {userType} from "src/consts/flowTypes/user/basicInformation"

// flow type of UserInfoView
type PropsUserInfoView = {
  showEdit: Function,
  user: userType,
  translate: { [string]: string }
}

const BasicInfoView = (props: PropsUserInfoView) => {
  const {user, showEdit, translate} = props

  return (
      <div>
        <ItemHeader title={translate['Basic Information']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Username'] + ": "}/>
          <FieldValue value={user.username}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Name'] + ": "}/>
          <FieldValue value={user.first_name}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Last name'] + ": "}/>
          <FieldValue value={user.last_name}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Date joined'] + ": "}/>
          <FieldValue value={JalaliDateWithDot(user.date_joined)}/>
        </Field>
      </div>
  )
}

BasicInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default BasicInfoView