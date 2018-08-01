/*global __*/
//@flow
import * as React from 'react'
import PropTypes from 'prop-types';
import {Certificate, CertificateItemWrapper} from "./view";
import {CertificateCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames";
// import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/organization/certificate.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"
import OrganizationActions from '../../../redux/actions/organizationActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
type CertificateContainerProps = {
	certificate:Object,
	organizationId: number,
}
export class CertificateContainer extends React.Component<CertificateContainerProps,{certificate:Object, error:boolean, isLoading:boolean}> {
	constructor(props:CertificateContainerProps){
		super(props);
		this.state = {certificate:{}, error:false, isLoading:false}
	}
	componentWillReceiveProps(props:CertificateContainerProps){
			const {certificate} = props;
			this.setState ({...this.state ,certificate:certificate});
	}
	delete_ = (certificateId:number, hideEdit:Function) => {	
		const {organizationId} = this.props;
		// return deleteCertificate(certificateId, organizationId,()=>{
		// },hideEdit,organizationId);
	};
	update_ = (formValues:Object, certificateId:number, updateStateForView:Function, hideEdit:Function) => {//formValues, careerId, updateStateForView, hideEdit
		updateStateForView(null,null,true);
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
	auth:Object,
	actions:Object
}
export class CertificateList extends React.Component<CertificateListProps> {

	create = (formValues:Object,hideEdit:Function) => {
			const {organizationId,auth, actions} = this.props;
			const{createCertificate} = actions
			return createCertificate(formValues, auth.client.identity.id, auth.client.identity.identity_user.id, hideEdit );
	};

	render() {
		const {  organizationId, createForm } = this.props;
		let {certificates} = this.props ;
		return <div>
			{createForm &&
			<CertificateItemWrapper>
					<CertificateCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</CertificateItemWrapper>}
			{
				certificates.map(cert => <CertificateContainer
					certificate={cert}
					organizationId={organizationId}
					key={cert.id}
				/>)
			}
		</div>;
	}
}

type CertificatesProps = {
	organizationId:number,
	actions:Object,
	organization:Object,
	auth:Object,
}
export class Certificates extends React.Component<CertificatesProps,
{createForm: boolean, edit:boolean}> {

	constructor(props:CertificatesProps){
		super(props);
		this.state = {createForm: false, edit:false};
	}

	componentDidMount(){
		const {auth} = this.props;
		const {getCertificates} = this.props.actions;
		getCertificates(auth.client.identity.id);
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};

	render() {
		const {  organizationId,organization, auth, actions} = this.props;
		const {createForm } = this.state;
		const certificates = organization.certificates;
		const {isLoading,error} = certificates;
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
							auth={auth}
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
const mapStateToProps = (state) => ({
	organization:state.organization,
	auth:state.auth
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		getCertificates: OrganizationActions.getOrgCertificates ,
		createCertificate : OrganizationActions.createCertificate
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Certificates)
