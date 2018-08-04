/*global __*/
//@flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'src/views/common/inputs/TextInput'
import {FileInput} from 'src/views/common/inputs/FileInput';
import {Confirm} from "../../common/cards/Confirm";

type CertificateFormProps = {
	onSubmit: Function,
	certificate?: Object,
	organization?: Object,
	children: React.Node
}
export class CertificateForm extends React.Component<CertificateFormProps> {
	certPictureInput:any;
	titleInput : any;
	getValues =  () => {
		const media = this.certPictureInput.getFile();
        const mediaId = media ? media.id : -1;
		const values = {
				title: this.titleInput.getValue(),
				certificate_picture: mediaId, // TODO use media uploader
		};
		return values;
	};

	formValidate = () => {
			let result = true;
			const validates = [
					this.titleInput.validate(),
			];
			for (let i = 0; i < validates.length; i++) {
					if (validates[i]) {
							result = false;
							break;
					}
			}
			return result
	};

	render() {
			const {organization} = this.props||{};
			const certificate = this.props.certificate || {title:'', picture: null};
			return <form onSubmit={this.props.onSubmit}>
				<div className="row">
					<TextInput
							name="title"
							required
							label={__('Title') + ": "}
							value={certificate.title}
							ref={titleInput => {
								this.titleInput = titleInput
							}}
					/>
					<FileInput
							name="picture"
							label={__('Picture') + ": "}
							ref={certPictureInput => {
								this.certPictureInput = certPictureInput
							}}
							mediaId={certificate.picture}
							organization={organization}
					/>

					{this.props.children}
				</div>
			</form>
	}
}

type CertificateCreateFormProps = {
	create: Function,
	hideEdit: Function
}
export class CertificateCreateForm extends React.Component<CertificateCreateFormProps> {

	save = () => {
			const formValues = this.refs.form.getValues();
			const { hideEdit} = this.props;
			return this.props.create(formValues, hideEdit);
	};

	onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (this.refs.form.formValidate()) {
				this.save();
			}
	};

	render() {
			const {} = this.props;
			return <CertificateForm onSubmit={this.onSubmit} ref="form">
					<div className="col-12 d-flex justify-content-end">
							<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
									{__('Cancel')}
							</button>
							<button type="submit" className="btn btn-success">{__('Create')}</button>
					</div>
			</CertificateForm>;
	}
}

type CertificateEditFormProps = {
	update:Function,
	remove: Function,
	hideEdit:Function,
	certificate: Object,
}
export class CertificateEditForm extends React.Component<CertificateEditFormProps,{confirm:boolean}> {

	showConfirm = () => {
			this.setState({confirm: true})
	};

	cancelConfirm = () => {
		this.setState({confirm: false})
	};

	remove = () => {
		const{hideEdit} = this.props;
		const certificateId = this.props.certificate.id;
		return this.props.remove(certificateId,hideEdit)
	};

	save = () => {//(formValues, certificateId, updateStateForView, hideEdit
		const {certificate,hideEdit} = this.props;
		const certificateId = certificate.id;
		const formValues = this.refs.form.getValues();
		return this.props.update(formValues, certificateId, hideEdit)
	};

	onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault();
		this.save();
	};

	render() {
		const {confirm} = this.state;
		if (confirm) {
				return <Confirm cancelRemoving={this.cancelConfirm} remove={this.remove}/>;
		}

		const {certificate} = this.props;
		return <CertificateForm onSubmit={this.onSubmit} ref="form" certificate={certificate} >
				<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-outline-danger mr-auto" onClick={this.showConfirm}>
								{__('Delete')}
						</button>
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
								{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
				</div>
		</CertificateForm>;
	}
}
