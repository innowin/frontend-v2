// @flow
import * as React from 'react'
import {Component} from 'react'
import PropTypes from 'prop-types'
import {TextInput} from 'src/views/common/inputs/TextInput'
import {FileInput} from 'src/views/common/inputs/FileInput'
import {Confirm} from "../../common/cards/Confirm"

type CertificateType = {
    certificate_picture: number,
    title: string
}
type CertificateFormProps = {
    translator: { [string]: string },
    onSubmit: Function,
    certificate?: CertificateType,
    children: React.Node
}

export class CertificateForm extends Component<CertificateFormProps> {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        certificate: PropTypes.object,
    }
    certPictureInput: React.ElementRef<typeof FileInput>
    titleInput: React.ElementRef<typeof TextInput>
    getValues = () => {
        const media = this.certPictureInput.getFile()
        const mediaId = media ? media.id : null
        return ({
            title: this.titleInput.getValue(),
            certificate_picture: mediaId, // TODO use media uploader
        })
    }

    formValidate = () => {
        let result = true
        const validates = [
            this.titleInput.validate(),
        ]
        for (let i = 0; i < validates.length; i++) {
            if (validates[i]) {
                result = false
                break
            }
        }
        return result
    }

    render() {
        const {translator, children} = this.props
        const certificate = this.props.certificate || {}
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="row">
                    <TextInput
                        name="title"
                        required
                        label={translator['Title'] + ": "}
                        value={certificate.title}
                        ref={titleInput => {
                            this.titleInput = titleInput
                        }}
                    />
                    <FileInput
                        name="picture"
                        label={translator['Picture'] + ": "}
                        mediaId={certificate.certificate_picture}
                        ref={certPictureInput => {
                            this.certPictureInput = certPictureInput
                        }}
                    />

                    {children}
                </div>
            </form>
        )
    }
}

type CertificateCreateFormProps = {
    create: Function,
    hideEdit: Function,
    translator: { [string]: string }
}

export class CertificateCreateForm extends Component<CertificateCreateFormProps> {

    static propTypes = {
        create: PropTypes.func.isRequired,
        hideEdit: PropTypes.func.isRequired
    }
    form: ?React.ElementRef<typeof CertificateForm>
    save = () => {
        const formValues = this.form && this.form.getValues()
        const {hideEdit} = this.props
        return this.props.create(formValues, hideEdit)
    }

    onSubmit = (e: SyntheticEvent<>) => {
        e.preventDefault()
        if (this.form && this.form.formValidate()) {
            this.save()
        }
    }

    render() {
        const {translator} = this.props
        return (
            <CertificateForm translator={translator} onSubmit={this.onSubmit} ref={form => (this.form = form)}>
                <div className="col-12 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
                        {translator['Cancel']}
                    </button>
                    <button type="submit" className="btn btn-success">{translator['Create']}</button>
                </div>
            </CertificateForm>
        )
    }
}

type CertificateEditFormProps = {
    update: Function,
    remove: Function,
    hideEdit: Function,
    certificate: Object,
    translator: {[string]: string},
    updateStateForView: Function
}

type CertificateEditFormState = {
    confirm: boolean
}

export class CertificateEditForm extends Component<CertificateEditFormProps, CertificateEditFormState> {
    constructor() {
        super()
        this.state = {
            confirm: false,
        }
    }
    static propTypes = {
        update: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        hideEdit: PropTypes.func.isRequired,
        certificate: PropTypes.object.isRequired,
    }
    form: ?React.ElementRef<typeof CertificateForm>
    showConfirm = () => {
        this.setState({confirm: true})
    }

    cancelConfirm = () => {
        this.setState({confirm: false})
    }

    remove = () => {
        const {hideEdit} = this.props
        const certificateId = this.props.certificate.id
        return this.props.remove(certificateId, hideEdit)
    }

    save = () => {//(formValues, certificateId, updateStateForView, hideEdit
        const {certificate, updateStateForView, hideEdit} = this.props
        const certificateId = certificate.id
        const formValues = this.form && this.form.getValues()
        return this.props.update(formValues, certificateId, updateStateForView, hideEdit)
    }

    onSubmit = (e: SyntheticEvent<>) => {
        e.preventDefault()
        this.save()
        return true
    }

    render() {
        const {confirm} = this.state
        if (confirm) {
            return <Confirm cancelRemoving={this.cancelConfirm} remove={this.remove}/>
        }

        const {certificate, translator, hideEdit} = this.props
        return (
            <CertificateForm translator={translator} onSubmit={this.onSubmit} ref={form => (this.form = form)} certificate={certificate}>
                <div className="col-12 d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-danger mr-auto" onClick={this.showConfirm}>
                        {translator['Delete']}
                    </button>
                    <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                        {translator['Cancel']}
                    </button>
                    <button type="submit" className="btn btn-success">{translator['Save']}</button>
                </div>
            </CertificateForm>

        )
    }
}
