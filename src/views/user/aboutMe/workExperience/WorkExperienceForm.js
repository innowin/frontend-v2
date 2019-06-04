// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../../pages/modal/modal'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {workExperienceType} from 'src/consts/flowTypes/user/others'
import Validations from 'src/helpers/validations/validations'
import numberCorrection from 'src/helpers/numberCorrection'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  workExperience?: workExperienceType,
  createWorkExperience?: Function,
  updateWorkExperience?: Function,
  getOrganizationsFilterByOfficialName: Function,
  emptySearchedOrganization: Function,
  searchedOrganization: [organizationType],
  owner: identityType,
}

type States = {
  modalIsOpen: boolean,
  name: string,
  work_experience_organization_name: string,
  selectedOrganization: ?number,
  errors: {
    name: boolean,
    work_experience_organization_name: boolean,
  }
}

class WorkExperienceForm extends React.Component<Props, States> {

  form: SyntheticEvent<HTMLFormElement>

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    workExperience: PropTypes.object,
    createWorkExperience: PropTypes.func,
    updateWorkExperience: PropTypes.func,
    getOrganizationsFilterByOfficialName: PropTypes.func.isRequired,
    emptySearchedOrganization: PropTypes.func.isRequired,
    searchedOrganization: PropTypes.array.isRequired,
    owner: PropTypes.object.isRequired,
  }

  state = {
    modalIsOpen: true,
    name: '',
    work_experience_organization_name: '',
    selectedOrganization: undefined,
    errors: {
      name: false,
      work_experience_organization_name: false,
    }
  }

  componentDidMount(): void {
    const {workExperience, translate, emptySearchedOrganization} = this.props
    if (workExperience) {
      this.setState({
        ...this.state,
        name: workExperience.name,
        work_experience_organization_name: workExperience.work_experience_organization_name,
        selectedOrganization: workExperience.work_experience_organization,
      })
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          name: Validations.validateRequired({value: this.state.name, translate}),
          work_experience_organization_name: Validations.validateRequired({
            value: this.state.work_experience_organization_name,
            translate
          })
        }
      })
    }

    emptySearchedOrganization()
  }

  _toggle = () => {
    const {toggleEdit} = this.props
    this.setState({...this.state, modalIsOpen: false})
    toggleEdit()
  }

  _onChangeFields = (event: SyntheticEvent<HTMLInputElement>) => {
    const {translate, getOrganizationsFilterByOfficialName} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : numberCorrection(target.value)
    const name = target.name
    let error = false
    if (name === 'name') {
      error = Validations.validateRequired({value, translate})
    } else if (name === 'work_experience_organization_name') {
      error = Validations.validateRequired({value, translate})
      if (!error && value.length >= 3) {
        getOrganizationsFilterByOfficialName({officialName: value})
      }
    }

    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: error
      },
      selectedOrganization: undefined,
    })
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {createWorkExperience, owner, updateWorkExperience, workExperience} = this.props
    const {errors, selectedOrganization} = this.state
    const {name: nameError, work_experience_organization_name: workExperienceOrganizationNameError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    let formValues = {
      name: form.name.value,
      work_experience_related_identity: owner.id,
    }
    if (selectedOrganization) {
      formValues = {
        ...formValues,
        work_experience_organization: selectedOrganization,
        work_experience_organization_name: ''
      }
    } else {
      formValues = {
        ...formValues,
        work_experience_organization_name: form.work_experience_organization_name.value,
        work_experience_organization: null
      }
    }

    if (Boolean(nameError || workExperienceOrganizationNameError) === false) {
      if (updateWorkExperience && workExperience) {
        updateWorkExperience({formValues, workExperienceId: workExperience.id})
      } else if (createWorkExperience) {
        createWorkExperience({formValues, userId: owner.id})
      }
      this._toggle()
    }
  }

  setSearchedOrganization = (organization: organizationType) => {
    const {emptySearchedOrganization} = this.props
    emptySearchedOrganization()
    this.setState({
      ...this.state,
      selectedOrganization: organization.id,
      work_experience_organization_name: organization.official_name,
      errors: {
        ...this.state.errors,
        work_experience_organization_name: false,
      }
    })
    this.form.work_experience_organization_name.value = organization.official_name
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, workExperience, searchedOrganization} = this.props
    let name = '', work_experience_organization_name = ''
    if (workExperience) {
      name = workExperience.name
      work_experience_organization_name = workExperience.work_experience_organization_name || workExperience.organizationOfficialName
    }
    const {errors} = this.state
    const {name: nameError, work_experience_organization_name: workExperienceOrganizationNameError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form ref={(e: any) => this.form = e} method='POST' onSubmit={this._onSubmit}
                  className="event-modal edit-modal">
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
                  <input defaultValue={work_experience_organization_name} onChange={this._onChangeFields}
                         name='work_experience_organization_name'
                         className='edit-text-fields' placeholder={translate['Name work']}/>
                  <div className='searched-container'>
                    {
                      searchedOrganization.map(organization =>
                          <div className='searched-item' key={'searched organization ' + organization.id}
                               onClick={() => this.setSearchedOrganization(organization)}>
                            {organization.official_name}
                          </div>
                      )
                    }
                  </div>
                  <div className='modal-tip'>{translate['WorkExperience position tip']}</div>
                  {workExperienceOrganizationNameError &&
                  <div className='text-field-error'>{workExperienceOrganizationNameError}</div>
                  }
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