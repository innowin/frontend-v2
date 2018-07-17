// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import type {certificateType, certificateFormValuesType} from "src/consts/flowTypes/user/others"
import {CertificateCreateForm, CertificateEditForm} from "./forms"
import {CertificateItemWrapper, CertificateView} from "./view"
import {connect} from "react-redux"
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames"
import {getCertificates, createCertificate, deleteCertificate, updateCertificate} from "src/crud/user/certificate"
import {getMessages} from "src/redux/selectors/translateSelector"


type PropsCertificate = {
  certificates: (certificateType)[],
  certificate: certificateType,
  updateCertificates: Function,
  translate: { [string]: string }
}

type StateCertificate = {
  edit: boolean,
  error: boolean | string,
  isLoading: boolean,
  certificate: certificateType
}

export class Certificate extends Component<PropsCertificate, StateCertificate> {

  static propTypes = {
    certificates: PropTypes.array.isRequired,
    certificate: PropTypes.object.isRequired,
    updateCertificates: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  constructor(props: PropsCertificate) {
    super(props)
    this.state = {edit: false, error: false, isLoading: false, certificate: null}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _handleErrorLoading = (error: boolean | string = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updateView = (res: certificateType) => {
    this.setState({...this.state, certificate: res})
  }

  _update = (formValues: certificateFormValuesType, certificateId: number) => {
    this.setState({...this.state, isLoading: true})
    updateCertificate(formValues, certificateId, this._updateView, this._hideEdit, this._handleErrorLoading)
  }

  _delete = () => {
    const {certificates, certificate, updateCertificates} = this.props
    this.setState({...this.state, isLoading: true})
    deleteCertificate(certificates, certificate, updateCertificates, this._hideEdit, this._handleErrorLoading)
  }

  componentDidMount() {
    const {certificate} = this.props
    this.setState({...this.state, certificate: certificate})
  }

  render() {
    const {certificate, isLoading, error, edit} = this.state
    const {translate} = this.props
    if (edit) {
      return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <CertificateItemWrapper>
            <CertificateEditForm
              certificate={certificate}
              hideEdit={this._hideEdit}
              delete={this._delete}
              update={this._update}
              translate={translate}
            />
          </CertificateItemWrapper>
        </VerifyWrapper>
      )
    }
    return (
      <VerifyWrapper className="certificate-wrapper" isLoading={isLoading} error={error}>
        <CertificateView certificate={certificate} showEdit={this._showEdit}/>
      </VerifyWrapper>
    )
  }
}

type PropsCertificates = {
  userId: number,
  translate: { [string]: string }
}

type StateCertificates = {
  createForm: boolean,
  edit: boolean,
  isLoading: boolean,
  error: boolean | string,
  certificates: (certificateType)[]
}

export class Certificates extends Component<PropsCertificates, StateCertificates> {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired
  }

  constructor(props: PropsCertificates) {
    super(props)
    this.state = {createForm: false, edit: false, isLoading: false, error: false, certificates: []}
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  }

  _hideCreateForm = () => {
    this.setState({createForm: false})
  }

  _updateCertificates = (res: certificateType, type: string, deletedIndex: ?number = null) => {
    const {certificates} = this.state
    if (type === 'get') {
      this.setState({...this.state, certificates: [...certificates, ...res]})
      return false
    }
    if (type === 'post') {
      this.setState({...this.state, certificates: [res, ...certificates]})
      return false
    }
    if (type === 'del' && deletedIndex) {
      const remainCertificates = certificates.slice(0, deletedIndex).concat(certificates.slice(deletedIndex + 1))
      this.setState({...this.state, certificates: remainCertificates})
    }
  }

  _handleErrorLoading = (error:boolean = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _getCertificates = () => {
    this.setState({...this.state, isLoading: true})
    getCertificates(this.props.userId, this._updateCertificates, this._handleErrorLoading)
  }

  _create = (formValues:certificateFormValuesType) => {
    this.setState({...this.state, isLoading: true})
    createCertificate(formValues, this._updateCertificates, this._handleErrorLoading, this._hideCreateForm)
  }

  componentDidMount() {
    this._getCertificates()
  }

  render() {
    const {createForm, isLoading, error} = this.state
    const {translate} = this.props
    const certificates = [...new Set(this.state.certificates)]
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={translate['Certificates']}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard>
          <ListGroup>
            {createForm &&
            <CertificateItemWrapper>
              <CertificateCreateForm hideCreateForm={this._hideCreateForm} create={this._create} translate={translate}/>
            </CertificateItemWrapper>
            }
            <div className="certificates-wrapper">
              {
                certificates.map((certificate) => (
                  <Certificate
                    certificates={certificates}
                    certificate={certificate}
                    translate={translate}
                    updateCertificates={this._updateCertificates}
                    key={"certificate" + certificate.id}
                  />
                ))
              }
            </div>
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = state => ({
  translate: getMessages(state)
})
export default connect(mapStateToProps)(Certificates)