// @flow
import * as React from "react"
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import CheckOwner from '../../../common/CheckOwner'
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal'
import constants from 'src/consts/constants'
import ResumeForm from './ResumeForm'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {EditIcon, LinkedInIcon} from 'src/images/icons'

type ResumeProps = {
  owner: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
  files: { [number]: fileType },
  deleteFile: Function,
  updateUser: Function,
}

type ResumeStates = {
  isEdit: boolean,
  isDelete: boolean,
  isLoading: boolean,
}

class ResumeView extends React.Component <ResumeProps, ResumeStates> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    deleteFile: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
    isDelete: false,
    isLoading: false,
  }

  _toggleEditResume() {
    let {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  _toggleDeleteResume() {
    let {isDelete} = this.state
    this.setState({...this.state, isDelete: !isDelete})
  }

  _deleteResume = () => {
    const {deleteFile, owner, updateUser} = this.props
    const {isLoading} = this.state

    if (!isLoading) {
      deleteFile({
        fileId: owner.related_cv,
        fileParentId: owner.id,
        fileParentType: constants.FILE_PARENT.PROFILE
      })

      const formValues = {
        related_cv: '',
      }
      updateUser(formValues, owner.id)
    }

    this.setState({...this.state, isLoading: true})
  }

  render() {
    const {translate, owner, toggleEdit, files} = this.props
    const {isEdit, isDelete} = this.state
    const resume = owner.related_cv && files[owner.related_cv]
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Resume File']}
            </div>
            {!owner.related_cv &&
            <CheckOwner id={owner.id}>
              <div className='add-button pulse' onClick={toggleEdit}>
                + {translate['Add']}
              </div>
            </CheckOwner>
            }
          </div>

          <div className="content">
            {!isEdit
                ? resume &&
                <React.Fragment>
                  <CardRowContainer title={translate['Resume']} svgImage={<LinkedInIcon/>}
                                    createdTime={resume.created_time}
                  >
                    <div className='card-row-content-right card-row-entity'>
                      <CheckOwner id={owner.id}>
                        <EditIcon className='edit-icon pulse'
                                  clickHandler={() => this._toggleEditResume()}/>
                        <FontAwesome className='trash-icon pulse' name='trash'
                                     onClick={() => this._toggleDeleteResume()}/>
                      </CheckOwner>
                      <a className='attach-file' href={resume.file}>
                        <FontAwesome className='attach-file-icon' name='paperclip'/>
                        {translate['Attached file']}
                      </a>
                    </div>
                  </CardRowContainer>

                  <ConfirmDeleteModal translate={translate} closer={() => this._toggleDeleteResume()}
                                      deleteEntity={() => this._deleteResume()} open={isDelete}/>
                </React.Fragment>
                : <ResumeForm translate={translate} owner={owner} toggleEdit={() => this._toggleEditResume()}/>
            }
          </div>
        </React.Fragment>
    )
  }
}

export default ResumeView