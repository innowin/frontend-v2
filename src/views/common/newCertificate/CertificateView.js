// @flow
import * as React from "react"
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import CertificateForm from './CertificateForm'
import CheckOwner from '../CheckOwner'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {EditIcon, LinkedInIcon} from 'src/images/icons'

type CertificateProps = {
  owner: identityType,
  translate: TranslatorType,
  certificates: [certificateType],
  toggleEdit: Function,
  files: { [number]: fileType },
  updateCertificate: Function,
  deleteCertificate: Function,
}

type CertificateStates = {
  isEdit: { [number]: boolean },
  isDelete: { [number]: boolean },
  isLoading: { [number]: boolean },
}

class CertificateView extends React.Component <CertificateProps, CertificateStates> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    certificates: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    updateCertificate: PropTypes.func.isRequired,
    deleteCertificate: PropTypes.func.isRequired,
  }

  state = {
    isEdit: {},
    isDelete: {},
    isLoading: {},
  }

  _toggleEditCertificate(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  _toggleDeleteCertificate(id: number) {
    let {isDelete} = this.state
    if (!isDelete[id]) {
      isDelete[id] = false
    }
    this.setState({...this.state, isDelete: {...isDelete, [id]: !isDelete[id]}})
  }

  _deleteCertificate = (id: number) => {
    const {deleteCertificate, owner} = this.props
    const {isLoading} = this.state
    !isLoading[id] && deleteCertificate({certificateId: id, userId: owner.id})

    this.setState({...this.state, isLoading: {...isLoading, [id]: true}})
  }

  render() {
    const {translate, certificates, owner, toggleEdit, files, updateCertificate} = this.props
    const {isEdit, isDelete} = this.state
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Certificate']}
            </div>
            <CheckOwner id={owner.id}>
              <div className='add-button pulse' onClick={toggleEdit}>
                + {translate['Add']}
              </div>
            </CheckOwner>
          </div>

          <div className="content">
            {certificates.map(certificate => {
                  const certificatePicture = certificate.certificate_picture
                  return (
                      !isEdit[certificate.id]
                          ? <React.Fragment key={'certificate ' + certificate.id}>
                            <CardRowContainer title={translate['Certificate']} svgImage={<LinkedInIcon/>}
                                              createdTime={certificate.created_time}
                                //entityImage={certificatePicture && files[certificatePicture]}>
                            >
                              <div className='card-row-content-right card-row-entity'>
                                <CheckOwner id={owner.id}>
                                  <EditIcon className='edit-icon pulse'
                                            clickHandler={() => this._toggleEditCertificate(certificate.id)}/>
                                  <FontAwesome className='trash-icon pulse' name='trash'
                                               onClick={() => this._toggleDeleteCertificate(certificate.id)}/>
                                </CheckOwner>
                                {certificate.title}
                                {certificatePicture && files[certificatePicture] &&
                                <a className='attach-file' href={files[certificatePicture].file}>
                                  <FontAwesome className='attach-file-icon' name='paperclip'/>
                                  {translate['Attached file']}
                                </a>
                                }
                              </div>
                            </CardRowContainer>
                            <ConfirmDeleteModal key={'delete certificate ' + certificate.id} translate={translate}
                                                closer={() => this._toggleDeleteCertificate(certificate.id)}
                                                deleteEntity={() => this._deleteCertificate(certificate.id)}
                                                open={isDelete[certificate.id]}/>
                          </React.Fragment>
                          : <CertificateForm key={'certificate form' + certificate.id} updateCertificate={updateCertificate}
                                             translate={translate} owner={owner} certificate={certificate}
                                             toggleEdit={() => this._toggleEditCertificate(certificate.id)}/>
                  )
                }
            )}
          </div>
        </React.Fragment>
    )
  }
}

export default CertificateView