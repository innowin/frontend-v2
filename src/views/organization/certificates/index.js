/*global __*/
//@flow
import * as React from 'react'
import PropTypes from 'prop-types';
import {Certificate, CertificateItemWrapper} from "./view";
import {CertificateCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames";
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/organization/certificate.js';
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
		return deleteCertificate(certificateId, organizationId,()=>{
		},hideEdit,organizationId);
	};
	update_ = (formValues:Object, certificateId:number, updateStateForView:Function, hideEdit:Function) => {//formValues, careerId, updateStateForView, hideEdit
		updateStateForView(null,null,true);
		return updateCertificate(formValues,certificateId, updateStateForView, hideEdit);
	};

	render() {
		const {certificate} = this.state;
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
	certificates: Array<Object>
}
export class CertificateList extends React.Component<CertificateListProps> {

	create = (formValues:Object,hideEdit:Function) => {
			const {organizationId} = this.props;
			return createCertificate(formValues, hideEdit, organizationId);
	};

	render() {
		const {  organizationId, createForm } = this.props;
		let {certificates} = this.props ;
		return <ListGroup>
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
		</ListGroup>;
	}
}

type CertificatesProps = {
	organizationId:number,
	actions:Object,
	organization:Object,
}
export class Certificates extends React.Component<CertificatesProps,
{createForm: boolean, edit:boolean}> {

	constructor(props:CertificatesProps){
		super(props);
		this.state = {createForm: false, edit:false};
	}

	componentDidMount(){
		const {organizationId } = this.props;
		const {getCertificates} = this.props.actions;
		getCertificates(organizationId);
		// const emitting = () => {
		// 	const newState = {...this.state, isLoading: true};
		// 	this.setState(newState);
		// 	socket.emit(REST_REQUEST,
		// 		{
		// 			method: "get",
		// 			url: `${url}/organizations/certificates/${organizationId}`,
		// 			result: `OrganizationCertificates-get/${organizationId}`,
		// 			token: "",
		// 		}
		// 	);

		// 	socket.emit(REST_REQUEST,
    //     {
    //       method: "get",
    //       url: `${url}/organizations/${organizationId}/`,
    //       result: `organization-Posts-get/${organizationId}`,
    //       token: TOKEN
    //     }
		// 	);
			
		// };

		// emitting();

		// socket.on(`UserCertificates-get/${organizationId}`, (res) => {
		// 	if (res.detail) {
		// 		const newState = {...this.state, error: res.detail, isLoading: false};
		// 		this.setState(newState);
		// 	}else{
		// 		const newState = {...this.state, certificates: res instanceof Array ? res : [], isLoading: false};
		// 		this.setState(newState);
		// 	}

		// });
		// socket.on(`organization-Posts-get/${organizationId}`, (res) => {
		// 	if (res.detail) {
		// 		const newState = {...this.state, error: res.detail, isLoading: false};
		// 		this.setState(newState);
		// 	} else {
		// 		const newState = {...this.state, organization: res, isLoading: false};
		// 		this.setState(newState);
		// 	}
		// });
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};

	render() {
		const {  organizationId,organization} = this.props;
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
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Certificates)
