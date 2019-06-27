// @flow
import type {certificateType} from "../../../consts/flowTypes/user/others";
import * as PropTypes from 'prop-types';
import {EditIcon, CertificateTick} from "../../../images/icons";
import * as React from "react";
import CheckOwner from "../../common/CheckOwner";
import type {paramType} from "../../../consts/flowTypes/paramType";
import {Link} from "react-router-dom";

type PropsCertificateView = {
  showEdit: Function,
  certificate: certificateType,
  param: paramType,
}

const CertificateView = (props: PropsCertificateView) => {

  const {certificate, showEdit, param} = props
  const urlLink = certificate.certificate_identity.identity_user
      ? `/user/${certificate.certificate_identity.identity_user}`
      : `/organization/${certificate.certificate_identity.identity_organization}`
  const paramId = param.user || param.organization

  //FixMe: mohammad certificate name need to change
  return (
      <div className="certificate-wrapper">
        <CheckOwner id={paramId}>
          <div className="-item-edit-btn -item-edit-contribution pulse" onClick={showEdit}>
            <EditIcon/>
          </div>
        </CheckOwner>
        <div className='content'>
          <div className='header'>
            <h5 className='certificate-title'>{certificate.title}</h5>
            {certificate.validation_flag &&
            <CertificateTick className='tick-icon'/>
            }
          </div>
          <Link to={urlLink}>
            <p className='certificate-parent-name'>{certificate.certificate_identity.name}</p>
          </Link>
        </div>
        <div className='logo-container'>
          <img className="cert-image" alt="" src={certificate.certificate_logo.file}/>
        </div>
      </div>
  )
}

CertificateView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  certificate: PropTypes.object.isRequired,
  param: PropTypes.object.isRequired,
}

export default CertificateView