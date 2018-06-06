import React from "react"
import { Field, reduxForm } from 'redux-form'
import {BeatLoader} from "react-spinners"
import cookies from "browser-cookies"
import {REST_REQUEST} from "src/consts/Events"
import {setID, setTOKEN, saveData} from "src/consts/data"
import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"
import renderTextField from '../../common/inputs/reduxFormRenderTextField'
import {validateSignup as validate} from './validations'

const PersonSignupForm = ({ handleSubmit, pristine, reset, submitting, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)} className="person-signup-form" >
    <Field
        name="username"
        type="text"
        component={renderTextField}
        label="نام کاربری"
    />
    <Field name="email" type="email" component={renderTextField} label="ایمیل" />
    <Field name="password" type="password" component={renderTextField} label="رمز عبور" />
    <Field name="passwordConfirm" type="password" component={renderTextField} label="تکرار رمز عبور" />
    <div>
      <button
            className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
            disabled={submitting}>
            {!submitting ? 'ثبت نام' : (
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