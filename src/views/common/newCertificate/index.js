// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import CardContainer from '../cardContainer'
import CertificateForm from './CertificateForm'
import CertificateView from './CertificateView'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  getCertificatesByIdentity: Function,
  certificates: [certificateType],
  createCertificate: Function,
  updateCertificate: Function,
  deleteCertificate: Function,
  emptySearchedOrganization: Function,
  getOrganizationsFilterByOfficialName: Function,
  searchedOrganizations: [organizationType],
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
    deleteCertificate: PropTypes.func.isRequired,
    emptySearchedOrganization: PropTypes.func.isRequired,
    getOrganizationsFilterByOfficialName: PropTypes.func.isRequired,
    searchedOrganizations: PropTypes.array.isRequired,
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
    const {
      owner, translate, createCertificate, updateCertificate, deleteCertificate, certificates,
      getOrganizationsFilterByOfficialName, searchedOrganizations, emptySearchedOrganization,
    } = this.props
    const {isEdit} = this.state
    return (
        <CardContainer>
          {
            isEdit
                ? <CertificateForm createCertificate={createCertificate} toggleEdit={this._toggleEdit}
                                   translate={translate} owner={owner}
                                   getOrganizationsFilterByOfficialName={getOrganizationsFilterByOfficialName}
                                   searchedOrganization={searchedOrganizations}
                                   emptySearchedOrganization={emptySearchedOrganization}/>
                : <CertificateView updateCertificate={updateCertificate} certificates={certificates}
                                   owner={owner} translate={translate} toggleEdit={this._toggleEdit}
                                   getOrganizationsFilterByOfficialName={getOrganizationsFilterByOfficialName}
                                   searchedOrganization={searchedOrganizations}
                                   emptySearchedOrganization={emptySearchedOrganization}
                                   deleteCertificate={deleteCertificate}/>
          }
        </CardContainer>
    )
  }
}

export default Certificate