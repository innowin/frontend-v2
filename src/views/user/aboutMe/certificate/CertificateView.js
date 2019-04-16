// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import CardRowContainer from 'src/views/common/components/CardRowContainer'
import {EditIcon, LinkedInIcon} from 'src/images/icons'
import CheckOwner from '../../../common/CheckOwner'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import CertificateForm from './CertificateForm'
import FontAwesome from 'react-fontawesome'

type CertificateProps = {
  owner: identityType,
  translate: TranslatorType,
  certificates: [certificateType],
  toggleEdit: Function,
  files: [fileType],
  updateCertificate: Function,
}

type CertificateStates = {
  isEdit: { [number]: boolean },
}

class CertificateView extends React.Component <CertificateProps, CertificateStates> {
  state = {
    isEdit: {},
  }

  _toggleEditCertificate(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  render() {
    const {translate, certificates, owner, toggleEdit, files, updateCertificate} = this.props
    const {isEdit} = this.state
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
                          ? <CardRowContainer key={'certificate ' + certificate.id} title={translate['Certificate']}
                                              svgImage={<LinkedInIcon/>} createdTime={certificate.created_time}
                              //entityImage={certificatePicture && files[certificatePicture]}>
                          >
                            <div className='card-row-content-right card-row-entity'>
                              <CheckOwner id={owner.id}>
                                <EditIcon className='edit-icon pulse'
                                          clickHandler={() => this._toggleEditCertificate(certificate.id)}/>
                              </CheckOwner>
                              {certificate.title}
                              {certificatePicture && files[certificatePicture] &&
                              <a className='attach-file' href={files[certificatePicture].file}>
                                <FontAwesome className='attach-file-icon' name='download'/>
                                {translate['Attached file']}
                              </a>
                              }
                            </div>
                          </CardRowContainer>
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