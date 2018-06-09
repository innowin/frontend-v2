import React from "react"
import { Field, reduxForm } from 'redux-form'
import {BeatLoader} from "react-spinners"
import renderTextField from '../../common/inputs/reduxFormRenderTextField'
import {validateSignup as validate} from './validations'

const PersonSignupForm = ({ translator, handleSubmit, pristine, reset, submitting, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)} className="person-signup-form" >
    <Field
        name="username"
        type="text"
        component={renderTextField}
        label={translator['Username']}
    />
    <Field name="email" type="email" component={renderTextField} label={translator['Email']} />
    <Field name="password" type="password" component={renderTextField} label={translator['Password']}/>
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
  export default reduxForm({
    form: 'personSignupForm',
    validate,
  })(PersonSignupForm)