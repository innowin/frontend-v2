/*global __*/
import React from "react"
import {Field, reduxForm} from 'redux-form'
import {BeatLoader} from "react-spinners"
// import cookies from "browser-cookies"
// import {REST_REQUEST} from "src/consts/Events"
// import {setID, setTOKEN, saveData} from "src/consts/data"
// import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"
// import {BeatLoader} from "react-spinners"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw {username: 'That username is taken'}
    }
  })
};

const _validateUsername = (username) => {
  if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
    return __('Invalid username')
  }
  else if (username.length < 4) return __('Username length should be greater than 4')
};

const _validateEmail = (email) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return __('Invalid email')
  }
};

const _validateNationalCode = (nationalCode) => {
  const code = +nationalCode;
  if (Number.isInteger(code) && nationalCode.length === 10) {
    let checkNum = 0;
    for (let i = 0; i < 9; i++) checkNum += (nationalCode[i] * (10 - i))
    checkNum = checkNum % 11;
    const code9 = nationalCode[9];
    const condition = ((code9 === 1 && checkNum === 1) ||
      (code9 === 0 && checkNum === 0) ||
      (code9 === 11 - checkNum)
    );
    console.log('code9 ', code9);
    console.log('checkNum ', checkNum);
    console.log('checkNum', checkNum);
    if (condition) return '';

    return __('Invalid organization national code')

  } else return __('Organization national code must be 10 digit')
};

const validate = values => {
  const errors = {};
  const requiredFields = [
    'username', 'email', 'official_name', 'organization_national_code', 'country', 'province', 'password',
    'passwordConfirm', 'city', 'ownership_type', 'business_type'];
  const {username, email, national_code, password, passwordConfirm} = values;

  if (username) errors.username = _validateUsername(username);
  if (email) errors.email = _validateEmail(email);
  if (national_code) errors.national_code = _validateNationalCode(national_code);

  if (passwordConfirm && passwordConfirm !== password) errors.passwordConfirm = __('Different password');

  requiredFields.forEach(field => {
    if (!values[field]) errors[field] = __('Required field')
  });
  return errors
};

const renderTextField = ({
                           input,
                           label,
                           type,
                           className,
                           meta: {touched, error, warning}
                         }) => (
    <div>
      <input {...input} placeholder={label} type={type} className={className}/>
      {touched &&
      ((error && <span className="messageBox error-message">{error}</span>) ||
        (warning && <span className="messageBox">{warning}</span>))}
    </div>
);
const OrganizationSignupForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderTextField} label={__('Username')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="email" type="email" component={renderTextField} label={__('Email')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="official_name" type="text" component={renderTextField} label={__('Official name')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="organization_national_code" type="text" component={renderTextField}
             label={__('Organization national code')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="country" type="text" component={renderTextField} label={__('Country')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="province" type="text" component={renderTextField} label={__('Province')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="city" type="text" component={renderTextField} label={__('City')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="ownership_type" type="text" component={renderTextField} label={__('Ownership type')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="business_type" type="text" component={renderTextField} label={__('Business type')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="password" type="password" component={renderTextField} label={__('Password')}
             className="form-control my-form-control-lg -mb-2"/>
      <Field name="passwordConfirm" type="password" component={renderTextField} label={__('Repeat password')}
             className="form-control my-form-control-lg -mb-2"/>
      <button type="submit" disabled={submitting}
              className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer">
        {!submitting ? (__('Register')) : (
          <BeatLoader color="#fff" size={10} margin="auto"/>
        )}
      </button>
    </form>
  )
};

export default reduxForm({
  form: 'organizationSignupForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})(OrganizationSignupForm)
