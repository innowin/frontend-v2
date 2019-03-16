// @flow
import * as React from 'react'
import CardContainer from '../../cardContainer'
import DescriptionView from './DescriptionView'
import DescriptionForm from './DescriptionForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  organization: identityType,
  translate: TranslatorType,
}

type States = {
  isEdit: boolean,
}

class Description extends React.Component<Props, States> {
  state = {
    isEdit: false,
  }

  render () {
    const {organization, translate} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            !!isEdit
                ? <DescriptionForm/>
                : <DescriptionView organization={organization} translate={translate}/>
          }
        </CardContainer>
    )
  }
}

export default Description