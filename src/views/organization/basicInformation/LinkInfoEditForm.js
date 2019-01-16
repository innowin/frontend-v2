// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form";

import userLinkInfoValidation from 'src/helpers/validations/userLinkInfo'
import renderTextField from "src/views/common/inputs/reduxFormRenderTextField"
import type {organizationType} from "src/consts/flowTypes/organization/organization";
import constants from "src/consts/constants";

//FixMe: mohammad web site is not array, change to array
// flow type of OrganizationInfoEditForm
type PropsOrganizationInfoEditForm = {|
  hideEdit: Function,
  organization: organizationType,
  translate: { [string]: string },
  actions: {|
    updateOrganization: Function,
  |},
  initialize: Function,
  handleSubmit: Function,
  submitFailed: string,
  error: string,
  organizationId: number,
|}

type LinkInfoFormInputType = {|
  telegramAccount: string,
  instagramAccount: string,
  linkedinAccount: string,
  twitterAccount: string,
  webSite: string,
  // youtubeAccount: string,
|}

class LinkInfoEditForm extends React.Component<PropsOrganizationInfoEditForm> {
  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    organization: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    organizationId: PropTypes.number.isRequired,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
  }
  
  componentDidMount() {
    const {organization, initialize} = this.props
    const defaultFormValue = {
      telegramAccount: organization.telegram_account && organization.telegram_account.replace(constants.LINKS.TELEGRAM, ''),
      instagramAccount: organization.instagram_account && organization.instagram_account.replace(constants.LINKS.INSTAGRAM, ''),
      linkedinAccount: organization.linkedin_account && organization.linkedin_account.replace(constants.LINKS.LINKEDIN, ''),
      twitterAccount: organization.twitter_account && organization.twitter_account.replace(constants.LINKS.TWITTER, ''),
      webSite: organization.web_site,
      // youtubeAccount: organization.youtube_account,
    }
    initialize(defaultFormValue);
  }
  
  _onSubmit = (values: LinkInfoFormInputType): boolean | void => {
    // organization equals to initial value
    const {organization, actions, hideEdit, organizationId} = this.props
    const {updateOrganization} = actions

    const formFormat = {
      telegram_account: organization.telegram_account === values.telegramAccount ? null : constants.LINKS.TELEGRAM + values.telegramAccount,
      instagram_account: organization.instagram_account === values.instagramAccount ? null : constants.LINKS.INSTAGRAM + values.instagramAccount,
      linkedin_account: organization.linkedin_account === values.linkedinAccount ? null : constants.LINKS.LINKEDIN + values.linkedinAccount,
      twitter_account: organization.twitter_account === values.twitterAccount ? null : constants.LINKS.TWITTER + values.twitterAccount,
      web_site: organization.web_site === values.webSite ? null : values.webSite,
    // youtubeAccount: organization.youtube_account,
    }
    const propertyNames = Object.getOwnPropertyNames(formFormat)
    propertyNames.map(key => {
      // formFormat[key] === null ? delete(formFormat[key]) : ''
      // return formFormat
      if (formFormat[key] === null) {
        delete (formFormat[key])
      }
      return formFormat
    })
    updateOrganization({formValues: formFormat, organizationId})
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
              {translate['Twitter'] + ": "}
            </label>
            <div className='link-container'>
              <Field
                  name="twitterAccount"
                  type="text"
                  component={renderTextField}
                  label={translate['Twitter']}
                  textFieldClass='form-control'
              />
              <span>{constants.LINKS.TWITTER}</span>
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
  form: 'organizationLinkInfoEditForm',
  validate: userLinkInfoValidation,
})(LinkInfoEditForm)

export default LinkInfoEditForm