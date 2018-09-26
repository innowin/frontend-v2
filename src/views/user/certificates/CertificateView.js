// @flow
import type {certificateType} from "../../../consts/flowTypes/user/others";
import PropTypes from "prop-types";
import EditIcon from "../../../images/common/edit.svg";
import starIcon from "../../../images/common/star_svg";
import * as React from "react";

type PropsCertificateView = {
  showEdit: Function,
  certificate: certificateType,
}

const CertificateView = (props: PropsCertificateView) => {

  const {certificate, showEdit} = props
  return (
      <div className="col-6 text-center certificate-col">
        <div className="row">
          <div className="col certificate">
            <div className="content">
              <div className="editButton">
                <div onClick={showEdit}><EditIcon/></div>
              </div>
              <img className="certImage" alt="" src={certificate.certificate_logo_file}/>
              <h5>{certificate.title}</h5>
              <a className="shareButton">{starIcon}</a>
              <span>&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
  )
}

CertificateView.propTypes = {
  showEdit: PropTypes.func.isRequired,
  certificate: PropTypes.object.isRequired,
}

export default CertificateView