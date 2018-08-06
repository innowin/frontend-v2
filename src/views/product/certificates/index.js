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
import {getMessages} from "../../../redux/selectors/translateSelector";
import {connect} from "react-redux";
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {bindActionCreators} from "redux";
import {getCertificatesList, createCertificate} from "src/redux/actions/commonActions/certificateActions"
import {CertificateReduxForm} from "./forms"
import {createFile} from 'src/redux/actions/commonActions/fileActions'


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
    certificates: {[number | string]: CertificateType},
    translator: TranslatorType,
    hideCreateForm: Function,
    handleCertificateInput: Function,
    sendingFormDataHandler: Function
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
        handleCertificateInput
    } = props
    return (
        <ListGroup>
            {createForm &&
            <CertificateItemWrapper>
                <CertificateReduxForm
                    handleCertificateInput={handleCertificateInput}
                    onSubmit={sendingFormDataHandler}
                    hideForm={hideCreateForm}
                />
                {/*<CertificateCreateForm translator={translator} hideEdit={hideCreateForm} create={() => 0}/>*/}
            </CertificateItemWrapper>}
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
        </ListGroup>
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
    certificates: {[number | string]: CertificateType},
    _createFile: Function,
    newOrUpdatingFile: {
        content: {id?: string}
    },
    _createCertificate: Function
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

export class Certificates extends Component<CertificatesProps, CertificatesState> {

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
            sendingCertFormType: '' // determine that certFormData is for creating or updating.
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
        const {newOrUpdatingFile, _createCertificate, productId} = this.props
        const oldFile = prevProps.newOrUpdatingFile
        if (oldFile && newOrUpdatingFile) {
            if (!oldFile.content.id && newOrUpdatingFile.content.id) {
                this.setState({
                    ...this.state,
                    certFileInput: newOrUpdatingFile.content.id
                }, () => {
                    const data = {
                        title: this.state.certTitleInput,
                        picture: newOrUpdatingFile.content.id,
                        certificate_parent: productId,
                        certificate_identity: IDENTITY_ID
                    }
                    _createCertificate(data)
                })
            }
        }
    }

    _sendingFormDataHandler = (values: CertFormType) => {
        this.setState({ ...this.state, certTitleInput: values.title})
        const data = {file_string: this.state.certFileInput}
        this.props._createFile(data)
    }

    _showCreateFormHandler = () => this.setState({...this.state, createForm: !this.state.createForm})

    _handleCertificateInput = (e: any) => {
        const reader: any = new FileReader()
        const input: {files: Array<{}>} = e.target
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
        const {productId, translator, certificates} = this.props
        const {createForm, isLoading, error} = this.state
        return (
            <VerifyWrapper isLoading={isLoading} error={error}>
                {
                    <div>
                        {console.log(this.props, IDENTITY_ID)}
                        <CategoryTitle
                            title={translator['Certificates']}
                            showCreateForm={this._showCreateFormHandler}
                            createForm={createForm}
                        />
                        <FrameCard>
                            <CertificateList
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

const mapStateToProps = (state) => ({
    translator: getMessages(state),
    certificates: state.certificate.objectCertificates.content,
    newOrUpdatingFile: state.file.newOrUpdatingFile
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            _getCertificatesList: id => getCertificatesList(id),
            _createFile: data => createFile(data),
            _createCertificate: data => createCertificate(data)
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Certificates)