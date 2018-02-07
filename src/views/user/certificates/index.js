/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {createCertificate, deleteCertificate, updateCertificate} from 'src/crud/user/certificate'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {CertificateCreateForm} from "./forms"
import {CertificateEditForm} from './forms'
import {CertificateItemWrapper, CertificateView} from "./view"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"


class CertificateInfo extends Component {
  static propTypes = {
    certificate: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateCertificate: PropTypes.func.isRequired,
    deleteCertificate: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const {certificate} = props;
    this.state = {edit: false, certificate: certificate, error:false, isLoading:false};
    this._updateStateForView = this._updateStateForView.bind(this);
    this._showEdit = this._showEdit.bind(this);
    this._showEdit = this._showEdit.bind(this);
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, certificate: res, error:error, isLoading:isLoading})
  };

  render() {
    const {certificate} = this.state;
    const {user} = this.props;
    if (this.state.edit) {
      return <CertificateItemWrapper>
        <CertificateEditForm
          user={user}
          certificate={certificate}
          hideEdit={this._hideEdit}
          updateStateForView={this._updateStateForView}
          remove={this.props.deleteCertificate}
          update={this.props.updateCertificate}
        />
      </CertificateItemWrapper>;
    }
    return <CertificateView certificate={certificate} user={user} showEdit={this._showEdit}/>;
  }
}

class Certificate extends Component {

  static propTypes = {
    certificate: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._delete = this._delete.bind(this);
    this._update = this._update.bind(this);
    this._updateStateForView = this._updateStateForView.bind(this)
  }


  _delete = (certificateId,userId, hideEdit) => {
    const {updateStateForView} = this.props;
    updateStateForView(null,null,true);
    return deleteCertificate(certificateId,updateStateForView,hideEdit, userId);
  };

  _update = (formValues, certificateId, updateStateForView, hideEdit) => {
    updateStateForView(null,null,true);
    return updateCertificate(formValues, certificateId, updateStateForView, hideEdit);
  };

  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props;
    updateStateForView({error: error, isLoading: isLoading});
    this.setState({...this.state, certificate: res, error: error, isLoading: isLoading});
  };

  render() {
    const {certificate, user} = this.props;
    return (
      <CertificateInfo
        certificate={certificate}
        user={user}
        updateStateForView={this._updateStateForView}
        deleteCertificate={this._delete}
        updateCertificate={this._update}
      />
    )
  }
}

class Certificates extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null, certificates: [], user: {}, profile: {}};
  }

  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {userId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/certificates/?certificate_user=${userId}`,
          result: `userCertificates-Certificates-get/${userId}`,
          token: TOKEN
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-Certificates-get/${userId}`,
          token: TOKEN
        }
      );
    };

    emitting();

    socket.on(`userCertificates-Certificates-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, certificates: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.on(`user-Certificates-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

  }

  componentWillUnmount() {
    const {userId} = this.props;
    socket.off(`userCertificates-Certificates-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, certificates: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.off(`user-Certificates-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

  }

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, certificate:res, error: error, isLoading: isLoading})
  };

  _create = (formValues, hideCreateForm) => {
    const updateStateForView = this._updateStateForView;
    const {userId} = this.props;
    formValues.certificate_user = userId;
    return createCertificate(formValues, updateStateForView, hideCreateForm);
  };

  render() {
    const {createForm, certificates, user, isLoading, error, userId} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Certificates')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardCertificate">
            {
              createForm &&
              <CertificateItemWrapper>
                <CertificateCreateForm hideCreateForm={this._hideCreateForm} create={this._create}/>
              </CertificateItemWrapper>
            }
            	<div className="row align-items-center">
            {
              certificates.map((certificate, i) => (
                <Certificate
                  certificate={certificate}
                  user={user}
                  updateStateForView={this._updateStateForView}
                  key={i}
                />
              ))
            }
            </div>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Certificates;