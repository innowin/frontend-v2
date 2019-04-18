// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import constants from 'src/consts/constants'
import Modal from '../../../pages/modal/modal'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userEducationType} from 'src/consts/flowTypes/user/basicInformation'
import Validations from 'src/helpers/validations/validations'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  education?: userEducationType,
  createEducation?: Function,
  updateEducation?: Function,
  owner: identityType,
}

type States = {
  modalIsOpen: boolean,
  grade: string,
  field_of_study: string,
  university: string,
  from_date: string,
  to_date: string,
  errors: {
    grade: boolean,
    field_of_study: boolean,
    university: boolean,
    from_date: boolean,
    to_date: boolean,
  }
}

class EducationForm extends React.Component<Props, States> {

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    education: PropTypes.object,
    createEducation: PropTypes.func,
    updateEducation: PropTypes.func,
    owner: PropTypes.object.isRequired,
  }

  state = {
    modalIsOpen: true,
    grade: constants.SERVER_GRADES.BACHELOR,
    field_of_study: '',
    university: '',
    from_date: '',
    to_date: '',
    errors: {
      grade: false,
      field_of_study: false,
      university: false,
      from_date: false,
      to_date: false,
    }
  }

  componentDidMount(): void {
    const {education, translate} = this.props
    if (education) {
      this.setState({
        ...this.state,
        grade: education.grade,
        field_of_study: education.field_of_study,
        university: education.university,
        from_date: education.from_date,
        to_date: education.to_date,
      })
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          grade: Validations.validateRequired({value: this.state.grade, translate}),
          field_of_study: Validations.validateRequired({value: this.state.field_of_study, translate}),
          university: Validations.validateRequired({value: this.state.university, translate}),
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
    if (name === 'grade') {
      error = Validations.validateRequired({value, translate})
    } else if (name === 'field_of_study') {
      error = Validations.validateRequired({value, translate})
    } else if (name === 'university') {
      error = Validations.validateRequired({value, translate})
    } else if (name === 'from_date') {
      error = Validations.validateDate({value, translate})
    } else if (name === 'to_date') {
      error = Validations.validateDate({value, translate})
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
    const {createEducation, owner, updateEducation, education} = this.props
    const {errors} = this.state
    const {
      grade: gradeError, university: universityError, to_date: toDateError, from_date: fromDateError,
      field_of_study: fieldOfStudyError
    } = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    let formValues = {
      grade: form.grade.value,
      field_of_study: form.field_of_study.value,
      university: form.university.value,
      from_date: form.from_date.value,
      to_date: form.to_date.value,
      education_related_identity: owner.id,
    }

    if ((gradeError || universityError || toDateError || fromDateError || fieldOfStudyError) === false) {
      if (updateEducation && education) {
        updateEducation({formValues, educationId: education.id, userId: owner.id})
      } else if (createEducation) {
        createEducation({formValues, userId: owner.id})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, education} = this.props
    let grade = '', fieldOfStudy = '', university = '', fromDate = '', toDate = ''
    if (education) {
      grade = education.grade
      fieldOfStudy = education.field_of_study
      university = education.university
      fromDate = education.from_date
      toDate = education.to_date
    }
    const {errors} = this.state
    const {
      grade: gradeError, field_of_study: fieldOfStudyError, from_date: fromDateError, to_date: toDateError,
      university: universityError
    } = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal edit-modal">
              <div className="head">
                <div className="title">{translate['Add education']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Education grade']} <span className='required-star'>*</span></p>
                  <select className='edit-text-fields' defaultValue={grade} name='grade'
                          onChange={this._onChangeFields}>
                    <option value={constants.SERVER_GRADES.BACHELOR}>
                      {translate[constants.SERVER_GRADES.BACHELOR]}
                    </option>
                    <option value={constants.SERVER_GRADES.MASTER}>
                      {translate[constants.SERVER_GRADES.MASTER]}
                    </option>
                    <option value={constants.SERVER_GRADES.PHD}>
                      {translate[constants.SERVER_GRADES.PHD]}
                    </option>
                  </select>
                  {gradeError && <div className='text-field-error'>{gradeError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Field of study']} <span className='required-star'>*</span></p>
                  <input placeholder={translate['Field of study']} name='field_of_study' defaultValue={fieldOfStudy}
                         onChange={this._onChangeFields}
                         className='edit-text-fields'/>
                  {fieldOfStudyError && <div className='text-field-error'>{fieldOfStudyError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['University']} <span className='required-star'>*</span></p>
                  <input placeholder={translate['University']} name='university' defaultValue={university}
                         onChange={this._onChangeFields}
                         className='edit-text-fields'/>
                  {universityError && <div className='text-field-error'>{universityError}</div>}
                </div>

                <div className='detail-row-container'>
                  <div className='detail-row'>
                    <p className='title'>{translate['Start date']}</p>
                    <input placeholder={translate['Date example']} name='from_date' defaultValue={fromDate}
                           onChange={this._onChangeFields}
                           className='edit-text-fields'/>
                    {fromDateError && <div className='text-field-error'>{fromDateError}</div>}
                  </div>

                  <div className='detail-row'>
                    <p className='title'>{translate['To date']}</p>
                    <input placeholder={translate['Date example']} name='to_date' defaultValue={toDate}
                           onChange={this._onChangeFields}
                           className='edit-text-fields'/>
                    {toDateError && <div className='text-field-error'>{toDateError}</div>}
                  </div>
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

export default EducationForm