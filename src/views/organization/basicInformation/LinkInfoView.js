// @flow
import * as React from "react"
import PropTypes from "prop-types"

import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import type {organizationType} from "../../../consts/flowTypes/organization/organization";
import {TelegramIcon, InstagramIcon, LinkedInIcon, YoutubeIcon, ExchangeExploreIcon} from 'src/images/icons'

// flow type of OrganizationInfoView
type PropsOrganizationInfoView = {
  showEdit: Function,
  organization: organizationType,
  translate: { [string]: string }
}

//TODO: mohammad youtube field not exist, web site icon not exist
const LinkInfoView = (props: PropsOrganizationInfoView) => {
  const {organization, showEdit, translate} = props

  return (
      <div className='link-info-container'>
        <ItemHeader title={translate['Link Information']} showEdit={showEdit}/>
        {/*<Field>*/}
          {/*<YoutubeIcon className='icon youtube-icon'/>*/}
          {/*<FieldLabel label={translate['Youtube'] + ": "}/>*/}
          {/*<FieldValue value={organization.youtube_account}/>*/}
        {/*</Field>*/}
        <Field>
          <TelegramIcon className='icon telegram-icon'/>
          <FieldLabel label={translate['Telegram'] + ": "}/>
          <FieldValue value={organization.telegram_account}/>
        </Field>
        <Field>
          <InstagramIcon className='icon instagram-icon'/>
          <FieldLabel label={translate['Instagram'] + ": "}/>
          <FieldValue value={organization.instagram_account}/>
        </Field>
        <Field>
          <LinkedInIcon className='icon linkedin-icon'/>
          <FieldLabel label={translate['LinkedIn'] + ": "}/>
          <FieldValue value={organization.linkedin_account}/>
        </Field>
        <Field>
          <ExchangeExploreIcon className='icon web-site-icon'/>
          <FieldLabel label={translate['Web site'] + ": "}/>
          <FieldValue value={organization.web_site}/>
        </Field>
      </div>
  )
}

LinkInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default LinkInfoView