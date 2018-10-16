// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form";

import userLinkInfoValidation from 'src/helpers/validations/userLinkInfo'
import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"
import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"
import constants from "../../../consts/constants";

//FixMe: mohammad web site is not array, change to array
// flow type of UserInfoEditForm
type PropsUserInfoEditForm = {|
  hideEdit: Function,
  profile: userProfileType,
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
  webSite: string,
  // youtubeAccount: string,
|}

class LinkInfoEditForm extends React.Component<PropsUserInfoEditForm> {
  componentDidMount() {
    const {profile, initialize} = this.props
    const defaultFormValue = {
      telegramAccount: profile.telegram_account.replace(constants.LINKS.TELEGRAM, ''),
      instagramAccount: profile.instagram_account.replace(constants.LINKS.INSTAGRAM, ''),
      linkedinAccount: profile.linkedin_account.replace(constants.LINKS.LINKEDIN, ''),
      webSite: profile.web_site.length > 0 ? profile.web_site[0] : '',
      // youtubeAccount: profile.youtube_account,
    }
    initialize(defaultFormValue);
  }

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  _onSubmit = (values: LinkInfoFormInputType): boolean | void => {
    // user equals to initial value
    const {profile, actions, hideEdit, userId} = this.props
    const {updateProfileByUserId} = actions
    const profileId: number = profile.id

    const formFormat = {
      telegram_account: profile.telegram_account === values.telegramAccount ? null : constants.LINKS.TELEGRAM + values.telegramAccount,
      instagram_account: profile.instagram_account === values.instagramAccount ? null : constants.LINKS.INSTAGRAM + values.instagramAccount,
      linkedin_account: profile.linkedin_account === values.linkedinAccount ? null : constants.LINKS.LINKEDIN + values.linkedinAccount,
      web_site: profile.web_site === values.webSite ? null : values.webSite,
      // youtubeAccount: profile.youtube_account,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })
    updateProfileByUserId(formFormat, profileId, userId)
    hideEdit()
    return false
  }

  render() {
    const {translate, handleSubmit, submitFailed, error} = this.props
    return (
        <form onSubmit={handleSubmit(this._onSubmit)} className=''>
          <div className='form-group'>
            <label>
              {translate['Telegram'] + ": "}
            </label>
            <div className='link-container'>
              <Field
                  name="telegramAccount"
                  type="text"
                  component={renderTextField}
                  label={translate['Telegram']}
                  textFieldClass='form-control'
              />
              <span>{constants.LINKS.TELEGRAM}</span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              {translate['Instagram'] + ": "}
            </label>
            <div className='link-container'>
              <Field
                  name="instagramAccount"
                  type="text"
                  component={renderTextField}
                  label={translate['Instagram']}
                  textFieldClass='form-control'
              />
              <span>{constants.LINKS.INSTAGRAM}</span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              {translate['LinkedIn'] + ": "}
            </label>
            <div className='link-container'>
              <Field
                  name="linkedinAccount"
                  type="text"
                  component={renderTextField}
                  label={translate['LinkedIn']}
                  textFieldClass='form-control'
              />
              <span>{constants.LINKS.LINKEDIN}</span>
            </div>
          </div>

          <div className='form-group'>
            <label>
              {translate['Web site'] + ": "}
            </label>
            <Field
                name="webSite"
                type="text"
                component={renderTextField}
                label={translate['Web site']}
                textFieldClass='form-control'
            />
          </div>

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

LinkInfoEditForm = reduxForm({
  form: 'userLinkInfoEditForm',
  validate: userLinkInfoValidation,
})(LinkInfoEditForm)

export default LinkInfoEditForm