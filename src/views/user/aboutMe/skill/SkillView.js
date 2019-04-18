// @flow
import * as React from "react";
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import CheckOwner from '../../../common/CheckOwner'
import SkillForm from './SkillForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {skillType} from 'src/consts/flowTypes/user/others'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {EditIcon, NewSkillIcon} from 'src/images/icons'

type SkillProps = {
  owner: identityType,
  translate: TranslatorType,
  skills: [skillType],
  toggleEdit: Function,
  updateSkill: Function,
}

type SkillStates = {
  isEdit: { [number]: boolean },
}

class SkillView extends React.Component <SkillProps, SkillStates> {
  state = {
    isEdit: {},
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    skills: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateSkill: PropTypes.func.isRequired,
  }

  _toggleEditSkill(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  render() {
    const {translate, skills, owner, toggleEdit, updateSkill} = this.props
    const {isEdit} = this.state
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Skill']}
            </div>
            <CheckOwner id={owner.id}>
              <div className='add-button pulse' onClick={toggleEdit}>
                + {translate['Add']}
              </div>
            </CheckOwner>
          </div>

          <div className="content">
            {skills.map(skill => {
                  return (
                      !isEdit[skill.id]
                          ? <CardRowContainer key={'skill ' + skill.id}
                                              title={translate['Skill']}
                                              svgImage={<NewSkillIcon/>} fromDate={skill.from_date}
                                              toDate={skill.to_date}
                          >
                            <div className='card-row-content-right card-row-skill'>
                              <CheckOwner id={owner.id}>
                                <EditIcon className='edit-icon pulse'
                                          clickHandler={() => this._toggleEditSkill(skill.id)}/>
                              </CheckOwner>
                              <p className='text'>{skill.title}</p>
                            </div>
                          </CardRowContainer>
                          : <SkillForm key={'skill form' + skill.id}
                                                updateSkill={updateSkill}
                                                translate={translate} owner={owner} skill={skill}
                                                toggleEdit={() => this._toggleEditSkill(skill.id)}/>
                  )
                }
            )}
          </div>
        </React.Fragment>
    )
  }
}

export default SkillView