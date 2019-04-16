// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import CheckOwner from '../../../common/CheckOwner'

type ContactProps = {
  organization: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
}

const ContactView = (props: ContactProps) => {
  const {organization, translate, toggleEdit} = props
  return (
      <React.Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Call']}
          </div>
          <CheckOwner id={organization.id}>
            <div className='edit-button pulse' onClick={toggleEdit}>
              {translate['Edit']}
            </div>
          </CheckOwner>
        </div>
        <div className="content">
          <div className='detail-row'>
            <p className='title'>{translate['Address']}</p>
            <p className='value'>{organization.address}</p>
          </div>
          <div className='detail-row'>
            <p className='title'>{translate['Phone']}</p>
            <p className='value'>{organization.phone}</p>
          </div>
          <div className='detail-row'>
            <p className='title'>{translate['Web site']}</p>
            <p className='value'>{organization.web_site}</p>
          </div>
          <div className='detail-row'>
            <p className='title'>{translate['Email']}</p>
            <p className='value'>{organization.email}</p>
          </div>
        </div>
      </React.Fragment>
  )
}

export default ContactView