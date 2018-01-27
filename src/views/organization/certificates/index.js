/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Certificate, CertificateItemWrapper} from "./view";
import {CertificateCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup} from "../../common/cards/Frames";
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/user/certificate.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"

// TODO amir everything!
// TODO amir backend is not ready
export class CertificateContainer extends Component {
	constructor(props){
		super(props);
	}
	componentWillReceiveProps(props){
			const {certificate} = props;
			this.setState ({...this.state ,certificate:certificate || {}});
	}
	delete_ = (certificateId) => {
		const {organizationId} = this.props;
		return deleteCertificate({certificateId, organizationId});
	};
	update_ = (formValues, certificateId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
		return updateCertificate(formValues,certificateId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res, error, isLoading) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, certificate:res, error:error, isLoading:isLoading});
	};

	render() {
		const {certificate} = this.state;
		return <Certificate
			certificate={certificate}
			updateStateForView={this._updateStateForView}
			deleteCertificate={this.delete_}
			updateCertificate={this.update_}
		/>;
	}
}

export class CertificateList extends Component {
	static propTypes = {
			hideCreateForm: PropTypes.func.isRequired,
			createForm: PropTypes.bool.isRequired,
	};

	create = (formValues,hideEdit) => {
			const {organizationId, certificateId} = this.props;
			return createCertificate({formValues, organizationId, certificateId, hideEdit});
	};

	render() {
		const {  organizationId, createForm, updateStateForView} = this.props;
		var {certificates} = this.props ;
		return <ListGroup>
			{createForm &&
			<CertificateItemWrapper>
					<CertificateCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</CertificateItemWrapper>}
			{
				certificates.map(cert => <CertificateContainer
					certificate={cert}
					updateStateForView = {updateStateForView}
					organizationId={organizationId}
					key={cert.id}
				/>)
			}
		</ListGroup>;
	}
}

export class Certificates extends Component {

	constructor(props){
		super(props);
		this.state = {createForm: false, edit:false, isLoading:false, error:null, certificates:[]};
	}
	static propTypes = {
		organizationId: PropTypes.string.isRequired
	};

	componentDidMount(){
		const {organizationId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/certificates/${organizationId}`,
					result: `OrganizationCertificates-get/${organizationId}`,
					token: "",
				}
			);
		};

		emitting();

		socket.on(`UserCertificates-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, certificates: res instanceof Array ? res : [], isLoading: false};
				this.setState(newState);
			}

		});
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};
	updateStateForView = (error,isLoading) =>{
		this.setState({...this.state, error:error, isLoading:isLoading})
	}

	render() {
		const {  organizationId} = this.props;
		const {createForm, certificates} = this.state;
		return <div>
			<CategoryTitle
				title={__('Certificates')}
				showCreateForm={this.showCreateForm}
				createForm={createForm}
			/>
			<FrameCard>
				<CertificateList
					updateStateForView={this.updateStateForView}
					certificates={certificates}
					organizationId={organizationId}
					createForm={createForm}
					hideCreateForm={this.hideCreateForm}
				/>
			</FrameCard>
		</div>;
	}
}
export default Certificates;