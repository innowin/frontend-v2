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
  certificates: [certificateType],
  createCertificate: Function,
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

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, certificates, createCertificate} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            !!isEdit
                ? <CertificateForm createCertificate={createCertificate} toggleEdit={this._toggleEdit}
                                   translate={translate} owner={owner}/>
                : <CertificateView certificates={certificates} owner={owner} translate={translate}
                                   toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Certificate