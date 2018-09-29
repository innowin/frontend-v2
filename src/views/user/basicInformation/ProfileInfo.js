// @flow
import * as React from "react"
import connect from "react-redux/es/connect/connect"
import PropTypes from "prop-types"

import {ItemWrapper, VerifyWrapper} from "../../common/cards/Frames"
import {ProfileInfoView} from './ProfileInfoView'
import userInfoIcon from "../../../images/user/userinfo_svg"
import {ProfileInfoEditForm} from "./ProfileInfoEditForm"
import {bindActionCreators} from "redux";
import updateProfileByProfileId from "../../../redux/actions/user/updateProfileByProfileIdAction";

//ProfileInfo flowTypes
type ProfileInfoProps = {
  userId: number,
  translate: {},
  profile: {},
  isLoading: boolean,
  actions: {},
}
type ProfileInfoState = {
  error: boolean,
  edit: boolean,
}

class ProfileInfo extends React.Component<ProfileInfoProps, ProfileInfoState> {
  constructor(props: ProfileInfoProps) {
    super(props)
    this.state = {error: false, edit: false, isLoading: false}

  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  render() {
    const {translate, profile, isLoading, actions, userId} = this.props
    const {edit, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          {(edit) ? (
              <ItemWrapper icon={userInfoIcon}>
                <ProfileInfoEditForm
                    profile={profile}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                    userId={userId}
                />
              </ItemWrapper>
          ) : (
              <ProfileInfoView profile={profile} showEdit={this._showEdit} translate={translate}/>
          )
          }
        </VerifyWrapper>
    )
  }
}

const mapProfileInfoDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateProfileByProfileId: updateProfileByProfileId.updateProfile,
  }, dispatch)
})

ProfileInfo = connect(null, mapProfileInfoDispatchToProps)(ProfileInfo)

export {ProfileInfo}