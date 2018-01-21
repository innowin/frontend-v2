/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Certificate, CertificateItemWrapper} from "./view";
import {CertificateCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup} from "../../common/cards/Frames";
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/user/certificate.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"

export class CertificateContainer extends Component {
    delete_ = (certificateId) => {
        const {  userId} = this.props;
        return deleteCertificate({certificateId, userId});
    };
    update_ = (formValues, certificateId) => {
        const revisedCertificate = {...formValues, id:certificateId};
        return updateCertificate({revisedCertificate});
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

export class CertificateList extends Component {
	static propTypes = {
			hideCreateForm: PropTypes.func.isRequired,
			createForm: PropTypes.bool.isRequired,
	};
	create = (formValues) => {
			const {userId, certificateId} = this.props;
			return createCertificate({formValues, userId, certificateId});
	};

	render() {
		const {  userId, createForm} = this.props;
		const {certificates} = this.props;
		return <ListGroup>
			{createForm &&
			<CertificateItemWrapper>
					<CertificateCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</CertificateItemWrapper>}
			{
				certificates.map(cert => <CertificateContainer
					certificate={cert}
					userId={userId}
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
		userId: PropTypes.string.isRequired
	};

	componentDidMount(){
		const {userId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/users/certificates/?certificate_user=${userId}`,
					result: `UserCertificates-get/${userId}`,
					token: "",
				}
			);
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
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};

	render() {
			const {  userId} = this.props;
			const {createForm, certificates} = this.state;
			return <div>
					<CategoryTitle
							title={__('Certificates')}
							showCreateForm={this.showCreateForm}
							createForm={createForm}
					/>
					<FrameCard>
							<CertificateList
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