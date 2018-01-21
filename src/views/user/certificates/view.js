import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CertificateEditForm} from './forms';
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {certificateIcon} from "src/images/icons";

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
		return <CertificateItemWrapper>
			<ItemHeader title={certificate.title} showEdit={showEdit}/>
			{certificate.picture &&
				<div className="w-100">
					<img src={certificate.picture.url} alt={certificate.title} className="media-show"/>
				</div>
			}
		</CertificateItemWrapper>
	}
}


export class Certificate extends Component {
	state = {edit: false};
	static propTypes = {
		updateCertificate: PropTypes.func.isRequired,
		deleteCertificate: PropTypes.func.isRequired,
		certificate: PropTypes.object.isRequired
	};

	showEdit = () => {
		this.setState({edit: true});
	};
	hideEdit = () => {
		this.setState({edit: false});
	};

	render() {
		const {certificate} = this.props;
		if (this.state.edit) {
			return <CertificateItemWrapper>
				<CertificateEditForm
						certificate={certificate}
						hideEdit={this.hideEdit}
						remove={this.props.deleteCertificate}
						update={this.props.updateCertificate}
				/>
			</CertificateItemWrapper>;
		}
		return <CertificateView certificate={certificate} showEdit={this.showEdit}/>;
	}
}
