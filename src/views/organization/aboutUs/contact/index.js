// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import ContactForm from './ContactForm'
import ContactView from './ContactView'
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

class Contact extends React.Component<Props, States> {

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
            !!isEdit
                ? <ContactForm updateOrganization={updateOrganization} organization={organization} translate={translate}
                               toggleEdit={this._toggleEdit}/>
                : <ContactView organization={organization} translate={translate} toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Contact