// @flow
import {Component} from "react";
import PropTypes from "prop-types";
import {VerifyWrapper} from "../../common/cards/Frames";
import CertificateView from "./CertificateView"
import {CertificateEditForm} from "./CertificateEditForm";
import * as React from "react";
import type {certificateType} from "../../../consts/flowTypes/user/others";
import type {paramType} from "../../../consts/flowTypes/paramType";

type PropsCertificate = {
  certificate: certificateType,
  updateCertificate: Function,
  deleteCertificate: Function,
  translate: { [string]: string },
  param: paramType,
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
    param: PropTypes.object.isRequired,
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
    const certificateIdentity = certificate.certificate_identity
    const certificateIdentityUserId = certificateIdentity.identity_user
      && (certificateIdentity.identity_user.id || certificateIdentity.identity_user)
    const certificateIdentityOrganId = certificateIdentity.identity_organization
      && (certificateIdentity.identity_organization.id || certificateIdentity.identity_organization)
    const certificateParentType = (certificateParent && certificateParent.child_name) || null
    const certificateParentId = (certificateParent && certificateParent.id) || null
    const certificateOwnerId = certificateIdentityUserId || certificateIdentityOrganId
    deleteCertificate({
      certificateId: certificate.id,
      certificateOwnerId,
      certificateParentId,
      certificateParentType
    })
  }

  render() {
    const {edit} = this.state
    const {translate, certificate, updateCertificate, param} = this.props

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
          : <CertificateView certificate={certificate}
                             showEdit={this._showEdit}
                             param={param}/>
        }
      </VerifyWrapper>
    )
  }
}