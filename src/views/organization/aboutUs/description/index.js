// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import DescriptionForm from './DescriptionForm'
import DescriptionView from './DescriptionView'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  organization: identityType,
  translate: TranslatorType,
  updateOrganization: Function,
}

type States = {
  isEdit: boolean,
}

class Description extends React.Component<Props, States> {
  static propTypes = {
    organization: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    updateOrganization: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {organization, translate, updateOrganization} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            isEdit
                ? <DescriptionForm updateOrganization={updateOrganization} toggleEdit={this._toggleEdit}
                                   organization={organization} translate={translate}/>
                : <DescriptionView toggleEdit={this._toggleEdit} organization={organization} translate={translate}/>
          }
        </CardContainer>
    )
  }
}

export default Description