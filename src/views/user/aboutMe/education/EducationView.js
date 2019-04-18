// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {educationType} from 'src/consts/flowTypes/user/others'
import CardRowContainer from 'src/views/common/components/CardRowContainer'
import {EditIcon, EducationIcon} from 'src/images/icons'
import CheckOwner from '../../../common/CheckOwner'
import EducationForm from './EducationForm'
import PropTypes from 'prop-types'
import constants from 'src/consts/constants'

type EducationProps = {
  owner: identityType,
  translate: TranslatorType,
  educations: [educationType],
  toggleEdit: Function,
  updateEducation: Function,
}

type EducationStates = {
  isEdit: { [number]: boolean },
}

class EducationView extends React.Component <EducationProps, EducationStates> {
  state = {
    isEdit: {},
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    educations: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
  }

  _toggleEditEducation(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
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
    const {isEdit} = this.state
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
                          ? <CardRowContainer key={'education ' + education.id}
                                              title={this._gradeChangeNamePersian(education.grade, translate)}
                                              svgImage={<EducationIcon/>} fromDate={education.from_date}
                                              toDate={education.to_date}
                          >
                            <div className='card-row-content-right card-row-education'>
                              <CheckOwner id={owner.id}>
                                <EditIcon className='edit-icon pulse'
                                          clickHandler={() => this._toggleEditEducation(education.id)}/>
                              </CheckOwner>
                              <p className='text'>{education.field_of_study}</p>
                              <p className='blue-text'>{education.university}</p>
                            </div>
                          </CardRowContainer>
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