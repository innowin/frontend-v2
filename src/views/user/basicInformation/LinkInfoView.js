// @flow

import * as React from "react"
import PropTypes from "prop-types"

import {Field, FieldLabel, FieldValue, ItemHeader} from "../../common/cards/Frames"
import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"
import {TelegramIcon, InstagramIcon, LinkedInIcon, YoutubeIcon, ExchangeExploreIcon} from 'src/images/icons'

// flow type of UserInfoView
type PropsUserInfoView = {
  showEdit: Function,
  profile: userProfileType,
  translate: { [string]: string }
}

//TODO: mohammad youtube field not exist, web site icon not exist
const LinkInfoView = (props: PropsUserInfoView) => {
  const {profile, showEdit, translate} = props

  return (
      <div className='link-info-container'>
        <ItemHeader title={translate['Link Information']} showEdit={showEdit}/>
        {/*<Field>*/}
          {/*<YoutubeIcon className='icon twitter-icon'/>*/}
          {/*<FieldLabel label={translate['Youtube'] + ": "}/>*/}
          {/*<FieldValue value={profile.youtube_account}/>*/}
        {/*</Field>*/}
        <Field>
          <TelegramIcon className='icon telegram-icon'/>
          <FieldLabel label={translate['Telegram'] + ": "}/>
          <FieldValue value={profile.telegram_account}/>
        </Field>
        <Field>
          <InstagramIcon className='icon instagram-icon'/>
          <FieldLabel label={translate['Instagram'] + ": "}/>
          <FieldValue value={profile.instagram_account}/>
        </Field>
        <Field>
          <LinkedInIcon className='icon linkedin-icon'/>
          <FieldLabel label={translate['LinkedIn'] + ": "}/>
          <FieldValue value={profile.linkedin_account}/>
        </Field>
      </div>
  )
}

LinkInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired
}

export default LinkInfoView