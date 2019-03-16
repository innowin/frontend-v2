// @flow
import * as React from "react";
import {Fragment} from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type DescriptionProps = {
  organization: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
}

export default (props: DescriptionProps) => {
  const {organization, translate, toggleEdit} = props
  return (
      <Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Organization biography']}
          </div>
          <div className='edit-button pulse' onClick={toggleEdit}>
            {translate['Edit']}
          </div>
        </div>
        <div className="content">
          {organization.biography}
        </div>
      </Fragment>
  )
}