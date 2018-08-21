import * as React from "react"
import connect from "react-redux/es/connect/connect"
import PropTypes from "prop-types"

import type {userType} from "src/consts/flowTypes/user/basicInformation"
import updateUserByUserIdAction from "../../../redux/actions/user/updateUserByUserIdAction"
import {bindActionCreators} from "redux"
import {Component} from "react"
import {UserInfoEditForm} from './UserInfoEditForm'
import {userInfoIcon} from "src/images/icons"
import {UserInfoItemWrapper} from "./Views"
import {UserInfoView} from './UserInfoView'
import {VerifyWrapper} from "src/views/common/cards/Frames"

//UserInfo flowTypes
type UserInfoProps = {|
  userId: number,
  translate: {},
  actions: {|
    updateUserByUserId: Function,
  |},
  isLoading: boolean,
  user: userType,
|}
type UserInfoState = {
  error: boolean,
  edit: boolean,
}

class UserInfo extends Component<UserInfoProps, UserInfoState> {
  constructor(props: UserInfoProps) {
    super(props)
    this.state = {error: false, edit: false}
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  render() {
    const {translate, actions, isLoading, user} = this.props
    const {edit, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          {(edit) ? (
              <UserInfoItemWrapper icon={userInfoIcon}>
                <UserInfoEditForm
                    user={user}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                />
              </UserInfoItemWrapper>
          ) : (
              <UserInfoView user={user} translate={translate} showEdit={this._showEdit}/>
          )
          }
        </VerifyWrapper>
    )
  }
}

const mapUserInfoStateToProps = state => {
  const userId = state.auth.client.user.id
  return ({
    user: state.auth.client.user,
    isLoading: state.users[userId].user.isLoading,
  })
}
const mapUserInfoDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
  }, dispatch)
})

UserInfo = connect(mapUserInfoStateToProps, mapUserInfoDispatchToProps)(UserInfo)

export {UserInfo}