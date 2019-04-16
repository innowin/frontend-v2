// @flow
import * as React from 'react'
import CardContainer from '../../../common/cardContainer'
import CertificateView from './CertificateView'
import CertificateForm from './CertificateForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {fileType} from 'src/consts/flowTypes/common/fileType'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  getCertificatesByIdentity: Function,
  certificates: [certificateType],
  createCertificate: Function,
  updateCertificate: Function,
  files: [fileType],
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
    const {owner, translate, createCertificate, files, updateCertificate} = this.props
    const {isEdit} = this.state

    const certificates = [
      {
        id: 1,
        title: 'اولی',
        certificate_parent: 5692,
        certificate_picture: 4149,
        certificate_logo: 4173,
        created_time: "2019-03-22T14:36:10.964533Z",
      }
    ]
    return (
        <CardContainer>
          {
            !!isEdit
                ? <CertificateForm createCertificate={createCertificate} toggleEdit={this._toggleEdit}
                                   translate={translate} owner={owner}/>
                : <CertificateView updateCertificate={updateCertificate} files={files} certificates={certificates} owner={owner} translate={translate}
                                   toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Certificate