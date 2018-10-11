// @flow
import * as React from "react"
import connect from "react-redux/es/connect/connect"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"

import type {userProfileType} from "src/consts/flowTypes/user/basicInformation"
import updateProfileByProfileIdAction from "../../../redux/actions/user/updateProfileByProfileIdAction"
import LinkInfoEditForm from './LinkInfoEditForm'
import {InformationIcon} from "src/images/icons"
import LinkInfoView from './LinkInfoView'
import {VerifyWrapper} from "src/views/common/cards/Frames"
import {ItemWrapper} from "src/views/common/cards/Frames"

//UserInfo flowTypes
type UserInfoProps = {|
  userId: number,
  translate: {},
  actions: {|
    updateProfileByUserId: Function,
  |},
  isLoading: boolean,
  profile: userProfileType,
|}
type UserInfoState = {
  error: boolean,
  edit: boolean,
}

class LinkInfo extends React.Component<UserInfoProps, UserInfoState> {
  constructor(props: UserInfoProps) {
    super(props)
    this.state = {error: false, edit: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  render() {
    const {translate, actions, isLoading, profile, userId} = this.props
    const {edit, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <ItemWrapper icon={<InformationIcon/>}>
            {(edit) ? (
                <LinkInfoEditForm
                    profile={profile}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                    userId={userId}
                />
            ) : (
                <LinkInfoView profile={profile} translate={translate} showEdit={this._showEdit}/>
            )
            }
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

const mapUserInfoDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateProfileByUserId: updateProfileByProfileIdAction.updateProfile,
  }, dispatch)
})

LinkInfo = connect(null, mapUserInfoDispatchToProps)(LinkInfo)

export {LinkInfo}