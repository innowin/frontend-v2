/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Certificate, CertificateItemWrapper} from "./view";
import {CertificateCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames";
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/product/certificate.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"

export class CertificateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {certificate: {}, error: null, isLoading: false}
  }

  componentWillReceiveProps(props) {
    const {certificate} = props;
    this.setState({...this.state, certificate: certificate});
  }

  delete_ = (certificateId, hideEdit) => {
    const {productId, updateStateForView} = this.props;
    updateStateForView(null, null, true);
    return deleteCertificate(certificateId, productId, () => {
      updateStateForView(null, false);
    }, hideEdit, productId);
  };
  update_ = (formValues, certificateId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
    updateStateForView(null, null, true);
    return updateCertificate(formValues, certificateId, updateStateForView, hideEdit);
  };
  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props;
    updateStateForView({error: error, isLoading: isLoading});
    this.setState({...this.state, certificate: res, error: error, isLoading: isLoading});
  };

  render() {
    const {certificate} = this.state;
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

  create = (formValues, hideEdit) => {
    const {productId, updateStateForView} = this.props;
    return createCertificate(formValues, updateStateForView, hideEdit, productId);
  };

  render() {
    const {productId, createForm, updateStateForView} = this.props;
    let {certificates} = this.props;
    return <ListGroup>
      {createForm &&
      <CertificateItemWrapper>
        <CertificateCreateForm hideEdit={this.props.hideCreateForm} create={this.create}/>
      </CertificateItemWrapper>}
      {
        certificates.map(cert => <CertificateContainer
          certificate={cert}
          updateStateForView={updateStateForView}
          productId={productId}
          key={cert.id}
        />)
      }
    </ListGroup>;
  }
}

export class Certificates extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, certificates: [], edit: false, isLoading: false, error: null};
  }

  static propTypes = {
    productId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {productId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/base/certificates/?certificate_parent=${productId}`,
          result: `ProductCertificates-get/${productId}`,
          token: TOKEN
        }
      );

      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/products/${productId}/`,
          result: `product-Posts-get/${productId}`,
          token: TOKEN
        }
      );

    };

    emitting();

    socket.on(`ProductCertificates-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, certificates: res, isLoading: false};
        console.log(newState);
        this.setState(newState);
      }

    });
    socket.on(`product-Posts-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, product: res, isLoading: false};
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
  updateStateForView = (error, isLoading) => {
    this.setState({...this.state, error: error, isLoading: isLoading})
  };

  render() {
    const {productId} = this.props;
    const {createForm, certificates, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {
          <div>
            <CategoryTitle
              title={__('Certificates')}
              showCreateForm={this.showCreateForm}
              createForm={createForm}
            />
            <FrameCard>
              <CertificateList
                updateStateForView={this.updateStateForView}
                certificates={certificates}
                productId={productId}
                createForm={createForm}
                hideCreateForm={this.hideCreateForm}
              />
            </FrameCard>
          </div>
        }
      </VerifyWrapper>
    )
  }
}

export default Certificates;
