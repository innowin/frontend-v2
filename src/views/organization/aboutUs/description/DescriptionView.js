// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  organization: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
}

const DescriptionView = (props: Props) => {
  const {organization, translate, toggleEdit} = props
  return (
      <React.Fragment>
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
      </React.Fragment>
  )
}

export default DescriptionView