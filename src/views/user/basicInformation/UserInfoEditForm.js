import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form";

import type {userType} from "src/consts/flowTypes/user/basicInformation"

// flow type of UserInfoEditForm
type PropsUserInfoEditForm = {|
  hideEdit: Function,
  user: userType,
  translate: { [string]: string},
  actions: {|
    updateUserByUserId: Function,
  |},
  initialize: Function,
  handleSubmit: Function,
|}

class UserInfoEditForm extends React.Component<PropsUserInfoEditForm> {
  componentDidMount(){
    const {user} = this.props
    const defaultFormValue = {
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    }
    this.props.initialize(defaultFormValue);
  }

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  _onSubmit = (values: {username: string, firstName: string, lastName: string, email: string}): boolean | void => {
    // user equals to initial value
    const {user, actions} = this.props
    const {updateUserByUserId} = actions
    const userId:number = this.props.user.id

    const formFormat = {
      username: user.username === values.username ? '': values.username,
      first_name: user.first_name === values.firstName ? '': values.firstName,
      last_name: user.last_name === values.lastName ? '': values.lastName,
      email: user.email === values.email ? '': values.email,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === '' ? delete(formFormat[key]) : ''
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
        <form onSubmit={handleSubmit(this._onSubmit)}>
          <div>
            <div className='form-group'>
              <label>
                {translate['Username'] + ": "}
              </label>
              <Field className='form-control user-info-form-text-field' name='username' component='input' type='text' />
            </div>

            <div className='form-group'>
              <label>
                {translate['First name'] + ": "}
              </label>
              <Field className='form-control user-info-form-text-field' name='firstName' component='input' type='text' />
            </div>

            <div className='form-group'>
              <label>
                {translate['Last name'] + ": "}
              </label>
              <Field className='form-control user-info-form-text-field' name='lastName' component='input' type='text' />
            </div>

            <div className='form-group'>
              <label>
                {translate['Email'] + ": "}
              </label>
              <Field className='form-control user-info-form-text-field' name='email' component='input' type='email' />
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
                {translate['Cancel']}
              </button>
              <button type="submit" className="btn btn-success">{translate['Save']}</button>
            </div>
          </div>
        </form>
    )
  }
}

UserInfoEditForm = reduxForm({
  form: 'userInfoEditForm',
})(UserInfoEditForm)

export {UserInfoEditForm}