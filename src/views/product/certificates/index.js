// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from 'prop-types'
import {Certificate, CertificateItemWrapper} from "./view"
import {CertificateCreateForm} from "./forms"
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames"
import {deleteCertificate, updateCertificate} from '../../../crud/product/certificate.js'
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import client from "src/consts/client"
import {getMessages} from "../../../redux/selectors/translateSelector"
import {connect} from "react-redux"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {bindActionCreators} from "redux"
import {getCertificatesList, createCertificate, resetCreatingObjCertStatus} from "src/redux/actions/commonActions/certificateActions"
import {CertificateReduxForm} from "./forms"
import {createFile, updateFile} from "src/redux/actions/commonActions/fileActions"
import status from "src/redux/reducers/statusChoices"
import makeCertSelectorByProductId from "src/redux/selectors/common/certificate/getObjectCertificates"


const IDENTITY_ID = client.getIdentityId()

type CertificateType = {
  picture_media: string,
  title: string,
  // id: number
}

type CertificateContainerProps = {
  certificate: CertificateType,
  productId: string,
  updateStateForView: Function,
  translator: TranslatorType
}

type CertificateContainerState = {
  certificate: CertificateType,
  error?: string,
  isLoading?: boolean
}

export class CertificateContainer extends Component<CertificateContainerProps, CertificateContainerState> {
  constructor(props: CertificateContainerProps) {
    super()
    this.state = {
      certificate: props.certificate || {}
    }
  }

  delete_ = (certificateId: number, hideEdit: Function) => {
    const {productId, updateStateForView} = this.props
    updateStateForView(null, null, true)
    return deleteCertificate(certificateId, () => {
      updateStateForView(null, false)
    }, hideEdit, productId)
  }
  update_ = (formValues: {}, certificateId: number, updateStateForView: Function, hideEdit: Function) => {//formValues, careerId, updateStateForView, hideEdit
    // updateStateForView(null,null,true)
    return updateCertificate(formValues, certificateId, updateStateForView, hideEdit)
  }
  _updateStateForView = (res: CertificateType, error: string, isLoading: boolean) => {
    const {updateStateForView} = this.props
    updateStateForView({error: error, isLoading: isLoading})
    this.setState({...this.state, certificate: res, error: error, isLoading: isLoading})
  }

  render() {
    const {certificate} = this.state
    const {translator} = this.props
    return (
        <Certificate
            translator={translator}
            certificate={certificate}
            updateStateForView={this._updateStateForView}
            deleteCertificate={this.delete_}
            updateCertificate={this.update_}
        />
    )
  }
}


type CertificateListProps = {
  productId: string,
  createForm: boolean,
  updateStateForView: Function,
  certificates: { [number | string]: CertificateType },
  translator: TranslatorType,
  hideCreateForm: Function,
  handleCertificateInput: Function,
  sendingFormDataHandler: Function,
  creatingObjCertStatus: string
}

const CertificateList = (props: CertificateListProps) => {
  const {
    sendingFormDataHandler,
    productId,
    createForm,
    updateStateForView,
    translator,
    certificates,
    hideCreateForm,
    handleCertificateInput,
    creatingObjCertStatus
  } = props
  return (
      <div className="list-group list-group-flush">
        <CertificateItemWrapper>
          {createForm &&
          <CertificateReduxForm
              creatingObjCertStatus={creatingObjCertStatus}
              handleCertificateInput={handleCertificateInput}
              onSubmit={sendingFormDataHandler}
              hideForm={hideCreateForm}
              initialValues={{}}
          />
          }
          {Object.keys(certificates).map(id => {
            const certificate = {id, ...certificates[id]}
            return (
                <CertificateContainer
                    translator={translator}
                    certificate={certificate}
                    updateStateForView={updateStateForView}
                    productId={productId}
                    key={`certificate${id}`}
                />
            )
          })}
        </CertificateItemWrapper>
      </div>
  )
}


type CertFormType = {
  picture: string,
  title: string
}

type CertificatesProps = {
  productId: string,
  translator: TranslatorType,
  _getCertificatesList: Function,
  certificates: { [number | string]: CertificateType },
  _createFile: Function,
  middlewareFileData: {
    content: { id?: string }
  },
  _createCertificate: Function,
  // _delMiddleWareFileData: Function,
  creatingObjCertStatus: string,
  _resetCreatingObjCertStatus: Function,
  _updateFile: Function
}

type CertificatesState = {
  createForm: boolean,
  edit: boolean,
  isLoading: boolean,
  error: ?(string | boolean),
  certFileInput: string,
  certTitleInput: string,
  sendingCertFormType: string
}

const SENDING_TYPES = { // We using this to determine the type of certFormData.
  POST: 'TYPE_POST',
  UPDATE: 'TYPE_UPDATE'
}

// TODO: the process of creating and updating certificate should change.
export class Certificates extends Component
    <CertificatesProps, CertificatesState> {

  constructor() {
    super()
    this.state = {
      createForm: false,
      certificates: [],
      edit: false,
      isLoading: false,
      error: null,
      certFileInput: '', // the value of picture of creating or updating certificate.
      certTitleInput: '', // the value of title of creating or updating certificate.
      sendingCertFormType: '', // determine that certFormData is for creating or updating.
    }
  }

  static propTypes = {
    productId: PropTypes.string.isRequired
  }

  componentDidMount() {
    const {_getCertificatesList} = this.props
    _getCertificatesList()
  }

  componentDidUpdate(prevProps: CertificatesProps) {
    // TODO <----------------------------- should change ----------
    const {
      middlewareFileData,
      _createCertificate,
      productId,
      // _delMiddleWareFileData,
      creatingObjCertStatus,
      _resetCreatingObjCertStatus
    } = this.props

    const oldFile = prevProps.middlewareFileData

    if (oldFile && middlewareFileData) {
      if (!oldFile.content.id && middlewareFileData.content.id) {
        this.setState({
          ...this.state,
          certFileInput: middlewareFileData.content.id
        }, () => {
          const data = {
            title: this.state.certTitleInput,
            certificate_picture: middlewareFileData.content.id,
            certificate_parent: productId,
            certificate_identity: IDENTITY_ID
          }
          _createCertificate({formValues: data})
        })
      }
    }

    if (creatingObjCertStatus === status.SUCCEED) {
      setTimeout(_resetCreatingObjCertStatus, 10)
    }
    // TODO ------------- should change ----------------------------->
  }

  _sendingFormDataHandler = (values: CertFormType) => {
    // TODO <----------------------------- should change -------------
    this.setState({...this.state, certTitleInput: values.title})
    const data = {file_string: this.state.certFileInput}
    this.props._createFile(data)
    // TODO ------------- should change ----------------------------->
  }

  _showCreateFormHandler = () => this.setState({...this.state, createForm: !this.state.createForm})

  _sendingType$Handler = (type: string) => {
    this.setState({...this.state, sendingCertFormType: type},
        this._showCreateFormHandler) // after setting sending type making form visible.
  }

  _handleCertificateInput = (e: any) => {
    const reader: any = new FileReader()
    const input: { files: Array<{}> } = e.target
    console.log(input)
    if (input.files) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          certFileInput: reader.result
        })
      }
      input.files[0] && reader.readAsDataURL(input.files[0])
    }
  }

  updateStateForView = (error, isLoading) => {
    this.setState({...this.state, error: error, isLoading: isLoading})
  }

  hideCreateForm = () => {
    this.setState({createForm: false})
  }

  updateStateForView = (error: string, isLoading: boolean) => {
    this.setState({...this.state, error: error, isLoading: isLoading})
  }

  render() {
    const {productId, translator, certificates, creatingObjCertStatus} = this.props
    const {createForm, isLoading, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          {
            <div>
              {console.log(this.state)}
              <CategoryTitle
                  title={translator['Certificates']}
                  showCreateForm={() => this._sendingType$Handler(SENDING_TYPES.POST)}
                  createForm={createForm}
              />
              <FrameCard>
                <CertificateList
                    creatingObjCertStatus={creatingObjCertStatus}
                    sendingFormDataHandler={this._sendingFormDataHandler}
                    handleCertificateInput={this._handleCertificateInput}
                    translator={translator}
                    updateStateForView={this.updateStateForView}
                    certificates={certificates}
                    productId={productId}
                    createForm={createForm}
                    hideCreateForm={this._showCreateFormHandler}
                />
              </FrameCard>
            </div>
          }
        </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {productId} = props
  const certSelectorByProductId = makeCertSelectorByProductId()
  return ({
    translator: getMessages(state),
    certificates: certSelectorByProductId(state, productId),
    middlewareFileData: state.common.file.middlewareFileData,
    creatingObjCertStatus: state.common.certificate.creatingObjCertStatus
  })
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      {
        _getCertificatesList: getCertificatesList,

        _createFile: () => {
        },
        // _createFile: createFile,

        _createCertificate: () => {
        },
        // _createCertificate: createCertificate,

        _updateFile: () => {
        },
        // _updateFile: updateFile,

        // _delMiddleWareFileData: delMiddleWareFileData,

        _resetCreatingObjCertStatus: () => {
        }
        // _resetCreatingObjCertStatus: resetCreatingObjCertStatus
      },
      dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Certificates)