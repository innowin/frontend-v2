// @flow
import * as React from "react";
import {Fragment} from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type ContactProps = {
  organization: identityType,
  translate: TranslatorType,
}

export default (props: ContactProps) => {
  const {organization, translate} = props
  return (
      <Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Call']}
          </div>
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
      </Fragment>
  )
}