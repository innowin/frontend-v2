// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import CardContainer from '../cardContainer'
import CertificateForm from './CertificateForm'
import CertificateView from './CertificateView'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  getCertificatesByIdentity: Function,
  certificates: [certificateType],
  createCertificate: Function,
  updateCertificate: Function,
  files: { [number]: fileType },
}

type States = {
  isEdit: boolean,
}

class Certificate extends React.Component<Props, States> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    getCertificatesByIdentity: PropTypes.func.isRequired,
    certificates: PropTypes.array.isRequired,
    createCertificate: PropTypes.func.isRequired,
    updateCertificate: PropTypes.func.isRequired,
    files: PropTypes.func.isRequired,
  }

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