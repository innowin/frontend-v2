import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CertificateEditForm} from './forms';
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {certificateIcon, starIcon} from "src/images/icons";
//TODO amir share icon
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
			<div className="col text-center container-fluid">
				<div className="row">
					<div className="col certificate">
						<div className="content">
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
		const {certificate} = this.state;
		if (this.state.edit) {
			return <CertificateItemWrapper>
				<CertificateEditForm
					certificate = {certificate}
					hideEdit = {this.hideEdit}
					updateStateForView = {this.updateStateForView}
					remove = {this.props.deleteCertificate}
					update = {this.props.updateCertificate}
				/>
			</CertificateItemWrapper>;
		}
		return <CertificateView certificate={certificate} showEdit={this.showEdit}/>;
	}
}
