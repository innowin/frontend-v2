/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {CertificateCreateForm, CertificateEditForm} from "./forms";
import {CertificateItemWrapper, CertificateView} from "./view";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames";
import {getCertificates, createCertificate, deleteCertificate, updateCertificate} from 'src/crud/user/certificate';

export class Certificate extends Component {

  static propTypes = {
    certificates: PropTypes.array,
    certificate: PropTypes.object.isRequired,
    updateCertificates: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {edit: false, error: false, isLoading: false, certificate: this.props.certificate || {}};
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };


  _updateView = (res) => {
    this.setState({...this.state, certificate: res});
  };

  _update = (formValues, certificateId) => {
    this.setState({...this.state, isLoading: true});
    return updateCertificate(formValues, certificateId, this._updateView, this._hideEdit, this._handleErrorLoading);
  };

  _delete = () => {
    this.setState({...this.state, isLoading: true});
    return deleteCertificate(this.props.certificates, this.props.certificate, this.props.updateCertificates, this._hideEdit, this._handleErrorLoading);
  };

  render() {
    const {certificate, isLoading, error} = this.state;
    if (this.state.edit) {
      return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <CertificateItemWrapper>
            <CertificateEditForm
              certificate={certificate}
              hideEdit={this._hideEdit}
              delete={this._delete}
              update={this._update}
            />
          </CertificateItemWrapper>
        </VerifyWrapper>
      )
    }
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CertificateView certificate={certificate} showEdit={this._showEdit}/>
      </VerifyWrapper>
    )
  }
}

export class Certificates extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null, certificates: []};
  }

  _showCreateForm = () => {
    this.setState({createForm: true});
  };
  _hideCreateForm = () => {
    this.setState({createForm: false});
  };

  _updateCertificates = (res, type, deletedIndex = null) => {
    const {certificates} = this.state;
    if (type === 'get') {
      this.setState({...this.state, certificates: [...certificates, ...res]});
      return false;
    }
    if (type === 'post') {
      this.setState({...this.state, certificates: [res, ...certificates]});
      return false;
    }
    if (type === 'del') {
      const remainCertificates = certificates.slice(0, deletedIndex).concat(certificates.slice(deletedIndex + 1));
      this.setState({...this.state, certificates: remainCertificates});
    }
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _getCertificates = () => {
    this.setState({...this.state, isLoading: true});
    getCertificates(this.props.userId, this._updateCertificates, this._handleErrorLoading);
  };

  _create = (formValues) => {
    this.setState({...this.state, isLoading: true});
    createCertificate(formValues, this._updateCertificates, this._handleErrorLoading, this._hideCreateForm);
  };

  componentDidMount() {
    this._getCertificates()
  }

  render() {
    const {createForm, isLoading, error} = this.state;
    const certificates = [...new Set(this.state.certificates)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Certificates')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard>
          <ListGroup>
            {createForm &&
            <CertificateItemWrapper>
              <CertificateCreateForm hideCreateForm={this._hideCreateForm} create={this._create}/>
            </CertificateItemWrapper>
            }
            {
              certificates.map((certificate) => (
                <Certificate
                  certificates={certificates}
                  certificate={certificate}
                  updateCertificates={this._updateCertificates}
                  key={"certificate"+certificate.id}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Certificates;