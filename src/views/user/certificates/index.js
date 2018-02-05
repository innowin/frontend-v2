/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Certificate, CertificateItemWrapper} from "./view";
import {CertificateCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, ItemWrapper, ItemHeader} from "../../common/cards/Frames";
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/user/certificate.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from '../../../consts/data'

//TODO amir editform not implemtend in new version
export class CertificateContainer extends Component {
		componentWillReceiveProps(props){
			const {certificate} = props;
			this.setState ({...this.state ,certificate:certificate});
	}
	delete_ = (certificateId) => {
		const {userId} = this.props;
		return deleteCertificate({certificateId, userId});
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
		const {certificate} = this.props;
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
			const {userId, certificateId} = this.props;
			return createCertificate({formValues, userId, certificateId, hideEdit});
	};

	render() {
		const {  userId, createForm, updateStateForView} = this.props;
		const {certificates,badges} = this.props;
		return <ListGroup>
			{createForm &&
			<CertificateItemWrapper>
					<CertificateCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</CertificateItemWrapper>}
			<CertificateItemWrapper>
				<ItemHeader title={__('Certificates')} />
				<div className="row align-items-center">
				{
					certificates.map(cert => <CertificateContainer
						certificate={cert}
						updateStateForView = {updateStateForView}
						userId={userId}
						key={cert.id}
					/>)
				}
				</div>
			</CertificateItemWrapper>
		</ListGroup>;
	}
}

export class Certificates extends Component {

	constructor(props){
		super(props);
		this.state = {createForm: false, edit:false, isLoading:false, error:null,badges:[], certificates:[]};
	}
	static propTypes = {
		userId: PropTypes.string.isRequired
	};

	componentDidMount(){
		const {userId } = this.props;
		const token = TOKEN;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/users/certificates/?certificate_user=${userId}`,
					result: `UserCertificates-get/${userId}`,
					token: token,
				}
			);
			socket.emit(REST_REQUEST,
			{
				method:"get",
				url:`${url}/users/badges/?badge_user=${userId}`,
				result :`UserBadges-get/${userId}`,
				token:TOKEN
			})
		};

		emitting();

		socket.on(`UserCertificates-get/${userId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, certificates: res, isLoading: false};
				this.setState(newState);
			}

		});
		socket.on(`UserBadges-get/${userId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, badges: res, isLoading: false};
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
		const {  userId} = this.props;
		const {createForm, certificates, badges} = this.state;
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
					userId={userId}
					createForm={createForm}
					hideCreateForm={this.hideCreateForm}
				/>
			</FrameCard>
		</div>;
	}
}
export default Certificates;