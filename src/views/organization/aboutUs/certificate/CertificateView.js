// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import CardRowContainer from 'src/views/common/components/CardRowContainer'
import {EditIcon, LinkedInIcon} from '../../../../images/icons'
import CheckOwner from '../../../common/CheckOwner'

type CertificateProps = {
  owner: identityType,
  translate: TranslatorType,
  certificates: [certificateType],
  toggleEdit: Function,
}

const CertificateView = (props: CertificateProps) => {
  const {translate, certificates, owner, toggleEdit} = props
  return (
      <React.Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Certificate']}
          </div>
          <div className='add-button pulse' onClick={toggleEdit}>
            + {translate['Add']}
          </div>
        </div>

        <div className="content">
          {certificates.map(certificate => {
                const certificatePicture = certificate.certificate_picture
                return (
                    <CardRowContainer key={'certificate ' + certificate.id} title={translate['Certificate']}
                                      svgImage={<LinkedInIcon/>}>
                      <div className='card-row-content-right card-row-certificate'>
                        <CheckOwner id={owner.id}>
                          <EditIcon className='edit-icon pulse'/>
                        </CheckOwner>
                        {certificate.title}
                      </div>
                      {certificatePicture && certificatePicture.file &&
                      <img src={certificatePicture.file} className='card-row-content-image'
                           alt={translate['Certificate']}/>
                      }
                    </CardRowContainer>
                )
              }
          )}
        </div>
      </React.Fragment>
  )
}

export default CertificateView