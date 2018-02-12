/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {CheckBox} from "../../common/inputs/CheckBox";
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {TextareaInput} from "../../common/inputs/TextareaInput";
import {TextInput} from "../../common/inputs/TextInput";
import {FileInput} from "src/views/common/inputs/FileInput";


export class CertificateForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        certificate: PropTypes.object,
    };

    _getValues = () => {
        const media = this.certificatePictureInput.getFile();
        const mediaId = media ? media.id : null;
        
        return {
            title: this.certificateTitleInput.getValue(),
            picture_media: mediaId,
        };
    };

    _formValidate = () => {
        let result = true;
        const validates = [
            this.certificateTitleInput.validate(),
            this.certificatePictureInput.validate()
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
        const {onSubmit} = this.props;
        const certificate = this.props.certificate || {};
				return (
					<form onSubmit={this.props.onSubmit}>
						<div className="row">
							<TextInput
                                name="title"
                                label={__('Title') + ": "}
                                value={certificate.title}
                                ref={certificateTitleInput => {
                                    this.certificateTitleInput = certificateTitleInput
                                }}
							/>
							<FileInput
								label={__('Picture') + ": "}
								mediaId={certificate.picture}
								ref={certificatePictureInput => {
									this.certificatePictureInput = certificatePictureInput
								}}
							/>
							{this.props.children}
						</div>
					</form>
				)
    }
}


export class CertificateCreateForm extends Component {

    static propTypes = {
        create: PropTypes.func.isRequired,
        hideCreateForm: PropTypes.func.isRequired
    };

    _save = () => {
        const {create, hideCreateForm} = this.props;
        const formValues = this.form._getValues();
        return create(formValues, hideCreateForm);
    };

    _onSubmit = (e) => {
        e.preventDefault();
        if (this.form._formValidate()) {
            this._save()
        }
        return false;
    };

    render() {
        const {hideCreateForm} = this.props;
        return <CertificateForm onSubmit={this._onSubmit} ref={form => {
            this.form = form
        }}>
            <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
                    {__('Cancel')}
                </button>
                <button type="submit" className="btn btn-success">{__('Create')}</button>
            </div>
        </CertificateForm>;
    }
}
export class CertificateEditForm extends Component {

    static propTypes = {
        update: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        hideEdit: PropTypes.func.isRequired,
        certificate: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {confirm: false};
    }

    _showConfirm = () => {
        this.setState({confirm: true})
    };

    _cancelConfirm = () => {
        this.setState({confirm: false})
    };

    _remove = () => {
        const certificateId = this.props.certificate.id;
        const {user, hideEdit} = this.props;
        return this.props.remove(certificateId,user.id, hideEdit)
    };

    _save = () => {
        const {certificate, updateStateForView, hideEdit} = this.props;
        const certificateId = certificate.id;
        const formValues = this.form._getValues();
        return this.props.update(formValues, certificateId, updateStateForView, hideEdit)
    };

    _onSubmit = (e) => {
        e.preventDefault();
        this._save();
    };

    render() {
        const {confirm} = this.state;
        const {hideEdit, certificate} = this.props;
        if (confirm) {
            return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
        }
        return <CertificateForm onSubmit={this._onSubmit} certificate={certificate}
                         ref={form => {
                             this.form = form
                         }}>
            <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                    {__('Delete')}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                    {__('Cancel')}
                </button>
                <button type="submit" className="btn btn-success">{__('Save')}</button>
            </div>
        </CertificateForm>;
    }
}