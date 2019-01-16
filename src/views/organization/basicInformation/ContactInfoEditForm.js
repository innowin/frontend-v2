// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form"

import organizationContactInfoValidation from 'src/helpers/validations/organizationContactInformation'
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
  address: string,
  phone: string,
  webSite: string,
  publicEmail: string,
|}

class ContactInfoEditForm extends React.Component<PropsOrganizationInfoEditForm> {
  componentDidMount() {
    const {organization, initialize} = this.props
    const defaultFormValue = {
      address: organization.address,
      phone: organization.phone,
      webSite: organization.web_site,
      publicEmail: organization.public_email,
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
    //FixMe: mohammad address 2, phone 2
    // organization equals to initial value
    const {organization, actions, hideEdit} = this.props
    const {updateOrganizationByOrganizationId} = actions
    const organizationId: number = this.props.organization.id

    const formFormat = {
      address: organization.address === values.address ? null : values.address,
      phone: organization.phone === values.phone ? null : values.phone,
      web_site: organization.web_site === values.webSite ? null : values.webSite,
      public_email: organization.public_email === values.publicEmail ? null : values.publicEmail,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      // formFormat[key] === null ? delete(formFormat[key]) : ''
      // return formFormat
      if (formFormat[key] === null) {
        delete (formFormat[key])
      }
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

          <div className='form-group'>
            <label>
              {translate['Phone'] + ": "}
            </label>
            <Field
                name="phone"
                type="text"
                component={renderTextField}
                label={translate['Phone']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Website'] + ": "}
            </label>
            <Field
                name="webSite"
                type="text"
                component={renderTextField}
                label={translate['Website']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Email'] + ": "}
            </label>
            <Field
                name="publicEmail"
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

ContactInfoEditForm = reduxForm({
  form: 'organizationContactInfoEditForm',
  validate: organizationContactInfoValidation,
})(ContactInfoEditForm)

export default ContactInfoEditForm