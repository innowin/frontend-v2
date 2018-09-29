// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Component} from "react"

import {list_of_badge} from "../../common/Functions"
import {userInfoIcon} from "src/images/icons"
import {
  Field,
  FieldLabel,
  FieldValue,
  ItemHeader,
} from "../../common/cards/Frames"
import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"
import {ItemWrapper} from "src/views/common/cards/Frames"

// flow type of ProfileInfoView
type PropsProfileInfoView = {
  showEdit: Function,
  profile: userProfileType,
  translate: { [string]: string }
}

type listOfBadge = (?React.Element<'span'>)[]

export class ProfileInfoView extends Component<PropsProfileInfoView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  render() {
    const {showEdit, translate, profile} = this.props
    const listMobile: listOfBadge = list_of_badge(profile.mobile)
    const listPhone: listOfBadge = list_of_badge(profile.phone)
    const listWebSite: listOfBadge = list_of_badge(profile.web_site)
    return (
        <ItemWrapper icon={userInfoIcon}>
          <ItemHeader title={translate['Profile info']} showEdit={showEdit}/>
          <Field>
            <FieldLabel label={translate['BirthDate'] + ": "}/>
            <FieldValue value={profile.birth_date}/>
          </Field>
          <Field>
            <FieldLabel label={translate['National code'] + ": "}/>
            <FieldValue value={profile.national_code}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Mobile'] + ": "}/>
            <FieldValue value={<span className="dir-rtl">{listMobile}</span>}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Phone'] + ": "}/>
            <FieldValue value={<span className="dir-rtl">{listPhone}</span>}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Fax'] + ": "}/>
            <FieldValue value={<span className="d-inline-block dir-rtl">{profile.fax}</span>}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Public email'] + ": "}/>
            <FieldValue value={profile.public_email}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Telegram account'] + ": "}/>
            <FieldValue value={<span className="d-inline-block dir-rtl">{profile.telegram_account}</span>}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Website'] + ": "}/>
            <FieldValue value={<span className="dir-rtl">{listWebSite}</span>}/>
          </Field>
          <Field>
            <FieldLabel label={translate['Description'] + ": "}/>
            <FieldValue value={profile.description}/>
          </Field>
        </ItemWrapper>
    )
  }
}