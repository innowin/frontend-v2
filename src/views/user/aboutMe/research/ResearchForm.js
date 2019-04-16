// @flow
import * as React from 'react'
import Modal from '../../../pages/modal/modal'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {researchType} from 'src/consts/flowTypes/user/others'
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
  research?: researchType,
  createResearch?: Function,
  updateResearch?: Function,
  owner: identityType,
  newResearchPicture: Object,
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

class ResearchForm extends React.Component<Props, States> {
  state = {
    modalIsOpen: true,
    title: '',
    errors: {
      title: false,
    }
  }

  componentDidMount(): void {
    const {research, translate} = this.props
    if (research) {
      this.setState({...this.state, title: research.title, errors: {...this.state.errors, title: false}})
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
    const {createResearch, owner, newResearchPicture, updateResearch, research, actions} = this.props
    const {deleteFile, updateFile} = actions
    const {errors} = this.state
    const {title: titleError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const newResearchPictureId = newResearchPicture && newResearchPicture.uploadedFileId
    const removedResearchPictureId = newResearchPicture && newResearchPicture.removedId
    let formValues = {
      title: form.title.value,
      research_picture: newResearchPictureId
          ? newResearchPictureId
          : (research ? research.research_picture : ''),
      research_parent: owner.id,
    }

    if (titleError === false) {
      const newFileIds = [newResearchPictureId]
      if (updateResearch && research) {
        updateResearch({formValues, researchId: research.id})
        for (let newFileId of newFileIds) {
          newFileId && updateFile({
            id: newFileId,
            formData: {file_related_parent: research.id},
            fileParentType: constants.FILE_PARENT.CERTIFICATE
          })
        }
        removedResearchPictureId && deleteFile({
          fileId: removedResearchPictureId,
          fileParentId: research.id,
          fileParentType: constants.FILE_PARENT.CERTIFICATE
        })
      } else if (createResearch) {
        createResearch({formValues, researchOwnerId: owner.id, newFileIds})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, research} = this.props
    let title = ''
    if (research) {
      title = research.title
    }
    const {errors} = this.state
    const {title: titleError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal research-modal">
              <div className="head">
                <div className="title">{translate['Add research']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Research title']} <span className='required-star'>*</span></p>
                  <input defaultValue={title} onChange={this._onChangeFields} name='title'
                         className='edit-text-fields'/>
                  <div className='modal-tip'>{translate['Research title tip']}</div>
                  {titleError && <div className='text-field-error'>{titleError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Exporter']}</p>
                  <input name='research_parent' onChange={this._onChangeFields} className='edit-text-fields'/>
                  <div className='modal-tip'>{translate['Exporter tip']}</div>
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Attached file']}</p>
                  <div className='modal-tip'>{translate['Attached file tip']}</div>
                  <UploadFile fileParentId={research && research.id}
                              fileId={research && research.research_picture}
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
    newResearchPicture: state.temp.file[constants.TEMP_FILE_KEYS.CERTIFICATE.PICTURE],
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeFileFromTemp: TempActions.removeFileFromTemp,
    deleteFile: FileActions.deleteFile,
    updateFile: FileActions.updateFile,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ResearchForm)