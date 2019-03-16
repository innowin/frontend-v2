// @flow
import * as React from 'react'
import CardContainer from '../../cardContainer'
import ContactView from './ContactView'
import ContactForm from './ContactForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  organization: identityType,
  translate: TranslatorType,
}

type States = {
  isEdit: boolean,
}

class Contact extends React.Component<Props, States> {
  state = {
    isEdit: false,
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render () {
    const {organization, translate} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            !!isEdit
                ? <ContactForm/>
                : <ContactView organization={organization} translate={translate} toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Contact