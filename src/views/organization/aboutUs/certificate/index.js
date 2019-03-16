// @flow
import * as React from 'react'
import CardContainer from '../../cardContainer'
import CertificateView from './CertificateView'
import CertificateForm from './CertificateForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {certificateType} from 'src/consts/flowTypes/user/others'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  getCertificatesByIdentity: Function,
  certificates: [certificateType]
}

type States = {
  isEdit: boolean,
}

class Certificate extends React.Component<Props, States> {
  state = {
    isEdit: false,
  }

  componentDidMount(): void {
    const {getCertificatesByIdentity, owner} = this.props
    getCertificatesByIdentity({
      identityId: owner.id,
      certificateOwnerId: owner.id,
    })
  }

  render() {
    const {owner, translate, getCertificatesByIdentity, certificates} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            !!isEdit
                ? <CertificateForm/>
                : <CertificateView certificates={certificates} getCertificatesByIdentity={getCertificatesByIdentity}
                                   owner={owner} translate={translate}/>
          }
        </CardContainer>
    )
  }
}

export default Certificate