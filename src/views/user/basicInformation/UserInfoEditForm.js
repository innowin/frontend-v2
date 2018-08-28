import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form";

import type {userType} from "src/consts/flowTypes/user/basicInformation"


import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"

// flow type of UserInfoEditForm
type PropsUserInfoEditForm = {|
  hideEdit: Function,
  user: userType,
  translate: { [string]: string},
  actions: {|
    updateUserByUserId: Function,
  |},
  initialize?: Function,
  handleSubmit?: Function,
|}

type UserInfoFormInputType = {|
  username: string,
  firstName: string,
  lastName: string,
  email: string,
|}

class UserInfoEditForm extends React.Component<PropsUserInfoEditForm> {
  componentDidMount(){
    const {user, initialize} = this.props
    const defaultFormValue = {
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
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
    const userId:number = this.props.user.id

    const formFormat = {
      username: user.username === values.username ? null: values.username,
      first_name: user.first_name === values.firstName ? null: values.firstName,
      last_name: user.last_name === values.lastName ? null: values.lastName,
      email: user.email === values.email ? null: values.email,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })
    // TODO: mohammad validation form and errors

    const formValues:{} = {...formFormat}
    updateUserByUserId(formValues, userId)
    return false
  }

  render() {
    const {translate, handleSubmit} = this.props
    return (
        <form onSubmit={handleSubmit(this._onSubmit)} className=''>
            <div className='form-group'>
              <label>
                {translate['Username'] + ": "}
              </label>
              <Field
                  name="username"
                  type="text"
                  component={renderTextField}
                  label={translate['Username']}
                  textFieldClass='form-control'
              />
            </div>

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

            <div className='form-group'>
              <label>
                {translate['Email'] + ": "}
              </label>
              <Field
                  name="email"
                  type="text"
                  component={renderTextField}
                  label={translate['Email']}
                  textFieldClass='form-control'
              />
            </div>

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

UserInfoEditForm = reduxForm({
  form: 'userInfoEditForm',
})(UserInfoEditForm)

export {UserInfoEditForm}