// @flow

import * as React from "react"
import PropTypes from "prop-types"
import userInfoIcon from "../../../images/user/userinfo_svg"
import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import {JalaliWithFarsiMonth} from "../../common/JalaliWithFarsiMonth"
import {UserInfoItemWrapper} from "./Views"
import type {userType} from "src/consts/flowTypes/user/basicInformation"

// flow type of UserInfoView
type PropsUserInfoView = {
  showEdit: Function,
  user: userType,
  translate: { [string]: string }
}

export const UserInfoView = (props: PropsUserInfoView) => {
  const {user, showEdit, translate} = props

  return (
      <UserInfoItemWrapper icon={userInfoIcon}>
        <ItemHeader title={translate['User info']} showEdit={showEdit}/>
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
          <FieldLabel label={translate['Email'] + ": "}/>
          <FieldValue value={user.email}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Date joined'] + ": "}/>
          <FieldValue value={JalaliWithFarsiMonth(user.date_joined)}/>
        </Field>
      </UserInfoItemWrapper>
  )
}

UserInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}