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

type OrganAboutUsProps = {
  certificates: [certificateType],
  products: [Object],
  organization: identityType,
  translate: TranslatorType,
  actions: Object,
  organ: Object,
}

const OrganAboutUs = (props: OrganAboutUsProps) => {
  const {translate, organization, actions, products, certificates} = props
  const {getCertificatesByIdentity} = actions
  return (
      <div className="about-us">
        <Description translate={translate} organization={organization}/>
        <Product products={products} translate={translate} owner={organization}/>
        <Certificate translate={translate} owner={organization} certificates={certificates}
                     getCertificatesByIdentity={getCertificatesByIdentity}/>
        <Contact translate={translate} organization={organization}/>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    translate: getMessages(state),
    certificates: userCertificatesSelector(state, ownProps),
    products: [],
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCertificatesByIdentity: CertificateActions.getCertificatesByIdentity,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganAboutUs);