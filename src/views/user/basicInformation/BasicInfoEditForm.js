// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form";

import userInfoValidation from 'src/helpers/validations/userInfoBasicinformation'
import type {userType} from "src/consts/flowTypes/user/basicInformation"
import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"

// flow type of UserInfoEditForm
type PropsUserInfoEditForm = {|
  hideEdit: Function,
  user: userType,
  translate: { [string]: string },
  actions: {|
    updateUserByUserId: Function,
  |},
  initialize: Function,
  handleSubmit: Function,
  submitFailed: string,
  error: string,
|}

type UserInfoFormInputType = {|
  firstName: string,
  lastName: string,
|}

class BasicInfoEditForm extends React.Component<PropsUserInfoEditForm> {
  componentDidMount() {
    const {user, initialize} = this.props
    const defaultFormValue = {
      firstName: user.first_name,
      lastName: user.last_name,
    }
    initialize(defaultFormValue);
  }

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  _onSubmit = (values: UserInfoFormInputType): boolean | void => {
    // user equals to initial value
    const {user, actions} = this.props
    const {updateUserByUserId} = actions
    const userId: number = this.props.user.id

    const formFormat = {
      first_name: user.first_name === values.firstName ? null : values.firstName,
      last_name: user.last_name === values.lastName ? null : values.lastName,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })
    updateUserByUserId(formFormat, userId)
    return false
  }

  render() {
    const {translate, handleSubmit, submitFailed, error} = this.props
    return (
        <form onSubmit={handleSubmit(this._onSubmit)} className=''>
          <div className='form-group'>
            <label>
              {translate['First name'] + ": "}
            </label>
            <Field
                name="firstName"
                type="text"
                component={renderTextField}
                label={translate['First name']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Last name'] + ": "}
            </label>
            <Field
                name="lastName"
                type="text"
                component={renderTextField}
                label={translate['Last name']}
                textFieldClass='form-control'
            />
          </div>

          {/*<div className='form-group render-text-field-container'>*/}
            {/*<Field*/}
                {/*labelName={translate['Last name'] + ": "}*/}
                {/*name="lastName"*/}
                {/*type="text"*/}
                {/*component={renderTextField}*/}
                {/*// label={translate['Last name']}*/}
                {/*textFieldClass='form-control'*/}
            {/*/>*/}
          {/*</div>*/}

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

BasicInfoEditForm = reduxForm({
  form: 'userInfoEditForm',
  validate: userInfoValidation,
})(BasicInfoEditForm)

export default BasicInfoEditForm