// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import WorkExperienceView from './WorkExperienceView'
import WorkExperienceForm from './WorkExperienceForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {workExperienceType} from 'src/consts/flowTypes/user/others'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  workExperiences: [workExperienceType],
  createWorkExperience: Function,
  deleteWorkExperience: Function,
  updateWorkExperience: Function,
  getWorkExperiences: Function,
}

type States = {
  isEdit: boolean,
}

class WorkExperience extends React.Component<Props, States> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    workExperiences: PropTypes.array.isRequired,
    createWorkExperience: PropTypes.func.isRequired,
    deleteWorkExperience: PropTypes.func.isRequired,
    updateWorkExperience: PropTypes.func.isRequired,
    getWorkExperiences: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
  }

  componentDidMount(): void {
    const {getWorkExperiences, owner} = this.props
    getWorkExperiences({
      userId: owner.id,
    })
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, createWorkExperience, updateWorkExperience, workExperiences, deleteWorkExperience} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            isEdit
                ? <WorkExperienceForm createWorkExperience={createWorkExperience} toggleEdit={this._toggleEdit}
                                      translate={translate} owner={owner}/>
                : <WorkExperienceView deleteWorkExperience={deleteWorkExperience}
                                      updateWorkExperience={updateWorkExperience} workExperiences={workExperiences}
                                      owner={owner} translate={translate} toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default WorkExperience