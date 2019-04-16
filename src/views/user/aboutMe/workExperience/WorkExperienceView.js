// @flow
import * as React from "react";
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import CheckOwner from '../../../common/CheckOwner'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {workExperienceType} from 'src/consts/flowTypes/user/others'
import WorkExperienceForm from './WorkExperienceForm'
import {EditIcon, workExperienceIcon} from 'src/images/icons'

type WorkExperienceProps = {
  owner: identityType,
  translate: TranslatorType,
  workExperiences: [workExperienceType],
  toggleEdit: Function,
  updateWorkExperience: Function,
}

type WorkExperienceStates = {
  isEdit: { [number]: boolean },
}

class WorkExperienceView extends React.Component <WorkExperienceProps, WorkExperienceStates> {
  state = {
    isEdit: {},
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    workExperiences: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateWorkExperience: PropTypes.func.isRequired,
  }

  _toggleEditWorkExperience(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  render() {
    const {translate, workExperiences, owner, toggleEdit, updateWorkExperience} = this.props
    const {isEdit} = this.state
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
                          ? <CardRowContainer key={'workExperience ' + workExperience.id}
                                              title={translate['Work experience']}
                                              svgImage={workExperienceIcon} fromDate={workExperience.from_date}
                                              toDate={workExperience.to_date}
                          >
                            <div className='card-row-content-right card-row-workExperience'>
                              <CheckOwner id={owner.id}>
                                <EditIcon className='edit-icon pulse'
                                          clickHandler={() => this._toggleEditWorkExperience(workExperience.id)}/>
                              </CheckOwner>
                              <p className='text'>{workExperience.position}</p>
                              <p className='blue-text'>{workExperience.name}</p>
                            </div>
                          </CardRowContainer>
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