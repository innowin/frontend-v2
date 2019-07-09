// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import Modal from '../../pages/modal/modal'
import TempActions from 'src/redux/actions/tempActions'
import type {certificateType} from 'src/consts/flowTypes/user/others'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import UploadFile from '../components/UploadFile'
import Validations from 'src/helpers/validations/validations'
import numberCorrection from 'src/helpers/numberCorrection'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  certificate?: certificateType,
  createCertificate?: Function,
  updateCertificate?: Function,
  owner: identityType,
  newCertificatePicture: Object,
  getOrganizationsFilterByOfficialName: Function,
  emptySearchedOrganization: Function,
  searchedOrganization: [organizationType],
  actions: {
    removeFileFromTemp: Function,
    deleteFile: Function,
    updateFile: Function,
  }
}

type States = {
  modalIsOpen: boolean,
  title: string,
  certificate_organization_name: string,
  selectedOrganization: ?number,
  errors: {
    title: boolean,
    certificate_organization_name: boolean,
  }
}

class CertificateForm extends React.Component<Props, States> {

  form: SyntheticEvent<HTMLFormElement>

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    certificate: PropTypes.object,
    createCertificate: PropTypes.func,
    updateCertificate: PropTypes.func,
    owner: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    getOrganizationsFilterByOfficialName: PropTypes.func.isRequired,
    emptySearchedOrganization: PropTypes.func.isRequired,
    searchedOrganization: PropTypes.array.isRequired,
  }

  state = {
    modalIsOpen: true,
    title: '',
    certificate_organization_name: '',
    selectedOrganization: undefined,
    errors: {
      title: false,
      certificate_organization_name: false,
    }
  }

  componentDidMount(): void {
    const {certificate, translate, emptySearchedOrganization} = this.props
    if (certificate) {
      this.setState({
        ...this.state,
        title: certificate.title,
        certificate_organization_name: certificate.certificate_organization_name,
        selectedOrganization: (certificate.certificate_organization && certificate.certificate_organization.id) || certificate.certificate_organization,
      })
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          title: Validations.validateRequired({value: this.state.title, translate}),
          certificate_organization_name: Validations.validateRequired({
            value: this.state.certificate_organization_name,
            translate
          }),
        }
      })
    }

    emptySearchedOrganization && emptySearchedOrganization()
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
    const {translate, getOrganizationsFilterByOfficialName} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : numberCorrection(target.value)
    const name = target.name
    let error = false
    if (name === 'title') {
      error = Validations.validateRequired({value, translate})
    } else if (name === 'certificate_organization_name') {
      error = Validations.validateRequired({value, translate})
      if (!error && value.length >= 4) {
        getOrganizationsFilterByOfficialName && getOrganizationsFilterByOfficialName({officialName: value})
      }
    }

    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: error
      },
      selectedOrganization: undefined,
    })
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {createCertificate, owner, newCertificatePicture, updateCertificate, certificate, actions} = this.props
    const {deleteFile, updateFile} = actions
    const {errors, selectedOrganization} = this.state
    const {title: titleError, certificate_organization_name: certificateOrganizationNameError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const newCertificatePictureId = newCertificatePicture && newCertificatePicture.uploadedFileId
    const removedCertificatePictureId = newCertificatePicture && newCertificatePicture.removedId
    const imageError = !Boolean(newCertificatePictureId || (certificate && certificate.certificate_picture && !removedCertificatePictureId))

    let formValues = {
      title: form.title.value,
      certificate_picture: newCertificatePictureId
          ? newCertificatePictureId
          : (certificate ? (certificate.certificate_picture && certificate.certificate_picture.id) || certificate.certificate_picture : ''),
      certificate_parent: owner.id,
    }

    if (selectedOrganization) {
      formValues = {
        ...formValues,
        certificate_organization: selectedOrganization,
        certificate_organization_name: ''
      }
    } else {
      formValues = {
        ...formValues,
        certificate_organization_name: form.certificate_organization_name.value,
        certificate_organization: null
      }
    }

    if (Boolean(titleError || certificateOrganizationNameError || imageError) === false) {
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

  setSearchedOrganization = (organization: organizationType) => {
    const {emptySearchedOrganization} = this.props
    emptySearchedOrganization()
    this.setState({
      ...this.state,
      selectedOrganization: organization.id,
      certificate_organization_name: organization.official_name,
      errors: {
        ...this.state.errors,
        certificate_organization_name: false,
      }
    })
    this.form.certificate_organization_name.value = organization.official_name
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, certificate, searchedOrganization, newCertificatePicture} = this.props
    let title = '', certificate_organization_name = ''
    if (certificate) {
      title = certificate.title
      certificate_organization_name = certificate.certificate_organization_name || certificate.organizationOfficialName
    }
    const {errors} = this.state
    const {title: titleError, certificate_organization_name: certificateOrganizationNameError} = errors
    const certificatePictureId = certificate && ((certificate.certificate_picture && certificate.certificate_picture.id) || certificate.certificate_picture)
    const newCertificatePictureId = newCertificatePicture && newCertificatePicture.uploadedFileId
    const removedCertificatePictureId = newCertificatePicture && newCertificatePicture.removedId
    const certificatePictureError = !Boolean(newCertificatePictureId || (certificate && certificate.certificate_picture && !removedCertificatePictureId))

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form ref={(e: any) => this.form = e} method='POST' onSubmit={this._onSubmit}
                  className="event-modal edit-modal">
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
                  <p className='title'>{translate['Exporter']} <span className='required-star'>*</span></p>
                  <input defaultValue={certificate_organization_name} name='certificate_organization_name'
                         onChange={this._onChangeFields} className='edit-text-fields'/>

                  <div className='searched-container'>
                    {
                      searchedOrganization && searchedOrganization.map(organization =>
                          <div className='searched-item' key={'searched organization ' + organization.id}
                               onClick={() => this.setSearchedOrganization(organization)}>
                            {organization.official_name}
                          </div>
                      )
                    }
                  </div>
                  <div className='modal-tip'>{translate['Exporter tip']}</div>
                  {certificateOrganizationNameError &&
                  <div className='text-field-error'>{certificateOrganizationNameError}</div>
                  }
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Attached file']} <span className='required-star'>*</span></p>
                  <div className='modal-tip'>{translate['Attached file tip']}</div>
                  <UploadFile fileParentId={certificate && certificate.id}
                              fileId={certificatePictureId}
                              fileCategory={constants.CREATE_FILE_CATEGORIES.CERTIFICATE.PICTURE}
                      // fileType={constants.CREATE_FILE_TYPES.FILE}
                              fileType={constants.CREATE_FILE_TYPES.IMAGE}
                              fileKey={constants.TEMP_FILE_KEYS.CERTIFICATE.PICTURE}/>
                  {certificatePictureError && <div className='text-field-error'>{translate['Fill required fields']}</div>}
                </div>
              </div>
              <div className="buttons">
                <input type='submit' disabled={certificatePictureError} className="button save" value={translate['Submit']}/>
                <div onClick={this._toggle} className="button cancel">{translate['Cancel']}</div>
              </div>
            </form>
          </Modal>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
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