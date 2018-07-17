// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {JalaliWithFarsiMonth} from "../../common/JalaliWithFarsiMonth"
import {list_of_badge} from "../../common/Functions"
import {userInfoIcon, researchIcon, educationIcon} from "src/images/icons"
import {
  Field,
  FieldLabel,
  FieldValue,
  ItemHeader,
  ItemWrapper,
} from "../../common/cards/Frames"
import type {
  userType,
  userProfileType,
  userEducationType,
  userResearchType
} from "src/consts/flowTypes/user/basicInformation"


type PropsUserInfoItemWrapper = {
  icon: React.Element<any>,
  children?: React.Node
}
export const UserInfoItemWrapper = (props: PropsUserInfoItemWrapper) => {
  return (
    <ItemWrapper icon={props.icon}>{props.children}</ItemWrapper>
  )
}
UserInfoItemWrapper.propTypes = {
  icon: PropTypes.element.isRequired
}


// flow type of UserInfoView
type PropsUserInfoView = {
  showEdit: Function,
  user: userType,
  translate: { [string]: string }
}

export class UserInfoView extends Component<PropsUserInfoView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  render() {
    const {user, showEdit, translate} = this.props
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
}


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
    const {showEdit, translate} = this.props
    const profile = this.props.profile
    const listMobile: listOfBadge = list_of_badge(profile.mobile)
    const listPhone: listOfBadge = list_of_badge(profile.phone)
    const listWebSite: listOfBadge = list_of_badge(profile.web_site)
    return (
      <UserInfoItemWrapper icon={userInfoIcon}>
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
      </UserInfoItemWrapper>
    )
  }
}


// flow type of EducationInfoView
type PropsEducationInfoView = {
  showEdit: Function,
  education: userEducationType,
  translate: { [string]: string }
}

export class EducationInfoView extends Component<PropsEducationInfoView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  render() {
    const {education, showEdit, translate} = this.props
    return (
      <UserInfoItemWrapper icon={educationIcon}>
        <ItemHeader title={translate['EducationInfo']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['University'] + ": "}/>
          <FieldValue value={education.university}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Grade'] + ": "}/>
          <FieldValue value={education.grade}/>
        </Field>
        <Field>
          <FieldLabel label={translate['FromDate'] + ": "}/>
          <FieldValue value={education.from_date}/>
        </Field>
        <Field>
          <FieldLabel label={translate['ToDate'] + ": "}/>
          <FieldValue value={education.to_date}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Average'] + ": "}/>
          <FieldValue value={education.average}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Description'] + ": "}/>
          <FieldValue value={education.description}/>
        </Field>
      </UserInfoItemWrapper>
    )
  }
}


// flow type of ResearchInfoView
type PropsResearchInfoView = {
  showEdit: Function,
  research: userResearchType,
  translate: { [string]: string }
}

export class ResearchInfoView extends Component<PropsResearchInfoView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    research: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  render() {
    const {research, showEdit, translate} = this.props
    const listAuthor: listOfBadge = list_of_badge(research.author)
    return (
      <UserInfoItemWrapper icon={researchIcon}>
        <ItemHeader title={translate['ResearchInfo']} showEdit={showEdit}/>
        <Field>
          <FieldLabel label={translate['Title'] + ": "}/>
          <FieldValue value={research.title}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Author'] + ": "}/>
          <FieldValue value={<span className="dir-rtl">{listAuthor}</span>}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Publication'] + ": "}/>
          <FieldValue value={research.publication}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Year'] + ": "}/>
          <FieldValue value={research.year}/>
        </Field>
        <Field>
          <FieldLabel label={translate['Page Count'] + ": "}/>
          <FieldValue value={research.page_count}/>
        </Field>
      </UserInfoItemWrapper>
    )
  }
}