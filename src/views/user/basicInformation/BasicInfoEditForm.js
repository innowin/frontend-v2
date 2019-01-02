// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form";

import userInfoValidation from 'src/helpers/validations/userInfoBasicinformation'
import type {userType} from "src/consts/flowTypes/user/basicInformation"
import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"
import {ItemHeader} from "../../common/cards/Frames";
import {JalaliDateWithDot} from "../../common/JalaliWithFarsiMonth";
import {Fragment} from "react";
import EditFormButtons from "../../common/components/EditFormButtons";

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
    const {translate, handleSubmit, submitFailed, error, user, hideEdit} = this.props
    return (
        <Fragment>
          <ItemHeader editText={translate['Editing']} title={translate['Basic Information']}/>
          <form onSubmit={handleSubmit(this._onSubmit)}>
            <Field
                name="firstName"
                type="text"
                component={renderTextField}
                label={translate['First name']}
                isNew={true}
            />

            <Field
                name="lastName"
                type="text"
                component={renderTextField}
                label={translate['Last name']}
                isNew={true}
            />

            <div className='date-join-container'>
              <p>{translate['Date joined']}</p>
              <p className='date-value'>{JalaliDateWithDot(user.date_joined)}</p>
            </div>

            <div className='show-date-container'>
              <label className="container-radio">
                <input type="checkbox" defaultChecked name="radio-step-1"/>
                <span className="checkmark"/>
                <p className='password-way-text'>
                  {translate['Show join date in profile']}
                </p>
              </label>
            </div>

            {submitFailed && <p className="form-error error-message">{error}</p>}

            <EditFormButtons onCancelClick={hideEdit} translate={translate}/>

          </form>
        </Fragment>
    )
  }
}

BasicInfoEditForm = reduxForm({
  form: 'userInfoEditForm',
  validate: userInfoValidation,
})(BasicInfoEditForm)

export default BasicInfoEditForm