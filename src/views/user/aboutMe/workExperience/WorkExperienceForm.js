// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../../pages/modal/modal'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {workExperienceType} from 'src/consts/flowTypes/user/others'
import Validations from 'src/helpers/validations/validations'
import numberCorrection from '../../../../helpers/numberCorrection'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  workExperience?: workExperienceType,
  createWorkExperience?: Function,
  updateWorkExperience?: Function,
  owner: identityType,
}

type States = {
  modalIsOpen: boolean,
  name: string,
  position: string,
  errors: {
    name: boolean,
    position: boolean,
  }
}

class WorkExperienceForm extends React.Component<Props, States> {

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    workExperience: PropTypes.object,
    createWorkExperience: PropTypes.func,
    updateWorkExperience: PropTypes.func,
    owner: PropTypes.object.isRequired,
  }

  state = {
    modalIsOpen: true,
    name: '',
    position: '',
    errors: {
      name: false,
      position: false,
    }
  }

  componentDidMount(): void {
    const {workExperience, translate} = this.props
    if (workExperience) {
      this.setState({
        ...this.state,
        name: workExperience.name,
        position: workExperience.position,
      })
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          name: Validations.validateRequired({value: this.state.name, translate}),
          position: Validations.validateRequired({value: this.state.position, translate})
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
    if (name === 'name') {
      error = Validations.validateRequired({value, translate})
    } else if (name === 'position') {
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
    const {createWorkExperience, owner, updateWorkExperience, workExperience} = this.props
    const {errors} = this.state
    const {name: nameError, position: positionError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    let formValues = {
      name: form.name.value,
      position: form.position.value,
      work_experience_related_identity: owner.id,
      work_experience_organization: 4309,
    }

    if (nameError || positionError === false) {
      if (updateWorkExperience && workExperience) {
        updateWorkExperience({formValues, workExperienceId: workExperience.id})
      } else if (createWorkExperience) {
        createWorkExperience({formValues, userId: owner.id})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, workExperience} = this.props
    let name = '', position = ''
    if (workExperience) {
      name = workExperience.name
      position = workExperience.position
    }
    const {errors} = this.state
    const {name: nameError, position: positionError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal edit-modal">
              <div className="head">
                <div className="title">{translate['Add workExperience']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Job Title']} <span className='required-star'>*</span></p>
                  <input defaultValue={name} onChange={this._onChangeFields} name='name'
                         className='edit-text-fields' placeholder={translate['Job Title']}/>
                  <div className='modal-tip'>{translate['WorkExperience name tip']}</div>
                  {nameError && <div className='text-field-error'>{nameError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Name work']} <span className='required-star'>*</span></p>
                  <input defaultValue={position} onChange={this._onChangeFields} name='position'
                         className='edit-text-fields' placeholder={translate['Name work']}/>
                  <div className='modal-tip'>{translate['WorkExperience position tip']}</div>
                  {positionError && <div className='text-field-error'>{positionError}</div>}
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

export default WorkExperienceForm