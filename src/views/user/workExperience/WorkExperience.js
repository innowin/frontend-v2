// @flow
import * as React from "react"
import PropTypes from "prop-types"

import type {workExperienceType} from "../../../consts/flowTypes/user/others"
import WorkExperienceEditForm from "./WorkExperienceEditForm"
import workExperienceIcon from "../../../images/user/workExperience_svg"
import {Field, FieldValue, ItemHeader, ItemWrapper, VerifyWrapper} from "../../common/cards/Frames"

// flow type of WorkExperience
type PropsWorkExperience = {
  updateWorkExperienceByUserId: Function,
  deleteWorkExperienceByUserId: Function,
  workExperience: workExperienceType,
  userId: number,
  translate: { [string]: string },
}
type StateWorkExperience = {
  edit: boolean,
}

class WorkExperience extends React.Component<PropsWorkExperience, StateWorkExperience> {
  static propTypes = {
    workExperience: PropTypes.object.isRequired,
    updateWorkExperienceByUserId: PropTypes.func.isRequired,
    deleteWorkExperienceByUserId: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsWorkExperience) {
    super(props)
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _delete = () => {
    const {userId, deleteWorkExperienceByUserId, workExperience} = this.props
    const organizationId = workExperience.work_experience_organization
    const workExperienceId = workExperience.id
    deleteWorkExperienceByUserId({userId, workExperienceId, organizationId})
  }

  // TODO mohammad: handle isLoading && error by redux
  render() {
    const {edit} = this.state
    const {workExperience} = this.props
    const {translate, updateWorkExperienceByUserId, userId} = this.props
    return (
        <VerifyWrapper isLoading={false} error={false}>
          <ItemWrapper icon={workExperienceIcon}>
            {edit ?
                <WorkExperienceEditForm
                    workExperience={workExperience}
                    hideEdit={this._hideEdit}
                    deleteWorkExperience={this._delete}
                    update={updateWorkExperienceByUserId}
                    translate={translate}
                    userId={userId}
                />
                : workExperience &&
                <div>
                  <ItemHeader title={workExperience.position} showEdit={this._showEdit}/>
                  {workExperience.name &&
                  <Field>
                    <FieldValue value={workExperience.name}/>
                  </Field>
                  }
                  {(workExperience.from_date || workExperience.to_date) &&
                  <Field>
                    <FieldValue
                        value={workExperience.from_date ?
                            workExperience.from_date : ""
                            + " - " +
                            workExperience.to_date ?
                                workExperience.to_date : ""}/>
                  </Field>
                  }
                </div>
            }
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

export default WorkExperience