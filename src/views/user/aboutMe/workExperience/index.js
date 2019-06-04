// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import WorkExperienceView from './WorkExperienceView'
import WorkExperienceForm from './WorkExperienceForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {workExperienceType} from 'src/consts/flowTypes/user/others'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  workExperiences: [workExperienceType],
  createWorkExperience: Function,
  deleteWorkExperience: Function,
  updateWorkExperience: Function,
  getWorkExperiences: Function,
  getOrganizationsFilterByOfficialName: Function,
  emptySearchedOrganization: Function,
  searchedOrganizations: [organizationType],
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
    getOrganizationsFilterByOfficialName: PropTypes.func.isRequired,
    emptySearchedOrganization: PropTypes.func.isRequired,
    searchedOrganizations: PropTypes.array.isRequired,
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
    const {
      owner, translate, createWorkExperience, updateWorkExperience, workExperiences, deleteWorkExperience,
      getOrganizationsFilterByOfficialName, searchedOrganizations, emptySearchedOrganization
    } = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            isEdit
                ? <WorkExperienceForm createWorkExperience={createWorkExperience} toggleEdit={this._toggleEdit}
                                      getOrganizationsFilterByOfficialName={getOrganizationsFilterByOfficialName}
                                      searchedOrganization={searchedOrganizations}
                                      emptySearchedOrganization={emptySearchedOrganization} translate={translate}
                                      owner={owner}/>
                : <WorkExperienceView deleteWorkExperience={deleteWorkExperience}
                                      updateWorkExperience={updateWorkExperience} workExperiences={workExperiences}
                                      getOrganizationsFilterByOfficialName={getOrganizationsFilterByOfficialName}
                                      searchedOrganization={searchedOrganizations}
                                      emptySearchedOrganization={emptySearchedOrganization} owner={owner}
                                      translate={translate} toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default WorkExperience