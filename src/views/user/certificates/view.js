import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CertificateEditForm} from './forms';
import {ItemHeader, ItemWrapper, VerifyWrapper} from "../../common/cards/Frames";
import {certificateIcon, starIcon,editIcon} from "src/images/icons";
//TODO amir share icon image
export const CertificateItemWrapper = ({children}) => {
	return <ItemWrapper icon={certificateIcon}>{children}</ItemWrapper>;
};

export class CertificateView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		certificate: PropTypes.object.isRequired,
	};

	render() {

		const {certificate, showEdit} = this.props;
		console.log(certificate)
		return (
			<div className="col-6 text-center container-fluid">
				<div className="row">
					<div className="col certificate">
						<div className="content">
							<div className="editButton">
								<div onClick={showEdit}>{editIcon}</div>
							</div>
							<img className="certImage" alt="" src={certificate.picture_media || "/static/media/defaultImg.94a29bce.png"} />
							<h5>{certificate.title}</h5>	
							<a className="shareButton">{starIcon}</a>
							<span>&nbsp;</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export class Certificate extends Component {
	constructor(props){
		super(props);
		const {certificate} = props;
		this.state = {edit: false, certificate:certificate};
	}
	componentWillReceiveProps(props){
		const {certificate} = props;
		this.setState({...this.state, certificate:certificate})
	}

	static propTypes = {
		updateCertificate: PropTypes.func.isRequired,
		deleteCertificate: PropTypes.func.isRequired,
		certificate: PropTypes.object.isRequired,
		updateStateForView:PropTypes.func.isRequired
	};

	showEdit = () => {
		this.setState({edit: true});
	};

	hideEdit = () => {
		this.setState({edit: false});
	};

	updateStateForView = (res, error,isLoading) =>{
		const {updateStateForView} = this.props;
		this.setState({...this.state,certificate:res })
	}

	render() {
		const {certificate, isLoading, error} = this.state;
		// const {showEdit, isLoading, error} = this.props;
		if (this.state.edit) {
			return (
				<VerifyWrapper isLoading={isLoading} error={error}>
				<CertificateItemWrapper>
					<CertificateEditForm
						certificate = {certificate}
						hideEdit = {this.hideEdit}
						updateStateForView = {this.updateStateForView}
						remove = {this.props.deleteCertificate}
						update = {this.props.updateCertificate}
					/>
				</CertificateItemWrapper>;
				</VerifyWrapper >
			)
		}
		return (
			<VerifyWrapper isLoading={isLoading} error={error}>
			<CertificateView certificate={certificate} showEdit={this.showEdit}/>
			</VerifyWrapper>
		)
	}
}
