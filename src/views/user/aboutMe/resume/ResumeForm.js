// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import Modal from '../../../pages/modal/modal'
import TempActions from 'src/redux/actions/tempActions'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import UploadFile from '../../../common/components/UploadFile'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  owner: identityType,
  actions: {
    removeFileFromTemp: Function,
    deleteFile: Function,
    updateFile: Function,
    updateUser: Function,
  },
  newResume: Object,
}

type States = {
  modalIsOpen: boolean,
}

class ResumeForm extends React.Component<Props, States> {

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    modalIsOpen: true,
  }

  _toggle = () => {
    const {toggleEdit, actions} = this.props
    const {removeFileFromTemp} = actions
    const fileKey = constants.TEMP_FILE_KEYS.RESUME
    removeFileFromTemp(fileKey)
    this.setState({...this.state, modalIsOpen: false})
    toggleEdit()
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {owner, actions, newResume} = this.props
    const {deleteFile, updateFile, updateUser} = actions
    e.preventDefault()
    e.stopPropagation()

    const newResumeId = newResume && newResume.uploadedFileId
    const removedResumeId = newResume && newResume.removedId
    let formValues = {
      related_cv: newResumeId
          ? newResumeId
          : (removedResumeId ? '' : owner.related_cv),
    }

    updateUser(formValues, owner.id)
    newResumeId && updateFile({
      id: newResumeId,
      formData: {file_related_parent: owner.id},
      fileParentType: constants.FILE_PARENT.PROFILE
    })
    removedResumeId && deleteFile({
      fileId: removedResumeId,
      fileParentId: owner.id,
      fileParentType: constants.FILE_PARENT.PROFILE
    })
    this._toggle()
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, owner} = this.props

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal edit-modal">
              <div className="head">
                <div className="title">{translate['Upload Resume File']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Upload Attach File']}</p>
                  <UploadFile fileParentId={owner && owner.id}
                              fileId={owner && owner.related_cv}
                              fileCategory={constants.CREATE_FILE_CATEGORIES.PROFILE.RESUME}
                              fileType={constants.CREATE_FILE_TYPES.FILE}
                              fileKey={constants.TEMP_FILE_KEYS.RESUME}/>
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Complete the profile with resume']}</p>
                  <div className='modal-tip resume-modal'>{translate['Upload resume tip']}</div>
                  <label className="container-checkmark">
                    <input defaultChecked type="checkbox" name="fill_profile"/>
                    <span className="checkmark"/>
                    <p className='fill-resume-text'>{translate['Complete the profile with resume']}</p>
                  </label>

                </div>
              </div>
              <div className="buttons">
                <input type='submit' className="button save" value={translate['Submit']}/>
                <div onClick={this._toggle} className="button cancel">{translate['Cancel']}</div>
              </div>
            </form>
          </Modal>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    newResume: state.temp.file[constants.TEMP_FILE_KEYS.RESUME],
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeFileFromTemp: TempActions.removeFileFromTemp,
    deleteFile: FileActions.deleteFile,
    updateFile: FileActions.updateFile,
    updateUser: updateUserByUserIdAction.updateUser,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm)