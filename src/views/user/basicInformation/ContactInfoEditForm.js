// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Component} from "react"

import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import {Field, reduxForm} from "redux-form";
import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"
import contactInfoValidation from "../../../helpers/validations/contactInfoBasicInformation"
import {ItemHeader} from "../../common/cards/Frames";
import EditFormButtons from "../../common/components/EditFormButtons";

type ContactInfoFormInputType = {
  day: string,
  year: string,
  month: string,
  nationalCode: string,
  publicEmail: string,
  telegramAccount: string,
  description: string,
  address: string,
  mobile: string,
  phone: string,
  webSite: string,
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

  componentDidMount() {
    const {initialize, profile} = this.props
    const defaultFormValue = {
      address: profile.address,
      mobile: profile.mobile,
      phone: profile.phone,
      publicEmail: profile.public_email,
      webSite: profile.web_site,
    }
    initialize(defaultFormValue);
  }

  _onSubmit = (values: ContactInfoFormInputType): boolean | void => {
    // profile equals to initial value
    const {actions, userId, profile} = this.props

    const {updateProfileByProfileId} = actions
    const profileId: number = profile.id

    const formFormat = {
      address: profile.address === values.address ? null : values.address,
      mobile: profile.mobile === values.mobile ? null : values.mobile,
      phone: profile.phone === values.phone ? null : values.phone,
      public_email: profile.public_email === values.publicEmail ? null : values.publicEmail,
      web_site: profile.web_site === values.webSite ? null : values.webSite,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === null ? delete (formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    updateProfileByProfileId({formValues, profileId, userId})
    this.props.hideEdit()
    return false
  }

  render() {
    const {translate, handleSubmit, submitFailed, error, hideEdit} = this.props
    return (
        <React.Fragment>
          <ItemHeader title={translate['Contact info']} editText={translate['Editing']}/>
          <form onSubmit={handleSubmit(this._onSubmit)}>
            <Field
                name="address"
                type="text"
                component={renderTextField}
                label={translate['Address']}
                isNew={true}
                tipText={translate['This address is for public view']}
            />
            <Field
                name="mobile"
                type="text"
                component={renderTextField}
                label={translate['Mobile']}
                isNew={true}
                ltr={true}
                tipText={translate['This number is for public view']}
            />
            <Field
                name="phone"
                type="text"
                component={renderTextField}
                label={translate['Phone']}
                isNew={true}
                ltr={true}
                tipText={translate['This number is for public view']}
            />
            <Field
                name="webSite"
                type="text"
                component={renderTextField}
                label={translate['Website']}
                isNew={true}
                ltr={true}
            />
            <Field
                name="publicEmail"
                type="email"
                component={renderTextField}
                label={translate['Public email']}
                isNew={true}
                ltr={true}
                tipText={translate['This email is for public view']}
            />

            {submitFailed && <p className="error-message">{error}</p>}

            <EditFormButtons onCancelClick={hideEdit} translate={translate}/>

          </form>
        </React.Fragment>
    )
  }
}

ContactInfoEditForm = reduxForm({
  form: 'contactInfoEditForm',
  validate: contactInfoValidation,
})(ContactInfoEditForm)

export {ContactInfoEditForm}