//@flow
import * as React from "react"
import PropTypes from 'prop-types'
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import Certificate from "../../common/newCertificate";
import CertificateActions from 'src/redux/actions/commonActions/certificateActions'
import Contact from './contact'
import Description from "./description";
import ModalActions from 'src/redux/actions/modalActions'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {identityType} from 'src/consts/flowTypes/identityType'
import {getMessages} from "src/redux/selectors/translateSelector";
import {TranslatorType} from "src/consts/flowTypes/common/commonTypes";
import {userCertificatesSelector} from 'src/redux/selectors/common/certificate/userCertificatesSelector'
import {getProductsSelector} from '../../../redux/selectors/common/product/userGetProductSelector'
import Products from '../../user/aboutMe/product/Products'

type OrganAboutUsProps = {
  certificates: [certificateType],
  products: [Object],
  files: { [number]: fileType },
  organization: identityType,
  translate: TranslatorType,
  actions: {
    getCertificatesByIdentity: Function,
    showModal: Function,
    updateOrganization: Function,
    createCertificate: Function,
    deleteCertificate: Function,
    updateCertificate: Function,
  },
}

const OrganAboutUs = (props: OrganAboutUsProps) => {
  const {translate, organization, actions, products, certificates, files} = props
  const {
    getCertificatesByIdentity, updateOrganization, createCertificate, updateCertificate,
    deleteCertificate
  } = actions
  return (
      <div className="about-us">
        <Description updateOrganization={updateOrganization} translate={translate} organization={organization}/>
        <Products translate={translate} products={products}/>
        <Certificate deleteCertificate={deleteCertificate} updateCertificate={updateCertificate} files={files}
                     translate={translate} owner={organization}
                     certificates={certificates} getCertificatesByIdentity={getCertificatesByIdentity}
                     createCertificate={createCertificate}/>
        <Contact updateOrganization={updateOrganization} translate={translate} organization={organization}/>
      </div>
  )
}

OrganAboutUs.propTypes = {
  certificates: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  files: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state),
    certificates: userCertificatesSelector(state, ownProps),
    files: state.common.file.list,
    products: getProductsSelector(state, {ownerId: ownProps.userId}),
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCertificatesByIdentity: CertificateActions.getCertificatesByIdentity,
    showModal: ModalActions.showModal,
    updateOrganization: OrganizationActions.updateOrganization,
    createCertificate: CertificateActions.createCertificate,
    deleteCertificate: CertificateActions.deleteCertificate,
    updateCertificate: CertificateActions.updateCertificate,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganAboutUs);