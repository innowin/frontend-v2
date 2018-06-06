import React from "react"
import { Field, reduxForm } from 'redux-form'
// import cookies from "browser-cookies"
// import {REST_REQUEST} from "src/consts/Events"
// import {setID, setTOKEN, saveData} from "src/consts/data"
// import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"
// import {BeatLoader} from "react-spinners"
import {BeatLoader} from "react-spinners"
import {validateSignup as validate} from './validations'
import renderTextField from '../../common/inputs/reduxFormRenderTextField'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'این نام کاربری قبلا استفاده شده است.' }
    }
  })
}

const OrgFormPart1 = ({ handleSubmit, pristine, reset, submitting, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="username"
      type="text"
      component={renderTextField}
      label="نام کاربری"
    />
    <Field name="email" type="email" component={renderTextField} label="ایمیل" />
    <Field name="official_name" type="text" component={renderTextField} label="نام رسمی" />
    <Field name="national_code" type="text" component={renderTextField} label="کد ملی" />
    <Field name="organization_type" type="text" component={renderTextField} label="نوع شرکت" />
    <Field name="business_type" type="text" component={renderTextField} label="نوع تجارت" />
    <div>
      <button
        className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
        disabled={submitting}>
        {!submitting ? "ثبت نام" : (
          <BeatLoader color="#fff" size={10} margin="auto"/>
        )}
      </button>
    </div>
  </form>
)
const OrgFormPart2 = ({ handleSubmit, pristine, reset, submitting, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field name="country" type="text" component={renderTextField} label="کشور" />
    <Field name="province" type="text" component={renderTextField} label="استان" />
    <Field name="city" type="text" component={renderTextField} label="شهر" />
    <Field name="password" type="password" component={renderTextField} label="رمز عبور" />
    <Field name="passwordConfirm" type="password" component={renderTextField} label="تکرار رمز عبور" />
    <div>
      <button
        className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
        disabled={submitting}>
        {!submitting ? "ثبت نام" : (
          <BeatLoader color="#fff" size={10} margin="auto"/>
        )}
      </button>
    </div>
  </form>
)
const OrgReduxFormPart1 = reduxForm({
  form: 'orgSignupFormPart1',
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})(OrgFormPart1)

const OrgReduxFormPart2 = reduxForm({
  form: 'orgSignupFormPart2',
  validate,
})(OrgFormPart2)

const OrganizationSignupForm = ({ onSubmitPart1, onSubmitPart2, formPart }) => (
  <div className="organization-signup-form">  
    <div className={formPart === 2 ? 'visible-part' : 'hidden-part' }>
      <OrgReduxFormPart2 onSubmit={onSubmitPart2} />        
    </div>
    <div className={formPart === 1 ? 'visible-part' : 'hidden-part' }>
      <OrgReduxFormPart1 onSubmit={onSubmitPart1} />
    </div>
  </div>
)

export default OrganizationSignupForm

