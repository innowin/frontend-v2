import React from "react"
import { Field, reduxForm } from 'redux-form'
import {BeatLoader} from "react-spinners"
import {validateSignup as validate} from './validations'
import renderTextField from '../../common/inputs/reduxFormRenderTextField'
import renderSelectField from '../../common/inputs/reduxFormRenderSelect'
// const asyncValidate = (values /*, dispatch */) => {
//   return sleep(1000).then(() => {
//     // simulate server latency
//     if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//       throw { username: 'این نام کاربری قبلا استفاده شده است.' }
//     }
//   })
// }
const BUSINESS_TYPES = [{value: '1', title: 'نوع اول'}, {value: '2', title: 'نوع دوم'}]

const ORGANIZATION_TYPES = [{value: '1', title: 'نوع اول'}, {value: '2', title: 'نوع دوم'}]

const COUNTRIES = [{value: 1, title: 'کشور۱'}, {value: 2, title: 'کشور۲'}]

const PROVINCES1 = [{value: '1', title: 'استان۱'}, {value: '2', title: 'استان۲'}]

const PROVINCES2 = [{value: '3', title: 'استان3'}, {value: '4', title: 'استان4'}]

const OrgFormPart1 = ({ translator, handleSubmit, pristine, reset, submitting, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="username"
      type="text"
      component={renderTextField}
      label={translator['Username']}
    />
    <Field name="email" type="email" component={renderTextField} label={translator['Email']} />
    <Field name="official_name" type="text" component={renderTextField} label={translator['Official name']} />
    <Field name="national_code" type="text" component={renderTextField} label={translator['National code']} />
    <Field
      name="organization_type"
      component={renderSelectField}
      label={translator['Organization type']}
      options={ORGANIZATION_TYPES}
    />
    <Field
      name="business_type"
      component={renderSelectField}
      label={translator['Business type']}
      options={BUSINESS_TYPES}
    />
    <div>
      <button
        className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
        disabled={submitting}>
        {!submitting ? translator['Register'] : (
          <BeatLoader color="#fff" size={10} margin="auto"/>
        )}
      </button>
    </div>
  </form>
)
const OrgFormPart2 = ({ translator, handleSubmit, pristine, reset, submitting, onSubmit, handleProvinces, provincesIdentifier }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="country"
      options={COUNTRIES}
      component={renderSelectField}
      changeHandler={handleProvinces}
      label={translator['Country']}
    />
    <Field
      name="province"
      options={provincesIdentifier === '1'? PROVINCES1: PROVINCES2}
      component={renderSelectField}
      label={translator['Province']}
    />
    <Field name="city" type="text" component={renderTextField} label={translator['City']} />
    <Field name="password" type="password" component={renderTextField} label={translator['Password']} />
    <Field name="passwordConfirm" type="password" component={renderTextField} label={translator['Repeat password']} />
    <div>
      <button
        className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
        disabled={submitting}>
        {!submitting ? translator['Register'] : (
          <BeatLoader color="#fff" size={10} margin="auto"/>
        )}
      </button>
    </div>
  </form>
)
const OrgReduxFormPart1 = reduxForm({
  form: 'orgSignupFormPart1',
  validate,
  // asyncValidate,
  // asyncBlurFields: ['username']
})(OrgFormPart1)

const OrgReduxFormPart2 = reduxForm({
  form: 'orgSignupFormPart2',
  validate,
})(OrgFormPart2)

const OrganizationSignupForm = ({ translator ,onSubmitPart1, onSubmitPart2, formPart, provincesIdentifier, handleProvinces }) => (
  <div className="organization-signup-form">
    <div className={formPart === 2 ? 'visible-part' : 'hidden-part' }>
      <OrgReduxFormPart2 translator={translator} onSubmit={onSubmitPart2} handleProvinces={handleProvinces} provincesIdentifier={provincesIdentifier} />        
    </div>
    <div className={formPart === 1 ? 'visible-part' : 'hidden-part' }>
      <OrgReduxFormPart1 translator={translator} onSubmit={onSubmitPart1} />
    </div>
  </div>
)

export default OrganizationSignupForm

