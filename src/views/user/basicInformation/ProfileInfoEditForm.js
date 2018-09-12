// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Component} from "react"

import renderTextArea from "../../common/inputs/reduxFormRenderTextArea";
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import {ArrayInput} from "src/views/common/inputs/ArrayInput"
import {CustomArrayInput} from "src/views/common/inputs/CustomArrayInput"
import {CustomInput} from "src/views/common/inputs/CustomInput"
import {Field, reduxForm} from "redux-form";
import {outputComponent} from "src/views/common/OutputComponent"
import {PhoneInput} from "src/views/common/inputs/PhoneInput"
import type {
  userProfileType,
} from "src/consts/flowTypes/user/basicInformation"
import profileInfoValidation from "../../../helpers/validations/profileInfoBasicInformation"

type ProfileInfoFormInputType = {
  day: string,
  year: string,
  month: string,
  nationalCode: string,
  publicEmail: string,
  telegramAccount: string,
  description: string,
}

// ProfileInfoEditForm flow type
type PropsProfileInfoEditForm = {
  hideEdit: Function,
  profile: userProfileType,
  translate: { [string]: string },
  handleSubmit: Function,
  initialize: Function,
  actions: {
    updateProfileByProfileId: Function,
  },
  userId: number,
  submitFailed: string,
  error: string,
}

class ProfileInfoEditForm extends Component<PropsProfileInfoEditForm> {
  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    submitFailed: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }
  mobileInput: React.ElementRef<typeof CustomArrayInput>
  phoneInput: React.ElementRef<typeof CustomArrayInput>
  faxInput: React.ElementRef<typeof CustomInput>
  webSiteInput: React.ElementRef<typeof ArrayInput>

  componentDidMount() {
    const {initialize, profile} = this.props
    const birthDateSplit = profile.birth_date === null ? [''] : profile.birth_date.split('/')
    const defaultFormValue = {
      nationalCode: profile.national_code,
      mobile: profile.mobile,
      phone: profile.phone,
      fax: profile.fax,
      publicEmail: profile.public_email,
      telegramAccount: profile.telegram_account,
      webSite: profile.web_site,
      description: profile.description,
      year: birthDateSplit[0],
      month: birthDateSplit[1] === undefined ? '' : birthDateSplit[1],
      day: birthDateSplit[2] === undefined ? '' : birthDateSplit[2],
    }
    initialize(defaultFormValue);
  }

  _onSubmit = (values: ProfileInfoFormInputType): boolean | void => {
    // profile equals to initial value
    const {actions, userId, profile} = this.props

    const {updateProfileByProfileId} = actions
    const profileId: number = profile.id
    const mobile = this.mobileInput.getValue()

    const phone = this.phoneInput.getValue()
    const fax = this.faxInput.getValue()
    const web_site = this.webSiteInput.getValue()
    const birth_date = values.year === '' || values.month === '' || values.day === '' ? '' : `${values.year}/${values.month}/${values.day}`

    const formFormat = {
      public_email: profile.public_email === values.publicEmail ? null : values.publicEmail,
      national_code: profile.national_code === values.nationalCode ? null : values.nationalCode,
      mobile: profile.mobile === mobile ? null : mobile,
      phone: profile.phone === phone ? null : phone,
      web_site: profile.web_site === web_site ? null : web_site,
      fax: profile.fax === fax ? null : fax,
      telegram_account: profile.telegram_account === values.telegramAccount ? null : values.telegramAccount,
      description: profile.description === values.description ? null : values.description,
      birth_date: profile.birth_date === birth_date ? null : birth_date,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })
    // TODO: mohammad validation form and errors
    // TODO: mohammad mobile, phone, web_site not send to server(array forms)
    // they are array forms and must change the send format

    const formValues: {} = {...formFormat}
    updateProfileByProfileId(formValues, profileId, userId)
    this.props.hideEdit()
    return false
  }

  render() {
    const {translate, handleSubmit, profile, submitFailed, error} = this.props
    return (
        <form onSubmit={handleSubmit(this._onSubmit)}>
          <div className="row">
            <div className='user-basic-information-date-container'>
              <label>
                {translate['BirthDate'] + ": "}
              </label>
              <div className='date-container'>
                <Field
                    name="day"
                    type="text"
                    className='date-part-container'
                    component={renderTextField}
                    label={translate['Day']}
                    textFieldClass='form-control'
                />
                <Field
                    name="month"
                    type="text"
                    className='date-part-container'
                    component={renderTextField}
                    label={translate['Month']}
                    textFieldClass='form-control'
                />
                <Field
                    name="year"
                    type="text"
                    className='date-part-container'
                    component={renderTextField}
                    label={translate['Year']}
                    textFieldClass='form-control'
                />
              </div>
            </div>
            <div className='col-12 form-group'>
              <label>
                {translate['National code'] + ": "}
              </label>
              <Field
                  name="nationalCode"
                  type="text"
                  component={renderTextField}
                  label={translate['Username']}
                  textFieldClass='form-control'
              />
            </div>
            <CustomArrayInput
                label={translate['Mobile'] + ": "}
                value={profile.mobile}
                inputComponent={PhoneInput}
                outputComponent={outputComponent}
                ref={mobileInput => {
                  this.mobileInput = mobileInput
                }}
            />
            <CustomArrayInput
                label={translate['Phone'] + ": "}
                value={profile.phone}
                inputComponent={PhoneInput}
                outputComponent={outputComponent}
                ref={phoneInput => {
                  this.phoneInput = phoneInput
                }}
            />
            <CustomInput
                label={translate['Fax'] + ": "}
                value={profile.fax}
                ref={faxInput => {
                  this.faxInput = faxInput
                }}
                inputComponent={PhoneInput}
            />
            <div className='col-12 form-group'>
              <label>
                {translate['Public email'] + ": "}
              </label>
              <Field
                  name="publicEmail"
                  type="email"
                  component={renderTextField}
                  label={translate['Public email']}
                  textFieldClass='form-control'
              />
            </div>
            <div className='col-12 form-group'>
              <label>
                {translate['Telegram account'] + ": "}
              </label>
              <Field
                  name="telegramAccount"
                  type="text"
                  component={renderTextField}
                  label={translate['Telegram account']}
                  textFieldClass='form-control'
              />
            </div>
            {/*TODO WEB INPUT*/}
            <ArrayInput
                name="webSite"
                label={translate['Website'] + ": "}
                placeholder={translate['Web Site Format']}
                value={profile.web_site}
                ref={webSiteInput => {
                  this.webSiteInput = webSiteInput
                }}
            />
            <div className='col-12 form-group'>
              <label>
                {translate['Description'] + ": "}
              </label>
              <Field
                  name="description"
                  type="text"
                  component={renderTextArea}
                  label={translate['Description']}
                  textFieldClass='form-control'
              />
            </div>

            {submitFailed && <p className="error-message">{error}</p>}


            <div className="col-12 d-flex justify-content-end">
              <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
                {translate['Cancel']}
              </button>
              <button type="submit" className="btn btn-success">{translate['Save']}</button>
            </div>
          </div>
        </form>
    )
  }
}

ProfileInfoEditForm = reduxForm({
  form: 'profileInfoEditForm',
  validate: profileInfoValidation,
})(ProfileInfoEditForm)

export {ProfileInfoEditForm}