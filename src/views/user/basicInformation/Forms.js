// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {ArrayInput} from "src/views/common/inputs/ArrayInput"
import {CustomArrayInput} from "src/views/common/inputs/CustomArrayInput"
import {CustomInput} from "src/views/common/inputs/CustomInput"
import {DateInput} from "src/views/common/inputs/DateInput"
import {EmailInput} from "src/views/common/inputs/EmailInput"
import {IntInput} from "src/views/common/inputs/IntInput"
import {outputComponent} from "src/views/common/OutputComponent"
import {PhoneInput} from "src/views/common/inputs/PhoneInput"
import {TextareaInput} from "src/views/common/inputs/TextareaInput"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateEducation} from "src/crud/user/education"
import {updateProfile} from "src/crud/user/profile"
import {updateResearch} from "src/crud/user/research"
import {updateUser} from "src/crud/user/user"
import {
  userType,
  userProfileType,
  userEducationType,
  userResearchType
} from "src/consts/flowTypes/user/basicInformation"


// flow type of UserInfoForm
type PropsUserInfoForm = {
  onSubmit: Function,
  user: ?userType,
  children?: React.Element<'div'>,
  translate: { [string]: string }
}
// flow type of UserInfoEditForm
type PropsUserInfoEditForm = {
  hideEdit: Function,
  updateStateForView: Function,
  user: userType,
  translate: { [string]: string }
}
type StateUserInfoEditForm = {
  confirm: boolean
}

export class UserInfoForm extends Component<PropsUserInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  usernameInput: React.ElementRef<typeof TextInput>
  firstNameInput: React.ElementRef<typeof TextInput>
  lastNameInput: React.ElementRef<typeof TextInput>
  emailInput: React.ElementRef<typeof EmailInput>

  _getValues = (): {} => {
    return {
      username: this.usernameInput.getValue(),
      first_name: this.firstNameInput.getValue(),
      last_name: this.lastNameInput.getValue(),
      email: this.emailInput.getValue()
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates: (string | boolean)[] = [
      this.usernameInput.validate(),
      this.firstNameInput.validate(),
      this.lastNameInput.validate(),
      this.emailInput.validate()
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  render() {
    const {translate} = this.props
    const user = this.props.user || {}
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <TextInput
            name="username"
            label={translate['Username'] + ": "}
            value={user.username}
            ref={usernameInput => {
              this.usernameInput = usernameInput
            }}
          />
          <TextInput
            name="firstName"
            label={translate['First name'] + ": "}
            value={user.first_name}
            ref={firstNameInput => {
              this.firstNameInput = firstNameInput
            }}
          />
          <TextInput
            name="lastName"
            label={translate['Last name'] + ": "}
            value={user.last_name}
            ref={lastNameInput => {
              this.lastNameInput = lastNameInput
            }}
          />
          {/*TODO EMAIL INPUT*/}
          <EmailInput
            label={translate['Email'] + ": "}
            value={user.email}
            ref={emailInput => {
              this.emailInput = emailInput
            }}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}

export class UserInfoEditForm extends Component<PropsUserInfoEditForm, StateUserInfoEditForm> {
  constructor(props: PropsUserInfoEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof UserInfoForm>

  _save = (updateStateForView: Function, hideEdit: Function): void => {
    const userId:number = this.props.user.id
    if (this.form) {
      const formValues:{} = this.form._getValues()
      updateUser(formValues, userId, updateStateForView, hideEdit)
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    const {updateStateForView, hideEdit} = this.props
    e.preventDefault()
    if (this.form && this.form._formValidate()) {
      this._save(updateStateForView, hideEdit)
    }
    return false
  }

  render() {
    const {user, translate} = this.props
    return (
      <UserInfoForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }} user={user} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </UserInfoForm>
    )
  }
}


// ProfileInfoForm flow type
type PropsProfileInfoForm = {
  onSubmit: Function,
  profile: ?userProfileType,
  children?: React.Element<'div'>,
  translate: { [string]: string }
}
// ProfileInfoEditForm flow type
type PropsProfileInfoEditForm = {
  hideEdit: Function,
  updateStateForView: Function,
  profile: userProfileType,
  translate: { [string]: string }
}
type StateProfileInfoEditForm = {
  confirm: boolean
}

export class ProfileInfoForm extends Component<PropsProfileInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    profile: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  birthDateInput: React.ElementRef<typeof DateInput>
  nationalCodeInput: React.ElementRef<typeof TextInput>
  mobileInput: React.ElementRef<typeof CustomArrayInput>
  phoneInput: React.ElementRef<typeof CustomArrayInput>
  faxInput: React.ElementRef<typeof CustomInput>
  publicEmailInput: React.ElementRef<typeof EmailInput>
  webSiteInput: React.ElementRef<typeof ArrayInput>
  telegramAccountInput: React.ElementRef<typeof TextInput>
  descriptionInput: React.ElementRef<typeof TextareaInput>

  _getValues = (): {} => {
    return {
      birth_date: this.birthDateInput.getValue(),
      national_code: this.nationalCodeInput.getValue(),
      mobile: this.mobileInput.getValue(),
      phone: this.phoneInput.getValue(),
      fax: this.faxInput.getValue(),
      public_email: this.publicEmailInput.getValue(),
      telegram_account: this.telegramAccountInput.getValue(),
      web_site: this.webSiteInput.getValue(),
      description: this.descriptionInput.getValue(),
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates: Array<boolean | string> = [
      this.birthDateInput.validate(),
      this.nationalCodeInput.validate(),
      this.mobileInput.validate(),
      this.phoneInput.validate(),
      this.faxInput.validate(),
      this.publicEmailInput.validate(),
      this.telegramAccountInput.validate(),
      this.webSiteInput.validate(),
      this.descriptionInput.validate(),
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  _nationalCodeValidate = (value: string, final: boolean): boolean | string => {
    if (final && value && !/^\d{10}$/.test(value)) {
      return this.props.translate[('National code must be 10 digit ')]
    } else {
      return false
    }
  }

  render() {
    const {translate} = this.props
    const profile = this.props.profile || {}
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <DateInput
            name="birthDate"
            label={translate['BirthDate'] + ": "}
            value={profile.birth_date}
            ref={birthDateInput => {
              this.birthDateInput = birthDateInput
            }}
            showDay={true}
          />
          <TextInput
            name="nationalCode"
            label={translate['National code'] + ": "}
            value={profile.national_code}
            ref={nationalCodeInput => {
              this.nationalCodeInput = nationalCodeInput
            }}
            customValidate={this._nationalCodeValidate}
          />
          <CustomArrayInput
            label={translate['Mobile'] + ": "}
            value={profile.mobile}
            ref={mobileInput => {
              this.mobileInput = mobileInput
            }}
            inputComponent={PhoneInput}
            outputComponent={outputComponent}
          />
          <CustomArrayInput
            label={translate['Phone'] + ": "}
            value={profile.phone}
            ref={phoneInput => {
              this.phoneInput = phoneInput
            }}
            inputComponent={PhoneInput}
            outputComponent={outputComponent}
          />
          <CustomInput
            label={translate['Fax'] + ": "}
            value={profile.fax}
            ref={faxInput => {
              this.faxInput = faxInput
            }}
            inputComponent={PhoneInput}
          />
          {/*TODO EMAIL INPUT*/}
          <EmailInput
            label={translate['Public email'] + ": "}
            value={profile.public_email}
            ref={publicEmailInput => {
              this.publicEmailInput = publicEmailInput
            }}
          />
          {/*TODO TELEGRAM INPUT*/}
          <TextInput
            name="telegramAccount"
            label={translate['Telegram account'] + ": "}
            value={profile.telegram_account}
            ref={telegramAccountInput => {
              this.telegramAccountInput = telegramAccountInput
            }}
          />
          {/*TODO WEB INPUT*/}
          <ArrayInput
            name="webSite"
            label={translate['Website'] + ": "}
            placeholder={translate['www...']}
            value={profile.web_site}
            ref={webSiteInput => {
              this.webSiteInput = webSiteInput
            }}
          />
          <TextareaInput
            name="description"
            label={translate['Description'] + ": "}
            value={profile.description}
            ref={descriptionInput => {
              this.descriptionInput = descriptionInput
            }}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}

export class ProfileInfoEditForm extends Component<PropsProfileInfoEditForm, StateProfileInfoEditForm> {
  state = {confirm: false}

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof ProfileInfoForm>

  _save = (updateStateForView: Function, hideEdit: Function): void => {
    const profileId: number = +this.props.profile.id
    if (this.form) {
      const formValues: {} = this.form._getValues()
      updateProfile(formValues, profileId, updateStateForView, hideEdit)
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    e.preventDefault()
    const {updateStateForView, hideEdit} = this.props
    if (this.form && this.form._formValidate()) {
      this._save(updateStateForView, hideEdit)
    }
    return false
  }

  render() {
    const {profile, translate} = this.props
    return (
      <ProfileInfoForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }} profile={profile} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </ProfileInfoForm>
    )
  }
}


// flow type of EducationInfoForm
type PropsEducationInfoForm = {
  onSubmit: Function,
  education: ?userEducationType,
  children?: React.Element<'div'>,
  translate: { [string]: string }
}
// flow type of EducationInfoEditForm
type PropsEducationInfoEditForm = {
  hideEdit: Function,
  updateStateForView: Function,
  education: userEducationType,
  translate: { [string]: string }
}
type StateEducationInfoEditForm = {
  confirm: boolean
}

export class EducationInfoForm extends Component<PropsEducationInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    education: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  universityInput: React.ElementRef<typeof TextInput>
  gradeInput: React.ElementRef<typeof TextInput>
  fieldInput: React.ElementRef<typeof TextInput>
  fromDateInput: React.ElementRef<typeof DateInput>
  toDateInput: React.ElementRef<typeof DateInput>

  _getValues = (): {} => {
    return {
      university: this.universityInput.getValue(),
      grade: this.gradeInput.getValue(),
      field_of_study: this.fieldInput.getValue(),
      from_date: this.fromDateInput.getValue(),
      to_date: this.toDateInput.getValue()
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates: (string | boolean)[] = [
      this.universityInput.validate(),
      this.gradeInput.validate(),
      this.fieldInput.validate(),
      this.fromDateInput.validate(),
      this.toDateInput.validate(),
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  render() {
    const {translate} = this.props
    const education = this.props.education || {}
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <TextInput
            name="university"
            label={translate['University'] + ": "}
            value={education.university}
            ref={universityInput => {
              this.universityInput = universityInput
            }}
          />
          <TextInput
            name="grade"
            label={translate['Grade']}
            value={education.grade}
            ref={gradeInput => {
              this.gradeInput = gradeInput
            }}
          />
          <TextInput
            name="fieldOfStudy"
            label={translate['Field Of Study'] + ": "}
            value={education.field_of_study}
            ref={fieldInput => {
              this.fieldInput = fieldInput
            }}
          />
          {/*TODO EMAIL INPUT*/}
          <DateInput
            name="FromDateEducationInfoForm"
            label={translate['FromDate'] + ": "}
            value={education.from_date}
            ref={fromDateInput => {
              this.fromDateInput = fromDateInput
            }}
          />
          <DateInput
            name="ToDateEducationInfoForm"
            label={translate['ToDate'] + ": "}
            value={education.to_date}
            ref={toDateInput => {
              this.toDateInput = toDateInput
            }}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}

export class EducationInfoEditForm extends Component<PropsEducationInfoEditForm, StateEducationInfoEditForm> {
  state = {confirm: false}

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof EducationInfoForm>

  _save = (updateStateForView: Function, hideEdit: Function): void => {
    const educationId:number = this.props.education.id
    if (this.form) {
      const formValues:{} = this.form._getValues()
      updateEducation(educationId, formValues, hideEdit, (res) => {updateStateForView(res, educationId, false, false)})
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    e.preventDefault()
    const {updateStateForView, hideEdit} = this.props
    if (this.form && this.form._formValidate()) {
      this._save(updateStateForView, hideEdit)
    }
    return false
  }

  render() {
    const {education, translate} = this.props
    return (
      <EducationInfoForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }} education={education} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </EducationInfoForm>
    )
  }
}


// flow type of ResearchInfoForm
type  PropsResearchInfoForm = {
  onSubmit: Function,
  research: ?userResearchType,
  children?: React.Element<'div'>,
  translate: { [string]: string }
}
// flow type of ResearchInfoEditForm
type PropsResearchInfoEditForm = {
  hideEdit: Function,
  updateStateForView: Function,
  research: userResearchType,
  translate: { [string]: string }
}
type StateResearchInfoEditForm = {
  confirm: boolean
}

export class ResearchInfoForm extends Component<PropsResearchInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    research: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  titleInput: React.ElementRef<typeof TextInput>
  authorInput: React.ElementRef<typeof TextInput>
  yearInput: React.ElementRef<typeof DateInput>
  publicationInput: React.ElementRef<typeof TextInput>
  pageCountInput: React.ElementRef<typeof IntInput>

  _getValues = (): {} => {
    return {
      title: this.titleInput.getValue(),
      author: this.authorInput.getValue(),
      year: this.yearInput.getValue(),
      publication: this.publicationInput.getValue(),
      page_count: this.pageCountInput.getValue()
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates: (string | boolean)[] = [
      this.titleInput.validate(),
      this.authorInput.validate(),
      this.yearInput.validate(),
      this.pageCountInput.validate()
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  render() {
    const {translate} = this.props
    const research = this.props.research || {}
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <TextInput
            name="title"
            label={translate['Title'] + ": "}
            value={research.title}
            ref={titleInput => {
              this.titleInput = titleInput
            }}
          />
          <TextInput
            name="author"
            label={translate['Author']}
            value={research.author}
            ref={authorInput => {
              this.authorInput = authorInput
            }}
          />
          <TextInput
            name="publication"
            label={translate['Publication'] + ": "}
            value={research.publication}
            ref={publicationInput => {
              this.publicationInput = publicationInput
            }}
          />
          <DateInput
            name="Year"
            label={translate['Year'] + ": "}
            value={research.year}
            ref={yearInput => {
              this.yearInput = yearInput
            }}
          />
          <IntInput
            name="PageCount"
            label={translate['Page Count'] + ": "}
            value={research.page_count}
            ref={pageCountInput => {
              this.pageCountInput = pageCountInput
            }}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}

export class ResearchInfoEditForm extends Component<PropsResearchInfoEditForm, StateResearchInfoEditForm> {
  state = {confirm: false}

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    research: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof ResearchInfoForm>

  _save = (updateStateForView: Function, hideEdit: Function): void => {
    const researchId:number = this.props.research.id
    if (this.form) {
      const formValues:{} = this.form._getValues()
      updateResearch(researchId, formValues, hideEdit, (res: {}): void => {
        updateStateForView(res, researchId, false, false)})
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    e.preventDefault()
    const {updateStateForView, hideEdit} = this.props
    if (this.form && this.form._formValidate()) {
      this._save(updateStateForView, hideEdit)
    }
    return false
  }

  render() {
    const {research, translate} = this.props
    return (
      <ResearchInfoForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }} research={research} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </ResearchInfoForm>
    )
  }
}


