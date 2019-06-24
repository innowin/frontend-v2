//@flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Catalog from './catalog'
import Certificate from '../../common/newCertificate'
import CertificateActions from 'src/redux/actions/commonActions/certificateActions'
import Contact from './contact'
import Description from './description'
import ModalActions from 'src/redux/actions/modalActions'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {identityType} from 'src/consts/flowTypes/identityType'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {userCertificatesSelector} from 'src/redux/selectors/common/certificate/userCertificatesSelector'
import {getProductsSelector} from 'src/redux/selectors/common/product/userGetProductSelector'
import Products from '../../user/aboutMe/product/Products'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import getSearchedOrganizationsSelector from 'src/redux/selectors/organization/getOrganizationsFilterByOfficialName'

type OrganAboutUsProps = {
  certificates: [certificateType],
  products: [Object],
  organization: identityType,
  translate: TranslatorType,
  actions: {
    getCertificatesByIdentity: Function,
    showModal: Function,
    updateOrganization: Function,
    createCertificate: Function,
    deleteCertificate: Function,
    updateCertificate: Function,
    updateUser: Function,
    deleteFile: Function,
  },
}

const OrganAboutUs = (props: OrganAboutUsProps) => {
  const {translate, user, actions, products, certificates, searchedOrganizations} = props
  const {
    getCertificatesByIdentity, updateOrganization, createCertificate, updateCertificate,
    deleteCertificate, updateUser, deleteFile, emptySearchedOrganization, getOrganizationsFilterByOfficialName,
  } = actions
  return (
      <div className="about-us">
        <Description updateOrganization={updateOrganization} translate={translate} organization={user}/>

        <Products translate={translate} products={products}/>

        <Certificate deleteCertificate={deleteCertificate} updateCertificate={updateCertificate}
                     translate={translate} owner={user}
                     certificates={certificates} getCertificatesByIdentity={getCertificatesByIdentity}
                     createCertificate={createCertificate} emptySearchedOrganization={emptySearchedOrganization}
                     getOrganizationsFilterByOfficialName={getOrganizationsFilterByOfficialName}
                     searchedOrganizations={searchedOrganizations}/>

        <Contact updateOrganization={updateOrganization} translate={translate} organization={user}/>

        <Catalog updateUser={updateUser} translate={translate} owner={user} deleteFile={deleteFile}/>

        {/*<Hashtags updateUser={updateUser} translate={translate} owner={user} deleteFile={deleteFile}/>*/}
      </div>
  )
}

OrganAboutUs.propTypes = {
  certificates: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    translate: getMessages(state),
    certificates: userCertificatesSelector(state, ownProps),
    products: getProductsSelector(state, {ownerId: ownProps.userId}),
    searchedOrganizations: getSearchedOrganizationsSelector(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCertificatesByIdentity: CertificateActions.getCertificatesByIdentity,
    showModal: ModalActions.showModal,
    updateOrganization: OrganizationActions.updateOrganization,
    createCertificate: CertificateActions.createCertificate,
    deleteCertificate: CertificateActions.deleteCertificate,
    updateCertificate: CertificateActions.updateCertificate,
    updateUser: updateUserByUserIdAction.updateUser,
    deleteFile: FileActions.deleteFile,
    emptySearchedOrganization: OrganizationActions.emptySearchedOrganization,
    getOrganizationsFilterByOfficialName: OrganizationActions.getOrganizationsFilterByOfficialName,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganAboutUs)