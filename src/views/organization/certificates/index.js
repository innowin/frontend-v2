/*global __*/
//@flow
import * as React from 'react'
import {Certificate, CertificateItemWrapper} from "./view"
import {CertificateCreateForm} from "./forms"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import OrganizationActions from '../../../redux/actions/organization/organizationActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import type {identityStateObject} from "../../../consts/flowTypes/stateObjectType"


type CertificateContainerProps = {
  certificate: Object,
  organizationId: number,
}

export class CertificateContainer extends React.Component<CertificateContainerProps, { certificate: Object, error: boolean, isLoading: boolean }> {
  constructor(props: CertificateContainerProps) {
    super(props);
    this.state = {certificate: {}, error: false, isLoading: false}
  }

  componentWillReceiveProps(props: CertificateContainerProps) {
    const {certificate} = props;
    this.setState({...this.state, certificate: certificate});
  }

  delete_ = (certificateId: number, hideEdit: Function) => {
    const {organizationId} = this.props;
    // return deleteCertificate(certificateId, organizationId,()=>{
    // },hideEdit,organizationId);
  };
  update_ = (formValues: Object, certificateId: number, updateStateForView: Function, hideEdit: Function) => {//formValues, careerId, updateStateForView, hideEdit
    updateStateForView(null, null, true);
    // return updateCertificate(formValues,certificateId, updateStateForView, hideEdit);
  };

  render() {
    const {certificate} = this.props;
    return <Certificate
      certificate={certificate}
      deleteCertificate={this.delete_}
      updateCertificate={this.update_}
    />;
  }
}

type CertificateListProps = {
  hideCreateForm: Function,
  createForm: boolean,
  organizationId: number,
  certificates: Array<Object>,
  clientIdentity:identityStateObject,
  clientId: number,
  actions: Object
}

export class CertificateList extends React.Component<CertificateListProps> {

  create = (formValues: Object, hideEdit: Function) => {
    const {organizationId, clientId, clientIdentity, actions} = this.props;
    const {createCertificate} = actions
    return createCertificate(formValues, clientIdentity.content, clientId, hideEdit);
  };

  render() {
    const {organizationId, createForm} = this.props;
    let {certificates} = this.props;
    return <div className="row">
      {createForm &&
      <CertificateItemWrapper>
        <CertificateCreateForm hideEdit={this.props.hideCreateForm} create={this.create}/>
      </CertificateItemWrapper>}
      {
        certificates.map(cert =>
          cert != null ? <CertificateContainer
            certificate={cert}
            organizationId={organizationId}
            key={cert.id}
          /> : <span/>)
      }
    </div>;
  }
}

type CertificatesProps = {
  organizationId: number,
  actions: Object,
  organization: Object,
  clientIdentity: identityStateObject,
  clientId: number
}

export class Certificates extends React.Component<CertificatesProps, { createForm: boolean, edit: boolean }> {

  constructor(props: CertificatesProps) {
    super(props);
    this.state = {createForm: false, edit: false};
  }

  componentDidMount() {
    const {clientIdentity} = this.props;
    const {getCertificates} = this.props.actions;
    getCertificates(clientIdentity.content);
  }

  showCreateForm = () => {
    this.setState({createForm: true});
  }

  hideCreateForm = () => {
    this.setState({createForm: false});
  }

  render() {
    const {organizationId, organization, clientIdentity, clientId, actions} = this.props
    const {createForm} = this.state
    const certificates = organization.certificates
    const {isLoading, error} = certificates
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          <div>
            <CategoryTitle
              title={__('Certificates')}
              showCreateForm={this.showCreateForm}
              createForm={createForm}
            />
            <FrameCard>
              <CertificateList
                clientIdentity={clientIdentity}
                clientId={clientId}
                actions={actions}
                certificates={certificates.content}
                organizationId={organizationId}
                createForm={createForm}
                hideCreateForm={this.hideCreateForm}
              />
            </FrameCard>
          </div>
        }
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const client = state.auth.client
  const allIdentities = state.identities.list
  const clientIdentityId = client.identity.content
  const clientIdentity = (clientIdentityId && allIdentities[clientIdentityId]) ? allIdentities[clientIdentityId] : {
    content: null, isLoading: false, error: null
  }
  const clientId = clientIdentity.identity_user ? client.user.id : (client.organization ? client.organization.id : null)
  return {
    organization: state.organization,
    clientIdentity,
    clientId
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getCertificates: OrganizationActions.getOrgCertificates,
    createCertificate: OrganizationActions.createCertificate
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Certificates)
