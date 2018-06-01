  /*global __*/
import React from "react"
import { Field, reduxForm } from 'redux-form'
// import cookies from "browser-cookies"
// import {REST_REQUEST} from "src/consts/Events"
// import {setID, setTOKEN, saveData} from "src/consts/data"
// import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"
// import {BeatLoader} from "react-spinners"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }
  })
}

const _validateUsername = (username) => {
  if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
    return 'Invalid username'
  }
  else if (username.length < 4) return 'Username length should be greater than 4'
}

const _validateEmail = (email) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return 'Invalid email'
  }
};

const _validateNationalCode = (nationalCode) => {
  const code = +nationalCode;
  if (Number.isInteger(code)){
    if (nationalCode.length === 10) {
      let checkNum = 0
      for (let i = 0; i < 9; i++) checkNum += (nationalCode[i] * (10 - i))
      checkNum = checkNum % 11
      const code9 = nationalCode[9]
      const condition = ((code9 == 1 && checkNum === 1) ||
                         (code9 == 0 && checkNum === 0) ||
                         (code9 == 11 - checkNum)
                        )
      console.log('code9 ', code9)
      console.log('checkNum ', checkNum)
      console.log('checkNum', checkNum)
      if (condition) return ''

      return 'Invalid national code'

    } else return 'The national code should be 10 characters'

  } return 'All of the national code characters should be number'
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'username', 'email', 'official_name', 'national_code', 'country', 'province', 'password',
    'passwordConfirm', 'city', 'organization_type', 'business_type']
  const { username, email, national_code, password, passwordConfirm} = values

  if (username) errors.username = _validateUsername(username)
  if (email) errors.email = _validateEmail(email)
  if (national_code) errors.national_code = _validateNationalCode(national_code)
  
  if (passwordConfirm && passwordConfirm !== password) errors.passwordConfirm = 'Two passwords do not match.'

  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = 'This field is required!'
  })
  return errors
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
      <Field name="password" type="password" component={renderTextField} label="Password" />
      <Field name="passwordConfirm" type="password" component={renderTextField} label="Password Confirm" />
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
  asyncValidate,
  asyncBlurFields: ['username']
})(OrganizationSignupForm)
