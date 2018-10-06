// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form"

import organizationInfoValidation from 'src/helpers/validations/organizationInfoPrivateInformation'
import type {organizationType} from "src/consts/flowTypes/organization/organization"
import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"

// flow type of OrganizationInfoEditForm
type PropsOrganizationInfoEditForm = {|
  hideEdit: Function,
  organization: organizationType,
  translate: { [string]: string },
  actions: {|
    updateOrganizationByOrganizationId: Function,
  |},
  initialize: Function,
  handleSubmit: Function,
  submitFailed: string,
  error: string,
|}

type OrganizationInfoFormInputType = {|
  officialName: string,
  nationalCode: string,
  establishedYear: string,
  registrationAdsUrl: string,
  staffCount: number,
  email: string,
|}

class PrivateInfoEditForm extends React.Component<PropsOrganizationInfoEditForm> {
  componentDidMount() {
    const {organization, initialize} = this.props
    const defaultFormValue = {
      officialName: organization.official_name,
      nationalCode: organization.national_code,
      establishedYear: organization.established_year,
      registrationAdsUrl: organization.registration_ads_url,
      staffCount: organization.staff_count,
      email: organization.email,
    }
    initialize(defaultFormValue);
  }

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    organization: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
  }

  _onSubmit = (values: OrganizationInfoFormInputType): boolean | void => {
    // organization equals to initial value
    const {organization, actions, hideEdit} = this.props
    const {updateOrganizationByOrganizationId} = actions
    const organizationId: number = this.props.organization.id

    const formFormat = {
      official_name: organization.official_name === values.officialName ? null : values.officialName,
      national_code: organization.national_code === values.nationalCode ? null : values.nationalCode,
      established_year: organization.established_year === values.establishedYear ? null : values.establishedYear,
      registration_ads_url: organization.registration_ads_url === values.registrationAdsUrl ? null : values.registrationAdsUrl,
      staff_count: organization.staff_count === values.staffCount ? null : values.staffCount,
      email: organization.email === values.email ? null : values.email,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })
    updateOrganizationByOrganizationId({formValues: formFormat, organizationId})
    hideEdit()
    return false
  }

  render() {
    const {translate, handleSubmit, submitFailed, error} = this.props
    return (
        <form onSubmit={handleSubmit(this._onSubmit)} className=''>
          <div className='form-group'>
            <label>
              {translate['Official name'] + ": "}
            </label>
            <Field
                name="officialName"
                type="text"
                component={renderTextField}
                label={translate['Official name']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['National code'] + ": "}
            </label>
            <Field
                name="nationalCode"
                type="text"
                component={renderTextField}
                label={translate['National code']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Established year'] + ": "}
            </label>
            <Field
                name="establishedYear"
                type="text"
                component={renderTextField}
                label={translate['Established year']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Registration ads url'] + ": "}
            </label>
            <Field
                name="registrationAdsUrl"
                type="text"
                component={renderTextField}
                label={translate['Registration ads url']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Staff count'] + ": "}
            </label>
            <Field
                name="staffCount"
                type="text"
                component={renderTextField}
                label={translate['Staff count']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Email'] + ": "}
            </label>
            <Field
                name="email"
                type="text"
                component={renderTextField}
                label={translate['Email']}
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
        </form>
    )
  }
}

PrivateInfoEditForm = reduxForm({
  form: 'organizationPrivateInfoEditForm',
  validate: organizationInfoValidation,
})(PrivateInfoEditForm)

export default PrivateInfoEditForm