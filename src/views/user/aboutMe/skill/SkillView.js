// @flow
import * as React from "react"
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import CheckOwner from '../../../common/CheckOwner'
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal'
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
  deleteSkill: Function,
}

type SkillStates = {
  isEdit: { [number]: boolean },
  isDelete: { [number]: boolean },
  isLoading: { [number]: boolean },
}

class SkillView extends React.Component <SkillProps, SkillStates> {
  state = {
    isEdit: {},
    isDelete: {},
    isLoading: {},
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    skills: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
  }

  _toggleEditSkill(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  _toggleDeleteSkill(id: number) {
    let {isDelete} = this.state
    if (!isDelete[id]) {
      isDelete[id] = false
    }
    this.setState({...this.state, isDelete: {...isDelete, [id]: !isDelete[id]}})
  }

  _deleteSkill = (id: number) => {
    const {deleteSkill, owner} = this.props
    const {isLoading} = this.state
    !isLoading[id] && deleteSkill({skillId: id, userId: owner.id})

    this.setState({...this.state, isLoading: {...isLoading, [id]: true}})
  }

  render() {
    const {translate, skills, owner, toggleEdit, updateSkill} = this.props
    const {isEdit, isDelete} = this.state
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
                          ?
                          <React.Fragment key={'skill ' + skill.id}>
                            <CardRowContainer
                                title={translate['Skill']}
                                svgImage={<NewSkillIcon/>} fromDate={skill.from_date}
                                toDate={skill.to_date}
                            >
                              <div className='card-row-content-right card-row-skill'>
                                <CheckOwner id={owner.id}>
                                  <EditIcon className='edit-icon pulse'
                                            clickHandler={() => this._toggleEditSkill(skill.id)}/>
                                  <FontAwesome className='trash-icon pulse' name='trash'
                                               onClick={() => this._toggleDeleteSkill(skill.id)}/>
                                </CheckOwner>
                                <p className='text'>{skill.title}</p>
                                {
                                  [1, 2, 3, 4, 5].map((level, index) =>
                                      <span key={'skill level' + index} className={skill.level >= level
                                          ? 'level-dot fill'
                                          : 'level-dot empty'
                                      }/>
                                  )
                                }
                              </div>
                            </CardRowContainer>
                            <ConfirmDeleteModal key={'delete skill ' + skill.id} translate={translate}
                                                closer={() => this._toggleDeleteSkill(skill.id)}
                                                deleteEntity={() => this._deleteSkill(skill.id)}
                                                open={isDelete[skill.id]}/>
                          </React.Fragment>
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