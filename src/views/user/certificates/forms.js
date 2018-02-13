/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {TextInput} from "src/views/common/inputs/TextInput"
import {FileInput} from "src/views/common/inputs/FileInput";
import {Confirm} from "../../common/cards/Confirm";


export class CertificateForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    certificate: PropTypes.object,
  };

  _getValues = () => {
    const media = this.certPictureInput.getFile();
    const mediaId = media ? media.id : null;
    return {
      title: this.titleInput.getValue(),
      picture_media: mediaId,
    }
  };

  _formValidate = () => {
    let result = true;
    const validates = [
      this.titleInput.validate(),
      this.certPictureInput.validate()
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
      <form onSubmit={onSubmit} className="row">
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
          label={__('Picture') + ": "}
          mediaId={certificate.picture_media}
          ref={certPictureInput => {
            this.certPictureInput = certPictureInput
          }}
        />
        {this.props.children}
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
    const formValues = this.form._getValues();
    const {create, hideCreateForm} = this.props;
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
    return (
      <CertificateForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideCreateForm}>
            {__('Cancel')}
          </button>
          <button type="submit" className="btn btn-success">{__('Create')}</button>
        </div>
      </CertificateForm>
    )
  }
}

export class CertificateEditForm extends Component {
  state = {
    confirm: false,
  };

  static propTypes = {
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    certificate: PropTypes.object.isRequired,
  };

  _showConfirm = () => {
    this.setState({confirm: true})
  };

  _cancelConfirm = () => {
    this.setState({confirm: false})
  };

  _remove = () => {
    const certificateId = this.props.certificate.id;
    return this.props.delete(certificateId)
  };

  _save = () => {
    const {certificate, update} = this.props;
    const certificateId = certificate.id;
    const formValues = this.form._getValues();
    return update(formValues, certificateId)
  };

  _onSubmit = (e) => {
    e.preventDefault();
    this._save();
  };

  render() {
    const {confirm} = this.state;
    if (confirm) {
      return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
    }

    const {certificate, hideEdit} = this.props;
    return (
      <CertificateForm onSubmit={this._onSubmit} certificate={certificate} ref={form => {this.form = form}}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
            {__('Delete')}
          </button>
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {__('Cancel')}
          </button>
          <button type="submit" className="btn btn-success">{__('Save')}</button>
        </div>
      </CertificateForm>
    )
  }
}
