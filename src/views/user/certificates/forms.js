// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {TextInput} from "src/views/common/inputs/TextInput"
import {FileInput} from "src/views/common/inputs/FileInput"
import {Confirm} from "../../common/cards/Confirm"
import type {certificateType} from "src/consts/flowTypes/user/others"

type PropsCertificateForm = {
  onSubmit: Function,
  certificate?: certificateType,
  translate: { [string]: string },
  children?: React.Node
}

export class CertificateForm extends Component<PropsCertificateForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    certificate: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  certPictureInput: React.ElementRef<typeof FileInput>
  titleInput: React.ElementRef<typeof TextInput>

  _getValues = (): {} => {
    const media = this.certPictureInput.getFile()
    const mediaId = media ? media.id : null
    return {
      title: this.titleInput.getValue(),
      picture_media: mediaId
    }
  }

  _formValidate = (): boolean => {
    let result = true
    const validates = [
      this.titleInput.validate(),
      this.certPictureInput.validate()
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
    const {onSubmit, translate} = this.props
    const certificate = this.props.certificate || {}
    return (
      <form onSubmit={onSubmit} className="row">
        <TextInput
          name="title"
          required
          label={translate['Title'] + ": "}
          value={certificate.title}
          ref={titleInput => {
            this.titleInput = titleInput
          }}
        />
        <FileInput
          label={translate['Picture'] + ": "}
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

type PropsCertificateCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string }
}

export class CertificateCreateForm extends Component<PropsCertificateCreateForm> {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideCreateForm: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof CertificateForm>

  _save = (): boolean | void => {
    if (this.form) {
      const {create, hideCreateForm} = this.props
      const formValues: {} = this.form._getValues()
      create(formValues, hideCreateForm)
    }
    return false
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    e.preventDefault()
    if (this.form && this.form._formValidate()) {
      this._save()
    }
    return false
  }

  render() {
    const {translate} = this.props
    return (
      <CertificateForm onSubmit={this._onSubmit} ref={form => {
        this.form = form
      }} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideCreateForm}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Create']}</button>
        </div>
      </CertificateForm>
    )
  }
}


type PropsCertificateEditForm = {
  update: Function,
  delete: Function,
  hideEdit: Function,
  certificate: certificateType,
  translate: { [string]: string }
}

type StateCertificateEditForm = {
  confirm: boolean
}

export class CertificateEditForm extends Component<PropsCertificateEditForm, StateCertificateEditForm> {
  state = {
    confirm: false,
  }

  static propTypes = {
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    certificate: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _remove = () => {
    const certificateId = this.props.certificate.id
    return this.props.delete(certificateId)
  }

  form: ?React.ElementRef<typeof CertificateForm>

  _save = () => {
    const {certificate, update} = this.props
    const certificateId = certificate.id
    if (this.form) {
      const formValues = this.form._getValues()
      update(formValues, certificateId)
    }
  }

  _onSubmit = (e: SyntheticEvent<HTMLButtonElement>): boolean | void => {
    e.preventDefault()
    this._save()
  }

  render() {
    const {confirm} = this.state
    if (confirm) {
      return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>
    }

    const {certificate, hideEdit, translate} = this.props
    return (
      <CertificateForm onSubmit={this._onSubmit} certificate={certificate} ref={form => {
        this.form = form
      }} translate={translate}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
            {translate['Delete']}
          </button>
          <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
            {translate['Cancel']}
          </button>
          <button type="submit" className="btn btn-success">{translate['Save']}</button>
        </div>
      </CertificateForm>
    )
  }
}
