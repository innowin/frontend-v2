import * as React from "react";
import type {userEducationType, userType} from "../../../consts/flowTypes/user/basicInformation";
import PropTypes from "prop-types";
import {VerifyWrapper} from "../../common/cards/Frames";
import {EducationInfoView} from "./EducationView";
import educationIcon from "../../../images/user/education_svg";
import {EducationInfoForm} from "./Forms";
import {ItemWrapper} from "../../common/cards/Frames";

//EducationInfo flowTypes
type EducationInfoProps = {
  education: userEducationType,
  translate: {},
  user: userType,
}
type EducationInfoState = {
  education: userEducationType,
  error: boolean,
  edit: boolean,
  isLoading: boolean
}

export class EducationInfo extends React.Component<EducationInfoProps, EducationInfoState> {
  constructor(props: EducationInfoProps) {
    super(props)
    this.state = {education: {}, error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    education: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  _updateStateForView = (res: userEducationType, error: boolean, isLoading: boolean) => {
    this.setState({...this.state, education: res, error: error, isLoading: isLoading})
  }

  componentDidMount() {
    this.setState({...this.state, education: this.props.education})
  }

  render() {
    const {translate} = this.props
    const {education, edit, isLoading, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          {
            edit ? (
                <ItemWrapper icon={educationIcon}>
                  <EducationInfoForm
                      education={education}
                      hideEdit={this._hideEdit}
                      updateStateForView={this._updateStateForView}
                      translate={translate}
                  />
                </ItemWrapper>
            ) : (
                <EducationInfoView education={education} showEdit={this._showEdit} translate={translate}/>
            )
          }
        </VerifyWrapper>
    )
  }
}