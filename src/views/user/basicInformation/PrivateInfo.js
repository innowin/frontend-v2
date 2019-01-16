// @flow
import * as React from "react"
import connect from "react-redux/es/connect/connect"
import PropTypes from "prop-types"

import {ItemWrapper, VerifyWrapper} from "../../common/cards/Frames"
import PrivateInfoView from './PrivateInfoView'
import {InformationIcon} from "src/images/icons"
import {PrivateInfoEditForm} from "./PrivateInfoEditForm"
import {bindActionCreators} from "redux";
import updateProfileByProfileIdAction from "../../../redux/actions/user/updateProfileByProfileIdAction";
import updateUserByUserIdAction from "../../../redux/actions/user/updateUserByUserIdAction";
import type {userProfileType, userType} from "../../../consts/flowTypes/user/basicInformation";

//PrivateInfo flowTypes
type PrivateInfoProps = {
  userId: number,
  translate: {},
  profile: userProfileType,
  isLoading: boolean,
  actions: {},
  user: userType,
}
type PrivateInfoState = {
  error: boolean,
  edit: boolean,
}

class PrivateInfo extends React.Component<PrivateInfoProps, PrivateInfoState> {
  constructor(props: PrivateInfoProps) {
    super(props)
    this.state = {error: false, edit: false, isLoading: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  render() {
    const {translate, profile, isLoading, actions, userId, user} = this.props
    const {edit, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <ItemWrapper icon={<InformationIcon/>}>
            {(edit) ? (
                <PrivateInfoEditForm
                    profile={profile}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                    userId={userId}
                    user={user}
                />
            ) : (
                <PrivateInfoView user={user} profile={profile} showEdit={this._showEdit} translate={translate}/>
            )
            }
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

const mapPrivateInfoDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateProfileByProfileId: updateProfileByProfileIdAction.updateProfile,
    updateUserByUserId: updateUserByUserIdAction.updateUser,
  }, dispatch)
})

PrivateInfo = connect(null, mapPrivateInfoDispatchToProps)(PrivateInfo)

export {PrivateInfo}