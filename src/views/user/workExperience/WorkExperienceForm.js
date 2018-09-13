// @flow
import type {workExperienceType} from "../../../consts/flowTypes/user/others";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {TextInput} from "../../common/inputs/TextInput";
import {DateInput} from "../../common/inputs/DateInput";

// flow type of WorkExperienceForm
type PropsWorkExperienceForm = {
  onSubmit: Function,
  workExperience?: workExperienceType,
  translate: { [string]: string },
  children?: React.Node
}
type StateWorkExperienceForm = {
  edit: boolean
}

export class WorkExperienceForm extends Component<PropsWorkExperienceForm, StateWorkExperienceForm> {
  constructor(props: PropsWorkExperienceForm) {
    super(props)
    this.state = {edit: false}
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    workExperience: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  nameInput: React.ElementRef<typeof TextInput>
  positionInput: React.ElementRef<typeof TextInput>
  toDateInput: React.ElementRef<typeof DateInput>
  fromDateInput: React.ElementRef<typeof DateInput>
  fromDateInput: React.ElementRef<typeof DateInput>

  _getValues = () => {
    return {
      name: this.nameInput.getValue(),
      position: this.positionInput.getValue(),
      to_date: this.toDateInput.getValue(),
      from_date: this.fromDateInput.getValue(),
      //TODO mohsen: handle work_experience_organization
      // work_experience_organization: 22
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates = [
      this.nameInput.validate(),
      this.positionInput.validate(),
      this.fromDateInput.validate(),
      this.toDateInput.validate()
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  render() {
    const {onSubmit, translate} = this.props
    const workExperience = this.props.workExperience || {}
    return (
        <form onSubmit={onSubmit}>
          <div className="row">
            <TextInput
                label={translate['Name']}
                value={workExperience.name}
                name="name"
                ref={nameInput => {
                  this.nameInput = nameInput
                }}
            />
            <TextInput
                label={translate['Position']}
                value={workExperience.position}
                name="position"
                ref={positionInput => {
                  this.positionInput = positionInput
                }}
            />
            <DateInput
                name="from_date"
                label={translate['From date']}
                value={workExperience.fromDate}
                ref={fromDateInput => {
                  this.fromDateInput = fromDateInput
                }}
                showDay={true}
            />
            <DateInput
                label={translate['To date']}
                value={workExperience.toDate}
                name="to_date"
                ref={toDateInput => {
                  this.toDateInput = toDateInput
                }}
                showDay={true}
            />
          </div>
          {this.props.children}
        </form>
    )
  }
}

export default WorkExperienceForm