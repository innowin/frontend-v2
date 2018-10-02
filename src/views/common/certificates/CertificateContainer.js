// @flow
import * as React from "react";
import CertificateActions from "../../../redux/actions/commonActions/certificateActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import type {certificateType} from "../../../consts/flowTypes/user/others";
import {bindActionCreators} from "redux";
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {Certificate} from './Certificate'
import {Component} from "react";
import {userCertificatesSelector} from "../../../redux/selectors/common/certificate/userCertificatesSelector";
import CertificateIcon from "../../../images/user/certificate_svg";
import type {paramType} from "../../../consts/flowTypes/paramType";
import constants from "src/consts/constants"

type PropsCertificates = {
  ownerId: number,
  identityId: number,
  identityType: string,
  certificates: (certificateType)[],
  translate: { [string]: string },
  actions: {
    getCertificatesByIdentity: Function,
    updateCertificate: Function,
    deleteCertificate: Function,
  },
  isLoading: boolean,
  error: string,
  param: paramType,
}

export class CertificateContainer extends Component<PropsCertificates> {
  static propTypes = {
    ownerId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    certificates: PropTypes.array.isRequired,
    identityId: PropTypes.number.isRequired,
    identityType: PropTypes.string.isRequired,
    actions: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    param: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const {actions, identityId, ownerId, identityType} = this.props
    const {getCertificatesByIdentity} = actions
    getCertificatesByIdentity({identityId, certificateOwnerId: ownerId, certificateOwnerType: identityType})
  }

  render() {
    const {translate, certificates, actions, param} = this.props
    const {updateCertificate, deleteCertificate} = actions

    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <ItemWrapper icon={<CertificateIcon/>}>
          <ItemHeader title={translate['Certificates']}/>
          {
            /*<div className="certificates-wrapper">*/
            certificates.map((certificate) => (
                <Certificate
                    certificate={certificate}
                    translate={translate}
                    updateCertificate={updateCertificate}
                    deleteCertificate={deleteCertificate}
                    key={"certificate" + certificate.id}
                    param={param}
                />
            ))
            /*</div>*/
          }
        </ItemWrapper>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {ownerId, identityType} = ownProps
  const stateOwner = (identityType === constants.USER_TYPES.PERSON) ? state.users.list[ownerId] :
    state.organs.list[ownerId]
  const defaultObject = {content: [], isLoading: false, error: null}
  const certificateObject = (stateOwner && stateOwner.certificates) || defaultObject
  return {
    certificates: userCertificatesSelector(state, ownProps),
    param: state.param,
    translate: state.intl.messages,
    isLoading: certificateObject.isLoading,
    error: certificateObject.error,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCertificatesByIdentity: CertificateActions.getCertificatesByIdentity,
    updateCertificate: CertificateActions.updateCertificate,
    deleteCertificate: CertificateActions.deleteCertificate,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CertificateContainer)