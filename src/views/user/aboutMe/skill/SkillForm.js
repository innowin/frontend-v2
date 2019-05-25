// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import constants from 'src/consts/constants'
import Modal from '../../../pages/modal/modal'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {skillType} from 'src/consts/flowTypes/user/others'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import Validations from 'src/helpers/validations/validations'
import numberCorrection from '../../../../helpers/numberCorrection'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  skill?: skillType,
  createSkill?: Function,
  updateSkill?: Function,
  owner: identityType,
}

type States = {
  modalIsOpen: boolean,
  title: string,
  level: string,
  errors: {
    title: boolean,
    level: boolean,
  }
}

class SkillForm extends React.Component<Props, States> {

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    skill: PropTypes.object,
    createSkill: PropTypes.func,
    updateSkill: PropTypes.func,
    owner: PropTypes.object.isRequired,
  }

  state = {
    modalIsOpen: true,
    title: '',
    level: constants.SERVER_LEVELS.VERY_LOW,
    errors: {
      title: false,
      level: false,
    }
  }

  componentDidMount(): void {
    const {skill, translate} = this.props
    if (skill) {
      this.setState({
        ...this.state,
        title: skill.title,
        level: skill.level,
      })
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          title: Validations.validateRequired({value: this.state.title, translate}),
          level: Validations.validateRequired({value: this.state.level, translate}),
        }
      })
    }
  }

  _toggle = () => {
    const {toggleEdit} = this.props
    this.setState({...this.state, modalIsOpen: false})
    toggleEdit()
  }

  _onChangeFields = (event: SyntheticEvent<HTMLInputElement>) => {
    const {translate} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : numberCorrection(target.value)
    const name = target.name
    let error = false
    if (name === 'title') {
      error = Validations.validateRequired({value, translate})
    }
    else if (name === 'level') {
      error = Validations.validateRequired({value, translate})
    }

    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: error
      }
    })
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {createSkill, owner, updateSkill, skill} = this.props
    const {errors} = this.state
    const {title: titleError, level: levelError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    let formValues = {
      title: form.title.value,
      level: numberCorrection(form.level.value),
      skill_related_identity: owner.id,
    }

    if (titleError || levelError === false) {
      if (updateSkill && skill) {
        updateSkill({formValues, skillId: skill.id, userId: owner.id})
      } else if (createSkill) {
        createSkill({formValues, userId: owner.id})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, skill} = this.props
    let title = '', level = ''
    if (skill) {
      title = skill.title
    }
    const {errors} = this.state
    const {title: titleError, level: levelError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal edit-modal">
              <div className="head">
                <div className="title">{translate['Add skill']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Skill title']} <span className='required-star'>*</span></p>
                  <input placeholder={translate['Skill title']} defaultValue={title} onChange={this._onChangeFields} name='title'
                         className='edit-text-fields'/>
                  <div className='modal-tip'>{translate['Skill title tip']}</div>
                  {titleError && <div className='text-field-error'>{titleError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Skill level']} <span className='required-star'>*</span></p>
                  <select className='edit-text-fields' defaultValue={level} name='level'
                          onChange={this._onChangeFields}>
                    <option value={constants.SERVER_LEVELS.VERY_LOW}>
                      {translate.skills[constants.SERVER_LEVELS.VERY_LOW]}
                    </option>
                    <option value={constants.SERVER_LEVELS.LOW}>
                      {translate.skills[constants.SERVER_LEVELS.LOW]}
                    </option>
                    <option value={constants.SERVER_LEVELS.MEDIUM}>
                      {translate.skills[constants.SERVER_LEVELS.MEDIUM]}
                    </option>
                    <option value={constants.SERVER_LEVELS.GOOD}>
                      {translate.skills[constants.SERVER_LEVELS.GOOD]}
                    </option>
                    <option value={constants.SERVER_LEVELS.VERY_GOOD}>
                      {translate.skills[constants.SERVER_LEVELS.VERY_GOOD]}
                    </option>
                  </select>
                  {levelError && <div className='text-field-error'>{levelError}</div>}
                </div>
              </div>
              <div className="buttons">
                <input type='submit' className="button save" value={translate['Submit']}/>
                <div onClick={this._toggle} className="button cancel">{translate['Cancel']}</div>
              </div>
            </form>
          </Modal>
        </div>
    )
  }
}

export default SkillForm