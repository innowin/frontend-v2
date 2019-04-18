// @flow
import * as React from 'react'
import Modal from '../../../pages/modal/modal'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {researchType} from 'src/consts/flowTypes/user/others'
import type {identityType} from 'src/consts/flowTypes/identityType'
import Validations from 'src/helpers/validations/validations'
import constants from 'src/consts/constants'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  research?: researchType,
  createResearch?: Function,
  updateResearch?: Function,
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

class ResearchForm extends React.Component<Props, States> {
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
    const {research, translate} = this.props
    if (research) {
      this.setState({
        ...this.state,
        name: research.name,
        position: research.position,
      })
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          name: Validations.validateRequired({value: this.state.name, translate}),
          position: Validations.validateRequired({value: this.state.position, translate}),
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
    const value = target.type === 'checkbox' ? target.checked : target.value
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
    const {createResearch, owner, updateResearch, research} = this.props
    const {errors} = this.state
    const {name: nameError, position: positionError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    let formValues = {
      name: form.name.value,
      position: form.position.value,
    }

    if (nameError === false) {
      if (updateResearch && research) {
        updateResearch({formValues, researchId: research.id})
      } else if (createResearch) {
        createResearch({formValues, researchOwnerId: owner.id})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, research} = this.props
    let name = '', position = ''
    if (research) {
      name = research.name
      position = research.position
    }
    const {errors} = this.state
    const {name: nameError, position: positionError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal edit-modal">
              <div className="head">
                <div className="title">{translate['Add research']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Research title']} <span className='required-star'>*</span></p>
                  <input defaultValue={name} onChange={this._onChangeFields} name='name'
                         className='edit-text-fields'/>
                  {nameError && <div className='text-field-error'>{nameError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Research title']} <span className='required-star'>*</span></p>
                  <input defaultValue={name} onChange={this._onChangeFields} name='name'
                         className='edit-text-fields'/>
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

export default ResearchForm