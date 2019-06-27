// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import renderTextField from '../../common/inputs/reduxFormRenderTextField'
import {ReduxFormDateInput} from 'src/views/common/inputs/reduxFormDateInput'
import {Field, reduxForm} from 'redux-form'
import type {userType} from 'src/consts/flowTypes/user/basicInformation'
import privateInfoValidation from '../../../helpers/validations/privateInfoBasicInformation'
import EditFormButtons from '../../common/components/EditFormButtons'
import {Fragment} from 'react'
import {ItemHeader} from '../../common/cards/Frames'

type PrivateInfoFormInputType = {
  day: string,
  year: string,
  month: string,
  nationalCode: string,
  email: string,
  authMobile: string,
}

// PrivateInfoEditForm flow type
type PropsPrivateInfoEditForm = {
  hideEdit: Function,
  user: userType,
  translate: { [string]: string },
  handleSubmit: Function,
  initialize: Function,
  actions: {
    updateUserByUserId: Function,
  },
  userId: number,
  submitFailed: string,
  error: string,
}

class PrivateInfoEditForm extends React.Component<PropsPrivateInfoEditForm> {
  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    submitFailed: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const {initialize, user} = this.props
    const birthDateSplit = user.birth_date === null ? [''] : user.birth_date.split('.')
    const defaultFormValue = {
      nationalCode: user.national_code,
      email: user.email,
      authMobile: user.auth_mobile,
      year: birthDateSplit[0],
      month: birthDateSplit[1] === undefined ? '' : birthDateSplit[1],
      day: birthDateSplit[2] === undefined ? '' : birthDateSplit[2],
    }
    initialize(defaultFormValue)
  }

  _onSubmit = (values: PrivateInfoFormInputType): boolean | void => {
    const {actions, userId, user} = this.props

    const {updateUserByUserId} = actions

    const birth_date = values.year === '' || values.month === '' || values.day === '' ? '' : `${values.year}.${values.month}.${values.day}`

    const formFormat = {
      national_code: user.national_code === values.nationalCode ? null : values.nationalCode,
      auth_mobile: user.auth_mobile === values.authMobile ? null : values.authMobile,
      birth_date: user.birth_date === birth_date ? null : birth_date,
      email: user.email === values.email ? null : values.email,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      if (formFormat[key] === null) {
        delete (formFormat[key])
      }
      return formFormat
    })

    const formValues = {...formFormat}
    updateUserByUserId(formValues, userId)
    this.props.hideEdit()
    return false
  }

  render() {
    const {translate, handleSubmit, submitFailed, error, hideEdit} = this.props
    return (
        <Fragment>
          <ItemHeader editText={translate['Editing']} title={translate['Private info']}/>
          <form onSubmit={handleSubmit(this._onSubmit)}>
            <Field
                name="nationalCode"
                type="text"
                component={renderTextField}
                label={translate['National code']}
                isNew={true}
                ltr={true}
            />
            <ReduxFormDateInput translate={translate}
                                labelName={translate['BirthDate']}
                                dayName='day' monthName='month' yearName='year'
                                isNew={true}/>
            <Field
                name="email"
                type="text"
                component={renderTextField}
                label={translate['Email']}
                isNew={true}
                tipText={translate['Private email not shown to the others']}
                ltr={true}
            />
            <Field
                name="authMobile"
                type="text"
                component={renderTextField}
                label={translate['Mobile']}
                isNew={true}
                ltr={true}
                tipText={translate['Mobile not shown to the others']}
            />

            {submitFailed && <p className="error-message form-error">{error}</p>}

            <EditFormButtons translate={translate} onCancelClick={hideEdit}/>
          </form>
        </Fragment>
    )
  }
}

PrivateInfoEditForm = reduxForm({
  form: 'privateInfoEditForm',
  validate: privateInfoValidation,
})(PrivateInfoEditForm)

export {PrivateInfoEditForm}