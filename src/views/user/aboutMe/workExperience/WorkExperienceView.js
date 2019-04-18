// @flow
import * as React from "react";
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal'
import CheckOwner from '../../../common/CheckOwner'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {workExperienceType} from 'src/consts/flowTypes/user/others'
import WorkExperienceForm from './WorkExperienceForm'
import {EditIcon, workExperienceIcon} from 'src/images/icons'
import FontAwesome from 'react-fontawesome'

type WorkExperienceProps = {
  owner: identityType,
  translate: TranslatorType,
  workExperiences: [workExperienceType],
  toggleEdit: Function,
  updateWorkExperience: Function,
  deleteWorkExperience: Function,
}

type WorkExperienceStates = {
  isEdit: { [number]: boolean },
  isDelete: { [number]: boolean },
  isLoading: { [number]: boolean },
}

class WorkExperienceView extends React.Component <WorkExperienceProps, WorkExperienceStates> {
  state = {
    isEdit: {},
    isDelete: {},
    isLoading: {},
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    workExperiences: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateWorkExperience: PropTypes.func.isRequired,
    deleteWorkExperience: PropTypes.func.isRequired,
  }

  _toggleEditWorkExperience(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  _toggleDeleteWorkExperience(id: number) {
    let {isDelete} = this.state
    if (!isDelete[id]) {
      isDelete[id] = false
    }
    this.setState({...this.state, isDelete: {...isDelete, [id]: !isDelete[id]}})
  }

  _deleteWorkExperience = (id: number) => {
    const {deleteWorkExperience, owner} = this.props
    const {isLoading} = this.state
    !isLoading[id] && deleteWorkExperience({workExperienceId: id, userId: owner.id})

    this.setState({...this.state, isLoading: {...isLoading, [id]: true}})
  }

  render() {
    const {translate, workExperiences, owner, toggleEdit, updateWorkExperience} = this.props
    const {isEdit, isDelete} = this.state
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['WorkExperience']}
            </div>
            <CheckOwner id={owner.id}>
              <div className='add-button pulse' onClick={toggleEdit}>
                + {translate['Add']}
              </div>
            </CheckOwner>
          </div>

          <div className="content">
            {workExperiences.map(workExperience => {
                  return (
                      !isEdit[workExperience.id]
                          ? <React.Fragment>
                            <CardRowContainer key={'workExperience ' + workExperience.id}
                                              title={translate['Work experience']}
                                              svgImage={workExperienceIcon} fromDate={workExperience.from_date}
                                              toDate={workExperience.to_date}
                            >
                              <div className='card-row-content-right card-row-workExperience'>
                                <CheckOwner id={owner.id}>
                                  <EditIcon className='edit-icon pulse'
                                            clickHandler={() => this._toggleEditWorkExperience(workExperience.id)}/>
                                  <FontAwesome className='trash-icon pulse' name='trash'
                                               onClick={() => this._toggleDeleteWorkExperience(workExperience.id)}/>
                                </CheckOwner>
                                <p className='text'>{workExperience.position}</p>
                                <p className='blue-text'>{workExperience.name}</p>
                              </div>
                            </CardRowContainer>
                            <ConfirmDeleteModal key={'delete workExperience ' + workExperience.id} translate={translate}
                                                closer={() => this._toggleDeleteWorkExperience(workExperience.id)}
                                                deleteEntity={() => this._deleteWorkExperience(workExperience.id)}
                                                open={isDelete[workExperience.id]}/>
                          </React.Fragment>
                          : <WorkExperienceForm key={'workExperience form' + workExperience.id}
                                                updateWorkExperience={updateWorkExperience}
                                                translate={translate} owner={owner} workExperience={workExperience}
                                                toggleEdit={() => this._toggleEditWorkExperience(workExperience.id)}/>
                  )
                }
            )}
          </div>
        </React.Fragment>
    )
  }
}

export default WorkExperienceView