// @flow
import * as React from 'react'
import {connect} from 'react-redux'
import Modal from '../../../pages/modal/modal'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {identityType} from 'src/consts/flowTypes/identityType'
import Validations from 'src/helpers/validations/validations'
import UploadFile from '../../../common/components/UploadFile'
import constants from 'src/consts/constants'
import {bindActionCreators} from 'redux'
import TempActions from 'src/redux/actions/tempActions'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import type {userSkillType} from 'src/consts/flowTypes/user/basicInformation'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  skill?: userSkillType,
  createSkill?: Function,
  updateSkill?: Function,
  owner: identityType,
  newSkillPicture: Object,
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

class SkillForm extends React.Component<Props, States> {
  state = {
    modalIsOpen: true,
    title: '',
    errors: {
      title: false,
    }
  }

  componentDidMount(): void {
    const {skill, translate} = this.props
    if (skill) {
      this.setState({...this.state, title: skill.title, errors: {...this.state.errors, title: false}})
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
    const {createSkill, owner, newSkillPicture, updateSkill, skill, actions} = this.props
    const {deleteFile, updateFile} = actions
    const {errors} = this.state
    const {title: titleError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    const newSkillPictureId = newSkillPicture && newSkillPicture.uploadedFileId
    const removedSkillPictureId = newSkillPicture && newSkillPicture.removedId
    let formValues = {
      title: form.title.value,
      skill_picture: newSkillPictureId
          ? newSkillPictureId
          : (skill ? skill.skill_picture : ''),
      skill_parent: owner.id,
    }

    if (titleError === false) {
      const newFileIds = [newSkillPictureId]
      if (updateSkill && skill) {
        updateSkill({formValues, skillId: skill.id})
        for (let newFileId of newFileIds) {
          newFileId && updateFile({
            id: newFileId,
            formData: {file_related_parent: skill.id},
            fileParentType: constants.FILE_PARENT.CERTIFICATE
          })
        }
        removedSkillPictureId && deleteFile({
          fileId: removedSkillPictureId,
          fileParentId: skill.id,
          fileParentType: constants.FILE_PARENT.CERTIFICATE
        })
      } else if (createSkill) {
        createSkill({formValues, skillOwnerId: owner.id, newFileIds})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, skill} = this.props
    let title = ''
    if (skill) {
      title = skill.title
    }
    const {errors} = this.state
    const {title: titleError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal skill-modal">
              <div className="head">
                <div className="title">{translate['Add skill']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Skill title']} <span className='required-star'>*</span></p>
                  <input defaultValue={title} onChange={this._onChangeFields} name='title'
                         className='edit-text-fields'/>
                  <div className='modal-tip'>{translate['Skill title tip']}</div>
                  {titleError && <div className='text-field-error'>{titleError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Exporter']}</p>
                  <input name='skill_parent' onChange={this._onChangeFields} className='edit-text-fields'/>
                  <div className='modal-tip'>{translate['Exporter tip']}</div>
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Attached file']}</p>
                  <div className='modal-tip'>{translate['Attached file tip']}</div>
                  <UploadFile fileParentId={skill && skill.id}
                              fileId={skill && skill.skill_picture}
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
    newSkillPicture: state.temp.file[constants.TEMP_FILE_KEYS.CERTIFICATE.PICTURE],
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeFileFromTemp: TempActions.removeFileFromTemp,
    deleteFile: FileActions.deleteFile,
    updateFile: FileActions.updateFile,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillForm)