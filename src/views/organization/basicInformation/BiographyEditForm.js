// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form"

import organizationBiographyValidation from 'src/helpers/validations/organizationBiography'
import type {organizationType} from "src/consts/flowTypes/organization/organization"
import renderTextArea from "../../common/inputs/reduxFormRenderTextArea";

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
  biography: string,
|}

class BiographyEditForm extends React.Component<PropsOrganizationInfoEditForm> {
  componentDidMount() {
    const {organization, initialize} = this.props
    const defaultFormValue = {
      nikeName: organization.nike_name,
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
      biography: organization.biography === values.biography ? null : values.biography,
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
              {translate['Organization biography'] + ": "}
            </label>
            <Field
                name="biography"
                type="text"
                component={renderTextArea}
                label={translate['Organization biography']}
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

BiographyEditForm = reduxForm({
  form: 'organizationBiographyEditForm',
  validate: organizationBiographyValidation,
})(BiographyEditForm)

export default BiographyEditForm