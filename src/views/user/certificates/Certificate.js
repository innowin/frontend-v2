// @flow
import {Component} from "react";
import PropTypes from "prop-types";
import {VerifyWrapper} from "../../common/cards/Frames";
import CertificateView from "./CertificateView";
import {CertificateEditForm} from "./CertificateEditForm";
import * as React from "react";
import type {certificateType} from "../../../consts/flowTypes/user/others";
import constants from "../../../consts/constants";

type PropsCertificate = {
  certificate: certificateType,
  updateCertificate: Function,
  deleteCertificate: Function,
  translate: { [string]: string },
}

type StateCertificate = {
  edit: boolean,
}

export class Certificate extends Component<PropsCertificate, StateCertificate> {

  static propTypes = {
    certificate: PropTypes.object.isRequired,
    updateCertificate: PropTypes.func.isRequired,
    deleteCertificate: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
  }

  constructor(props: PropsCertificate) {
    super(props)
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _delete = () => {
    const {deleteCertificate, certificate} = this.props
    const certificateParent = certificate.certificate_parent
    const certificateIdentityUserId = certificate.certificate_identity.identity_user && certificate.certificate_identity.identity_user.id
    const certificateIdentityOrganId = certificate.certificate_identity.identity_organization && certificate.certificate_identity.identity_organization.id
    const certificateParentType = (certificateParent && certificateParent.child_name) || null
    const certificateParentId = (certificateParent && certificateParent.id) || null
    const certificateOwnerId = certificateIdentityUserId || certificateIdentityOrganId
    const certificateOwnerType = certificateIdentityUserId ? constants.USER_TYPES.PERSON : constants.USER_TYPES.ORG
    deleteCertificate({
      certificateId: certificate.id,
      certificateOwnerId,
      certificateOwnerType,
      certificateParentId,
      certificateParentType
    })
  }

  render() {
    const {edit} = this.state
    const {translate, certificate, updateCertificate} = this.props

    return (
        <VerifyWrapper isLoading={false} error={false}>
          {edit ?
              <CertificateEditForm
                  certificate={certificate}
                  hideEdit={this._hideEdit}
                  translate={translate}
                  deleteCertificate={this._delete}
                  update={updateCertificate}
              />
              : <CertificateView certificate={certificate} showEdit={this._showEdit}/>
          }
        </VerifyWrapper>
    )
  }
}