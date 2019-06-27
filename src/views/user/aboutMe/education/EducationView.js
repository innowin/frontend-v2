// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import CheckOwner from '../../../common/CheckOwner'
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal'
import constants from 'src/consts/constants'
import EducationForm from './EducationForm'
import FontAwesome from 'react-fontawesome'
import type {educationType} from 'src/consts/flowTypes/user/others'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {EditIcon, EducationIcon} from 'src/images/icons'

type EducationProps = {
  owner: identityType,
  translate: TranslatorType,
  educations: [educationType],
  toggleEdit: Function,
  updateEducation: Function,
  deleteEducation: Function,
}

type EducationStates = {
  isEdit: { [number]: boolean },
  isDelete: { [number]: boolean },
  isLoading: { [number]: boolean },
}

class EducationView extends React.Component <EducationProps, EducationStates> {
  state = {
    isEdit: {},
    isDelete: {},
    isLoading: {},
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    educations: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired,
  }

  _toggleEditEducation = (id: number) => {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  _toggleDeleteEducation = (id: number) => {
    let {isDelete} = this.state
    if (!isDelete[id]) {
      isDelete[id] = false
    }
    this.setState({...this.state, isDelete: {...isDelete, [id]: !isDelete[id]}})
  }

  _deleteEducation = (id: number) => {
    const {deleteEducation, owner} = this.props
    const {isLoading} = this.state
    !isLoading[id] && deleteEducation({educationId: id, userId: owner.id})

    this.setState({...this.state, isLoading: {...isLoading, [id]: true}})
  }

  _gradeChangeNamePersian = (educationGrade: string, translate: TranslatorType) => {
    let grade
    if (educationGrade === constants.SERVER_GRADES.BACHELOR) {
      grade = translate[constants.SERVER_GRADES.BACHELOR]
    } else if (educationGrade === constants.SERVER_GRADES.MASTER) {
      grade = translate[constants.SERVER_GRADES.MASTER]
    } else if (educationGrade === constants.SERVER_GRADES.PHD) {
      grade = translate[constants.SERVER_GRADES.PHD]
    } else {
      grade = educationGrade
    }
    return grade
  }

  render() {
    const {translate, educations, owner, toggleEdit, updateEducation} = this.props
    const {isEdit, isDelete} = this.state
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Education']}
            </div>
            <CheckOwner id={owner.id}>
              <div className='add-button pulse' onClick={toggleEdit}>
                + {translate['Add']}
              </div>
            </CheckOwner>
          </div>

          <div className="content">
            {educations.map(education => {
                  return (
                      !isEdit[education.id]
                          ? <React.Fragment key={'education ' + education.id}>
                            <CardRowContainer
                                title={this._gradeChangeNamePersian(education.grade, translate)}
                                svgImage={<EducationIcon/>} fromDate={education.from_date}
                                toDate={education.to_date}
                            >
                              <div className='card-row-content-right card-row-education'>
                                <CheckOwner id={owner.id}>
                                  <EditIcon className='edit-icon pulse'
                                            clickHandler={() => this._toggleEditEducation(education.id)}/>
                                  <FontAwesome className='trash-icon pulse' name='trash'
                                               onClick={() => this._toggleDeleteEducation(education.id)}/>
                                </CheckOwner>
                                <p className='text'>{education.field_of_study}</p>
                                <p className='text'>{education.university}</p>
                              </div>
                            </CardRowContainer>
                            <ConfirmDeleteModal key={'delete education ' + education.id} translate={translate}
                                                closer={() => this._toggleDeleteEducation(education.id)}
                                                deleteEntity={() => this._deleteEducation(education.id)}
                                                open={isDelete[education.id]}/>
                          </React.Fragment>
                          : <EducationForm key={'education form' + education.id} updateEducation={updateEducation}
                                           translate={translate} owner={owner} education={education}
                                           toggleEdit={() => this._toggleEditEducation(education.id)}/>
                  )
                }
            )}
          </div>
        </React.Fragment>
    )
  }
}

export default EducationView