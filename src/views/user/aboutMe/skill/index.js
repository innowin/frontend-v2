// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import SkillView from './SkillView'
import SkillForm from './SkillForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userSkillType} from 'src/consts/flowTypes/user/basicInformation'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  skills: [userSkillType],
  createSkill: Function,
  deleteSkill: Function,
  updateSkill: Function,
  getSkills: Function,
}

type States = {
  isEdit: boolean,
}

class Skill extends React.Component<Props, States> {
  state = {
    isEdit: false,
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    skills: PropTypes.array.isRequired,
    createSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
    updateSkill: PropTypes.func.isRequired,
    getSkills: PropTypes.func.isRequired,
  }

  componentDidMount(): void {
    const {getSkills, owner} = this.props
    getSkills({
      userId: owner.id,
    })
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, createSkill, updateSkill, deleteSkill, skills} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            isEdit
                ? <SkillForm createSkill={createSkill} toggleEdit={this._toggleEdit}
                             translate={translate} owner={owner}/>
                : <SkillView deleteSkill={deleteSkill} updateSkill={updateSkill} skills={skills}
                             owner={owner}
                             translate={translate} toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Skill