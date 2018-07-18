// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import {CertificateEditForm} from './forms'
import {ItemWrapper} from "../../common/cards/Frames"
import {CertificateIcon, starIcon, EditIcon} from "src/images/icons"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type CertificateItemWrapperProps = {
    children: React.Node
}
export const CertificateItemWrapper = (props: CertificateItemWrapperProps) => {
    const {children} = props
    return <ItemWrapper icon={<CertificateIcon/>}>{children}</ItemWrapper>
}
type CertificateType = {
    picture_media: string,
    title: string
}

type CertificateViewProps = {
    certificate: CertificateType,
    showEdit: Function
}

export const CertificateView = (props: CertificateViewProps) => {
    const {certificate, showEdit} = props
    return (
        <div className="col-6 text-center container-fluid">
            <div className="row">
                <div className="col certificate">
                    <div className="content">
                        <div className="editButton">
                            <div onClick={showEdit}><EditIcon/></div>
                        </div>
                        <img className="certImage" alt="" src={certificate.picture_media || "/static/media/defaultImg.94a29bce.png"} />
                        <h5>{certificate.title}</h5>

                        <a className="shareButton">{starIcon}</a>
                        <span>&nbsp</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

type CertificateProps = {
    certificate: CertificateType,
    translator: TranslatorType,
    deleteCertificate: Function,
    updateCertificate: Function,
    updateStateForView: Function
}

type CertificateState = {
    edit: boolean,
    certificate: CertificateType
}

export class Certificate extends Component<CertificateProps, CertificateState> {
    constructor(props: CertificateProps){
        super()
        const {certificate} = props
        this.state = {edit: false, certificate:certificate}
    }
    componentWillReceiveProps(props: CertificateProps){
        const {certificate} = props
        this.setState({...this.state, certificate:certificate})
    }

    static propTypes = {
        updateCertificate: PropTypes.func.isRequired,
        deleteCertificate: PropTypes.func.isRequired,
        // certificate: PropTypes.object.isRequired,
        updateStateForView:PropTypes.func.isRequired
    }

    showEdit = () => {
        this.setState({edit: true})
    }

    hideEdit = () => {
        this.setState({edit: false})
    }

    updateStateForView = (res: CertificateType, error: string, isLoading: boolean) =>{
        this.setState({...this.state, certificate:res })
    }

    render() {
        const {certificate} = this.state
        const {translator, deleteCertificate, updateCertificate} = this.props
        if (this.state.edit) {
            return <CertificateItemWrapper>
                <CertificateEditForm
                    translator={translator}
                    certificate = {certificate}
                    hideEdit = {this.hideEdit}
                    updateStateForView = {this.updateStateForView}
                    remove = {deleteCertificate}
                    update = {updateCertificate}
                />
            </CertificateItemWrapper>
        }
        return <CertificateView certificate={certificate} showEdit={this.showEdit}/>
    }
}
