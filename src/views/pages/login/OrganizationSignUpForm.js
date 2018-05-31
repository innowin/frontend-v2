/*global __*/
import React, {Component} from "react"
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username', 'email', 'official_name', 'national_code', 'country', 'province', 'password',
    'passwordConfirm', 'city', 'organization_type', 'business_type']
    requiredFields.forEach(field => {
      if (!values[field]) errors[field] = 'This field is required!'
    })
    console.log(errors)
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const OrganizationSignupForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderTextField}
        label="Username"
      />
      <Field name="email" type="email" component={renderTextField} label="Email" />
      <Field name="official_name" type="text" component={renderTextField} label="Official_name" />
      <Field name="national_code" type="text" component={renderTextField} label="National_code" />
      <Field name="country" type="text" component={renderTextField} label="Country" />
      <Field name="province" type="text" component={renderTextField} label="Province" />
      <Field name="city" type="text" component={renderTextField} label="City" />
      <Field name="organization_type" type="text" component={renderTextField} label="Organization type" />
      <Field name="business_type" type="text" component={renderTextField} label="Business type" />
      <Field name="password" type="text" component={renderTextField} label="Password" />
      <Field name="passwordConfirm" type="text" component={renderTextField} label="Password Confirm" />
      <div>
        <button type="submit" disabled={submitting}>
          ثبت نام
        </button>
        </div>
    </form>
  )
}

export default reduxForm({
  form: 'organizationSignupForm',
  validate,
  warn,
})(OrganizationSignupForm)
