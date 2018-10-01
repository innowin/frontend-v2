// @flow
import * as React from "react"
import PropTypes from "prop-types"

import EducationIcon from "../../../images/user/education_svg"
import EducationInfoEditForm from "./EducationInfoEditForm"
import {Field, FieldValue, ItemHeader, VerifyWrapper} from "../../common/cards/Frames"
import {ItemWrapper} from "../../common/cards/Frames"
import {userEducationType} from 'src/consts/flowTypes/user/basicInformation'

//EducationInfo flowTypes
type PropsEducation = {
  updateEducationByUserId: Function,
  deleteEducationByUserId: Function,
  education: userEducationType,
  userId: number,
  translate: { [string]: string },
}
type StateEducation = {
  edit: boolean,
}

export class EducationInfo extends React.Component<PropsEducation, StateEducation> {
  static propTypes = {
    education: PropTypes.object.isRequired,
    updateEducationByUserId: PropTypes.func.isRequired,
    deleteEducationByUserId: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  constructor(props: PropsEducation) {
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
    const {userId, deleteEducationByUserId, education} = this.props
    const educationId = education.id
    this._hideEdit()
    deleteEducationByUserId({userId, educationId})
  }

  // FixMe: mohammad isLoading and error come from redux
  render() {
    const {translate, updateEducationByUserId, userId, education} = this.props
    const {edit} = this.state
    return (
        <VerifyWrapper isLoading={false} error={false}>
          <ItemWrapper icon={<EducationIcon/>}>
            {edit ? (
                <EducationInfoEditForm
                    userId={userId}
                    education={education}
                    hideEdit={this._hideEdit}
                    update={updateEducationByUserId}
                    deleteEducationByUserId={this._delete}
                    translate={translate}
                />
            ) : (
                education &&
                <div>
                  <ItemHeader title={`${translate['Grade']} ${education.grade}`} showEdit={this._showEdit}/>
                  <Field>
                    <FieldValue value={`${education.field_of_study} - ${education.university} - ${translate['Average']} ${education.average}`}/>
                  </Field>
                  <Field>
                    <FieldValue value={`${education.from_date} - ${education.to_date}`}/>
                  </Field>
                  <Field>
                    <p className='text-description'>{education.description}</p>
                  </Field>
                </div>
            )}
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}