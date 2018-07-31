// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from 'prop-types'
import {Certificate, CertificateItemWrapper} from "./view"
import {CertificateCreateForm} from "./forms"
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames"
import {createCertificate, deleteCertificate, updateCertificate} from '../../../crud/product/certificate.js'
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import client from "src/consts/client"
import {getMessages} from "../../../redux/selectors/translateSelector";
import {connect} from "react-redux";
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {bindActionCreators} from "redux";
import {getCertificatesList} from "src/redux/actions/commonActions/certificateActions"


const TOKEN = client.getToken()

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
    hideCreateForm: Function
}

const CertificateList = (props: CertificateListProps) => {
    const {productId, createForm, updateStateForView, translator, certificates, hideCreateForm} = props
    return (
        <ListGroup>
            {createForm &&
            <CertificateItemWrapper>
                <CertificateCreateForm translator={translator} hideEdit={hideCreateForm} create={() => 0}/>
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


type CertificatesProps = {
    productId: string,
    translator: TranslatorType,
    _getCertificatesList: Function,
    certificates: {[number | string]: CertificateType},
}

type CertificatesState = {
    createForm: boolean,
    edit: boolean,
    isLoading: boolean,
    error: ?(string | boolean),
}

export class Certificates extends Component<CertificatesProps, CertificatesState> {

    constructor() {
        super()
        this.state = {createForm: false, certificates: [], edit: false, isLoading: false, error: null}
    }

    static propTypes = {
        productId: PropTypes.string.isRequired
    }

    componentDidMount() {
        const {_getCertificatesList} = this.props
        _getCertificatesList()
    }

    _showCreateFormHandler = () => this.setState({...this.state, createForm: !this.state.createForm})

    _certList = () => {
        const {certificates} = this.props
        return Object.keys(certificates).map(id => ({...certificates[id], id: id}))
        // certificates is an object that it's keys are ids of certificates and it's values are the data of
        // correspond certificate.
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
                        <CategoryTitle
                            title={translator['Certificates']}
                            showCreateForm={this._showCreateFormHandler}
                            createForm={createForm}
                        />
                        <FrameCard>
                            <CertificateList
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
    certificates: state.certificate.objectCertificates.content
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            _getCertificatesList: id => getCertificatesList(id)
        },
        dispatch
    )

export default connect(mapStateToProps, mapDispatchToProps)(Certificates)