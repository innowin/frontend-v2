// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Component} from "react"

import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import {ArrayInput} from "src/views/common/inputs/ArrayInput"
import {CustomArrayInput} from "src/views/common/inputs/CustomArrayInput"
import {CustomInput} from "src/views/common/inputs/CustomInput"
import {ReduxFormDateInput} from 'src/views/common/inputs/reduxFormDateInput'
import {Field, reduxForm} from "redux-form";
import {outputComponent} from "src/views/common/OutputComponent"
import {PhoneInput} from "src/views/common/inputs/PhoneInput"
import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"
import contactInfoValidation from "../../../helpers/validations/contactInfoBasicInformation"

type ContactInfoFormInputType = {
  day: string,
  year: string,
  month: string,
  nationalCode: string,
  publicEmail: string,
  telegramAccount: string,
  description: string,
  address: string,
}

// ContactInfoEditForm flow type
type PropsContactInfoEditForm = {
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

class ContactInfoEditForm extends Component<PropsContactInfoEditForm> {
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
    const defaultFormValue = {
      address: profile.address,
      mobile: profile.mobile,
      phone: profile.phone,
      publicEmail: profile.public_email,
      webSite: profile.web_site,
      // fax: profile.fax,
      // telegramAccount: profile.telegram_account,
      // description: profile.description,
    }
    initialize(defaultFormValue);
  }

  _onSubmit = (values: ContactInfoFormInputType): boolean | void => {
    // profile equals to initial value
    const {actions, userId, profile} = this.props

    const {updateProfileByProfileId} = actions
    const profileId: number = profile.id
    const mobile = this.mobileInput.getValue()

    const phone = this.phoneInput.getValue()
    const web_site = this.webSiteInput.getValue()
    // const fax = this.faxInput.getValue()

    const formFormat = {
      address: profile.address === values.address ? null : values.address,
      mobile: profile.mobile === mobile ? null : mobile,
      phone: profile.phone === phone ? null : phone,
      public_email: profile.public_email === values.publicEmail ? null : values.publicEmail,
      web_site: profile.web_site === web_site ? null : web_site,
      // fax: profile.fax === fax ? null : fax,
      // telegram_account: profile.telegram_account === values.telegramAccount ? null : values.telegramAccount,
      // description: profile.description === values.description ? null : values.description,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })
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
          <div className='form-group'>
            <label>
              {translate['Address'] + ": "}
            </label>
            <Field
                name="address"
                type="text"
                component={renderTextField}
                label={translate['Address']}
                textFieldClass='form-control'
            />
          </div>
          <ReduxFormDateInput translate={translate} labelName={translate['BirthDate']} dayName='day' monthName='month' yearName='year'/>
          <CustomArrayInput
              label={translate['Phone'] + ": "}
              value={profile.phone}
              inputComponent={PhoneInput}
              outputComponent={outputComponent}
              ref={phoneInput => {
                this.phoneInput = phoneInput
              }}
          />
          <CustomArrayInput
              label={translate['Mobile'] + ": "}
              value={profile.mobile}
              inputComponent={PhoneInput}
              outputComponent={outputComponent}
              ref={mobileInput => {
                this.mobileInput = mobileInput
              }}
          />
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
          <div className='form-group'>
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



          {/*<CustomInput*/}
              {/*label={translate['Fax'] + ": "}*/}
              {/*value={profile.fax}*/}
              {/*ref={faxInput => {*/}
                {/*this.faxInput = faxInput*/}
              {/*}}*/}
              {/*inputComponent={PhoneInput}*/}
          {/*/>*/}
          {/*<div className='form-group'>*/}
            {/*<label>*/}
              {/*{translate['Telegram account'] + ": "}*/}
            {/*</label>*/}
            {/*<Field*/}
                {/*name="telegramAccount"*/}
                {/*type="text"*/}
                {/*component={renderTextField}*/}
                {/*label={translate['Telegram account']}*/}
                {/*textFieldClass='form-control'*/}
            {/*/>*/}
          {/*</div>*/}
          {/*<div className='form-group'>*/}
            {/*<label>*/}
              {/*{translate['Description'] + ": "}*/}
            {/*</label>*/}
            {/*<Field*/}
                {/*name="description"*/}
                {/*type="text"*/}
                {/*component={renderTextArea}*/}
                {/*label={translate['Description']}*/}
                {/*textFieldClass='form-control'*/}
            {/*/>*/}
          {/*</div>*/}

          {submitFailed && <p className="error-message">{error}</p>}

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
              {translate['Cancel']}
            </button>
            <button type="submit" className="btn btn-success">{translate['Save']}</button>
          </div>
        </form>
    )
  }
}

ContactInfoEditForm = reduxForm({
  form: 'contactInfoEditForm',
  validate: contactInfoValidation,
})(ContactInfoEditForm)

export {ContactInfoEditForm}