// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

import CheckOwner from '../../../common/CheckOwner'
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
          <CheckOwner id={organization.id}>
            <div id='editBiography' className='edit-button pulse' onClick={toggleEdit}>
              {translate['Edit']}
            </div>
          </CheckOwner>
        </div>
        <div className="content">
          {organization.biography}
        </div>
      </React.Fragment>
  )
}

DescriptionView.propTypes = {
  organization: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  toggleEdit: PropTypes.func.isRequired,
}

export default DescriptionView