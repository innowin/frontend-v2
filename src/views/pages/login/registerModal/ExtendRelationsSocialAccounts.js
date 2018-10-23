// @flow
import * as React from 'react'
import PropTypes from "prop-types"

import {GmailSvg, LinkedInIcon} from 'src/images/icons'

type ContentUserProps = {
  translate: { [string]: string },
  social: {
    gmail: string,
    linkedin: string,
  }
}

const ExtendRelationsSocialAccounts = (props: ContentUserProps) => {
  const {translate, social} = props

  return (
      <div className='extend-relations-social-accounts-container'>
        <p className='social-text'>{translate['Social help text']}</p>
        <div className='account-container'>
          <p className='label-connect'>{translate['Connect to gmail']}</p>
          <GmailSvg className='gmail-icon'/>
          <span className='social-connect-text'>{social.gmail}</span>
          {social.gmail.length > 0
              ? <button className='common-modal-button remove-button'>{translate.topBar['Disconnect']}</button>
              : <button className='common-modal-button add-button'>{translate['Add']}</button>
          }
        </div>
        <div className='account-container'>
          <p className='label-connect'>{translate['Connect to linkedin']}</p>
          <LinkedInIcon className='linkedin-icon'/>
          <span className='social-connect-text'>{social.linkedin}</span>
          {social.linkedin.length > 0
              ? <button className='common-modal-button remove-button'>{translate.topBar['Disconnect']}</button>
              : <button className='common-modal-button add-button'>{translate['Add']}</button>
          }
        </div>
      </div>
  )
}

ExtendRelationsSocialAccounts.propTypes = {
  translate: PropTypes.object.isRequired,
  social: PropTypes.object.isRequired,
}

export default ExtendRelationsSocialAccounts