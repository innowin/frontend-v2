// @flow

import * as React from 'react'
import * as PropTypes from 'prop-types'

import {Field, FieldLabel, FieldValue, ItemHeader} from '../../common/cards/Frames'
import type {userProfileType} from 'src/consts/flowTypes/user/basicInformation'
import {TelegramIcon, InstagramIcon, LinkedInIcon, TwitterIcon} from 'src/images/icons'

// flow type of UserInfoView
type PropsUserInfoView = {
  showEdit: Function,
  user: userProfileType,
  translate: { [string]: string }
}

const LinkInfoView = (props: PropsUserInfoView) => {
  const {showEdit, translate, user} = props

  return (
      <div className='link-info-container'>
        <ItemHeader title={translate['Link Information']} showEdit={showEdit}/>
        <Field>
          <TelegramIcon className='icon telegram-icon'/>
          <FieldLabel label={translate['Telegram'] + ': '}/>
          <FieldValue value={user.telegram_account}/>
        </Field>
        <Field>
          <InstagramIcon className='icon instagram-icon'/>
          <FieldLabel label={translate['Instagram'] + ': '}/>
          <FieldValue value={user.instagram_account}/>
        </Field>
        <Field>
          <LinkedInIcon className='icon linkedin-icon'/>
          <FieldLabel label={translate['LinkedIn'] + ': '}/>
          <FieldValue value={user.linkedin_account}/>
        </Field>
        <Field>
          <TwitterIcon className='icon twitter-icon'/>
          <FieldLabel label={translate['Twitter'] + ': '}/>
          <FieldValue value={user.twitter_account}/>
        </Field>
      </div>
  )
}

LinkInfoView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
}

export default LinkInfoView