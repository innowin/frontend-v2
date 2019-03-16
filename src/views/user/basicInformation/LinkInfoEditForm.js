// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {Field, reduxForm} from 'redux-form'

import userLinkInfoValidation from 'src/helpers/validations/userLinkInfo'
import type {userProfileType} from 'src/consts/flowTypes/user/basicInformation'
import renderTextField from 'src/views/common/inputs/reduxFormRenderTextField'
import constants from '../../../consts/constants'
import EditFormButtons from '../../common/components/EditFormButtons'
import {ItemHeader} from '../../common/cards/Frames'

//FixMe: mohammad web site is not array, change to array
// flow type of UserInfoEditForm
type PropsUserInfoEditForm = {|
  hideEdit: Function,
  user: userProfileType,
  translate: { [string]: string },
  actions: {|
    updateProfileByUserId: Function,
  |},
  initialize: Function,
  handleSubmit: Function,
  submitFailed: string,
  error: string,
  userId: number,
|}

type LinkInfoFormInputType = {|
  telegramAccount: string,
  instagramAccount: string,
  linkedinAccount: string,
  twitterAccount: string,
|}

class LinkInfoEditForm extends React.Component<PropsUserInfoEditForm> {
  componentDidMount() {
    const {user, initialize} = this.props
    const defaultFormValue = {
      telegramAccount: user.telegram_account.replace(constants.LINKS.TELEGRAM, ''),
      instagramAccount: user.instagram_account.replace(constants.LINKS.INSTAGRAM, ''),
      linkedinAccount: user.linkedin_account.replace(constants.LINKS.LINKEDIN, ''),
      twitterAccount: user.twitter_account.replace(constants.LINKS.TWITTER, ''),
    }
    initialize(defaultFormValue)
  }

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  _onSubmit = (values: LinkInfoFormInputType): boolean | void => {
    // user equals to initial value
    const {user, actions, hideEdit, userId} = this.props
    const {updateUserByUserId} = actions


    // Regex for find the id of linkedin url
    let re = new RegExp('^' + constants.LINKS.LINKEDIN + '.*$')
    if (re.test(values.linkedinAccount)) {
      const splited = values.linkedinAccount.split('/')
      const indexLinkedIn = splited.indexOf(constants.LINKS.LINKEDIN_START)
      values.linkedinAccount = splited[indexLinkedIn + 2]
    }

    const formFormat = {
      telegram_account: user.telegram_account === (constants.LINKS.TELEGRAM + values.telegramAccount) ? null : (values.telegramAccount === '' ? '' : constants.LINKS.TELEGRAM + values.telegramAccount),
      instagram_account: user.instagram_account === (constants.LINKS.INSTAGRAM + values.instagramAccount) ? null : (values.instagramAccount === '' ? '' : constants.LINKS.INSTAGRAM + values.instagramAccount),
      linkedin_account: user.linkedin_account === (constants.LINKS.LINKEDIN + values.linkedinAccount) ? null : (values.linkedinAccount === '' ? '' : constants.LINKS.LINKEDIN + values.linkedinAccount),
      twitter_account: user.twitter_account === (constants.LINKS.TWITTER + values.twitterAccount) ? null : (values.twitterAccount === '' ? '' : constants.LINKS.TWITTER + values.twitterAccount),
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      if (formFormat[key] === null) {
        delete (formFormat[key])
      }
      return formFormat
    })
    const formValues: {} = {...formFormat}
    updateUserByUserId(formValues, userId)
    hideEdit()
    return false
  }

  render() {
    const {translate, handleSubmit, submitFailed, error, hideEdit} = this.props
    return (
        <React.Fragment>
          <ItemHeader title={translate['Link Information']} editText={translate['Editing']}/>
          <form onSubmit={handleSubmit(this._onSubmit)} className=''>
            <Field
                name="telegramAccount"
                type="text"
                component={renderTextField}
                label={translate['Telegram']}
                isNew={true}
                ltr={true}
                nextText={constants.LINKS.TELEGRAM}
            />

            <Field
                name="instagramAccount"
                type="text"
                component={renderTextField}
                label={translate['Instagram']}
                isNew={true}
                ltr={true}
                nextText={constants.LINKS.INSTAGRAM}
            />

            <Field
                name="linkedinAccount"
                type="text"
                component={renderTextField}
                label={translate['LinkedIn']}
                isNew={true}
                ltr={true}
                nextText={constants.LINKS.LINKEDIN}
            />

            <Field
                name="twitterAccount"
                type="text"
                component={renderTextField}
                label={translate['Twitter']}
                isNew={true}
                ltr={true}
                nextText={constants.LINKS.TWITTER}
            />

            {submitFailed && <p className="form-error error-message">{error}</p>}

            <EditFormButtons onCancelClick={hideEdit} translate={translate}/>
          </form>
        </React.Fragment>
    )
  }
}

LinkInfoEditForm = reduxForm({
  form: 'userLinkInfoEditForm',
  validate: userLinkInfoValidation,
})(LinkInfoEditForm)

export default LinkInfoEditForm