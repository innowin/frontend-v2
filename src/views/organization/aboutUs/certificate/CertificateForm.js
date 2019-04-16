// @flow
import * as React from 'react'
import Modal from '../../../pages/modal/modal'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {identityType} from 'src/consts/flowTypes/identityType'
import Validations from 'src/helpers/validations/validations'
import UploadFile from '../../../common/components/UploadFile'
import constants from 'src/consts/constants'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TempActions from 'src/redux/actions/tempActions'
import FileActions from 'src/redux/actions/commonActions/fileActions'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  certificate?: certificateType,
  createCertificate?: Function,
  updateCertificate?: Function,
  owner: identityType,
  newCertificatePicture: Object,
  actions: {
    removeFileFromTemp: Function,
    deleteFile: Function,
    updateFile: Function,
  }
}

type States = {
  modalIsOpen: boolean,
  title: string,
  errors: {
    title: boolean,
  }
}

class CertificateForm extends React.Component<Props, States> {
  state = {
    modalIsOpen: true,
    title: '',
    errors: {
      title: false,
    }
  }

  componentDidMount(): void {
    const {certificate, translate} = this.props
    if (certificate) {
      this.setState({...this.state, title: certificate.title, errors: {...this.state.errors, title: false}})
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          title: Validations.validateRequired({value: this.state.title, translate})
        }
      })
    }
  }

  _toggle = () => {
    const {toggleEdit, actions} = this.props
    const {removeFileFromTemp} = actions
    const fileKey = constants.TEMP_FILE_KEYS.CERTIFICATE.PICTURE
    removeFileFromTemp(fileKey)
    this.setState({...this.state, modalIsOpen: false})
    toggleEdit()
  }

  _onChangeFields = (event: SyntheticEvent<HTMLInputElement>) => {
    const {translate} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    let error = false
    if (name === 'title') {
      error = Validations.validateRequired({value, translate})
    }

    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: error
      }
    })
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {createCertificate, owner, newCertificatePicture, updateCertificate, certificate, actions} = this.props
    const {deleteFile, updateFile} = actions
    const {errors} = this.state
    const {title: titleError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const newCertificatePictureId = newCertificatePicture && newCertificatePicture.uploadedFileId
    const removedCertificatePictureId = newCertificatePicture && newCertificatePicture.removedId
    let formValues = {
      title: form.title.value,
      certificate_picture: newCertificatePictureId
          ? newCertificatePictureId
          : (certificate ? certificate.certificate_picture : ''),
      certificate_parent: owner.id,
    }

    if (titleError === false) {
      const newFileIds = [newCertificatePictureId]
      if (updateCertificate && certificate) {
        updateCertificate({formValues, certificateId: certificate.id})
        for (let newFileId of newFileIds) {
          newFileId && updateFile({
            id: newFileId,
            formData: {file_related_parent: certificate.id},
            fileParentType: constants.FILE_PARENT.CERTIFICATE
          })
        }
        removedCertificatePictureId && deleteFile({
          fileId: removedCertificatePictureId,
          fileParentId: certificate.id,
          fileParentType: constants.FILE_PARENT.CERTIFICATE
        })
      } else if (createCertificate) {
        createCertificate({formValues, certificateOwnerId: owner.id, newFileIds})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, certificate} = this.props
    let title = ''
    if (certificate) {
      title = certificate.title
    }
    const {errors} = this.state
    const {title: titleError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal certificate-modal">
              <div className="head">
                <div className="title">{translate['Add certificate']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Certificate title']} <span className='required-star'>*</span></p>
                  <input defaultValue={title} onChange={this._onChangeFields} name='title'
                         className='edit-text-fields'/>
                  <div className='modal-tip'>{translate['Certificate title tip']}</div>
                  {titleError && <div className='text-field-error'>{titleError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Exporter']}</p>
                  <input name='certificate_parent' onChange={this._onChangeFields} className='edit-text-fields'/>
                  <div className='modal-tip'>{translate['Exporter tip']}</div>
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Attached file']}</p>
                  <div className='modal-tip'>{translate['Attached file tip']}</div>
                  <UploadFile fileParentId={certificate && certificate.id}
                              fileId={certificate && certificate.certificate_picture}
                              fileCategory={constants.CREATE_FILE_CATEGORIES.CERTIFICATE.PICTURE}
                              // fileType={constants.CREATE_FILE_TYPES.FILE}
                              fileType={constants.CREATE_FILE_TYPES.IMAGE}
                              fileKey={constants.TEMP_FILE_KEYS.CERTIFICATE.PICTURE}/>
                </div>
              </div>
              <div className="buttons">
                <input type='submit' className="button save" value='ثبت'/>
                <div onClick={this._toggle} className="button cancel">لغو</div>
              </div>
            </form>
          </Modal>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newCertificatePicture: state.temp.file[constants.TEMP_FILE_KEYS.CERTIFICATE.PICTURE],
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeFileFromTemp: TempActions.removeFileFromTemp,
    deleteFile: FileActions.deleteFile,
    updateFile: FileActions.updateFile,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CertificateForm)