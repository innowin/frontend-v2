//@flow
import * as React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getMessages} from "src/redux/selectors/translateSelector";
import {TranslatorType} from "src/consts/flowTypes/common/commonTypes";
import Description from "./description";
import Certificate from "./certificate";
import Contact from './contact'
import Product from './product'
import type {identityType} from 'src/consts/flowTypes/identityType'
import CertificateActions from 'src/redux/actions/commonActions/certificateActions'
import {userCertificatesSelector} from 'src/redux/selectors/common/certificate/userCertificatesSelector'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import ModalActions from 'src/redux/actions/modalActions'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import type {fileType} from 'src/consts/flowTypes/common/fileType'

type OrganAboutUsProps = {
  certificates: [certificateType],
  products: [Object],
  files: [fileType],
  organization: identityType,
  translate: TranslatorType,
  actions: Object,
  organ: Object,
  showModal: Function,
}

const OrganAboutUs = (props: OrganAboutUsProps) => {
  const {translate, organization, actions, products, certificates, files} = props
  const {getCertificatesByIdentity, showModal, updateOrganization, createCertificate, updateCertificate} = actions
  return (
      <div className="about-us">
        <Description updateOrganization={updateOrganization} translate={translate} organization={organization}/>
        <Product showModal={showModal} products={products} translate={translate} owner={organization}/>
        <Certificate updateCertificate={updateCertificate} files={files} translate={translate} owner={organization} certificates={certificates}
                     getCertificatesByIdentity={getCertificatesByIdentity} createCertificate={createCertificate}/>
        <Contact updateOrganization={updateOrganization} translate={translate} organization={organization}/>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state),
    certificates: userCertificatesSelector(state, ownProps),
    files: state.common.file.list,
    products: [],
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCertificatesByIdentity: CertificateActions.getCertificatesByIdentity,
    showModal: ModalActions.showModal,
    updateOrganization: OrganizationActions.updateOrganization,
    createCertificate: CertificateActions.createCertificate,
    updateCertificate: CertificateActions.updateCertificate,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganAboutUs);