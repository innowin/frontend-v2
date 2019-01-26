// @flow
import * as React from "react"
import constants from "src/consts/constants"
import getUserAction from "src/redux/actions/user/getUserActions"
import identityActions from "src/redux/actions/identityActions"
import organizationActions from "src/redux/actions/organization/organizationActions"
import SocialActions from "src/redux/actions/commonActions/socialActions"
import {bindActionCreators} from "redux"
import {ClipLoader} from "react-spinners"
import {Component} from "react"
import {connect} from "react-redux"
import {DefaultUserIcon, Contacts, QuestionMark, Stream} from "src/images/icons"
import {getFolloweesSelector} from "src/redux/selectors/common/social/getFollowees"
import {Link} from "react-router-dom"
import {getMessages} from "../../../redux/selectors/translateSelector"
// import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
// import {VerifyWrapper} from "../../common/cards/Frames"

type props = {
  // actions: any,
  // followings: [],
  followers: [],
}
type states = {
  followingOrgans: [],
  followingUsers: [],
  initialMembers: [],
  moreMembers: boolean,
  requested: boolean,
  viewType: string,
}

class NewFollowers extends Component<props, states> {
  constructor(props) {
    super(props)
    this.state = {
      initialMembers: [],
      viewType: "member-square-user",
      moreMembers: false,
      followingUsers: [],
      followingOrgans: [],
      requested: false
    }
    const self: any = this
    self.changeViewType = self.changeViewType.bind(self)
    self.getMembers = self.getMembers.bind(self)
    self.setAllMembers = self.setAllMembers.bind(self)
  }

  changeViewType() {
    if (this.state.viewType === "member-square-user") {
      this.setState({...this.state, viewType: "member-row"})
    } else this.setState({...this.state, viewType: "member-square-user"})
  }

  follow(identity_user, identity_organization) {
    if (identity_user !== null) {
      const {clientIdentityId, profiles, actions} = this.props
      const identityId = profiles[identity_user].identity.content
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({
        formValues,
        followOwnerId: identity_user,
        followOwnerType: constants.USER_TYPES.PERSON,
        followOwnerIdentity: clientIdentityId
      })
      this.state.followingUsers.push(identity_user)
    }
    if (identity_organization !== null) {
      const {clientIdentityId, organs, actions} = this.props
      const identityId = organs[identity_organization].identity.content
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({
        formValues,
        followOwnerId: identity_organization,
        followOwnerType: constants.USER_TYPES.ORG,
        followOwnerIdentity: clientIdentityId
      })
      this.state.followingOrgans.push(identity_organization)
    }
  }

  _onAcceptFollow(follower) {
    const {updateFollow, userId, identityType} = this.props
    const followId = follower.follow_id
    const formValues = {follow_accepted: true}
    updateFollow({followId, formValues, followOwnerId: userId, followOwnerType: identityType})
  }

  _onDeleteFollow(follower) {
    const {deleteFollow, userId, identityType} = this.props
    const followId = follower.follow_id
    deleteFollow({followId, followOwnerId: userId, followOwnerType: identityType})
  }

  getMembers(identity_user, identity_organization, follow_accepted, index) { // TODO:ABEL ADD FOLLOW_ACCEPT STUFF
    let {profiles, organs, files, clientId, followers, paramId} = this.props
    let {followingUsers, followingOrgans} = this.state
    if (identity_user !== null) {
      if (profiles[identity_user] && profiles[identity_user].profile.content && profiles[identity_user].profile.content.profile_user) {
        // if (!profiles[memberId].profile.isLoading) {
        return <div key={index} className={this.state.viewType}>
          <Link to={`/user/${identity_user}`}>
            <div className={"member-picture-container"}>
              {profiles[identity_user].profile.content.profile_media !== null ?
                  <img alt=""
                       src={profiles[identity_user].profile.content.profile_media.file}
                       width={"55px"} height={"55px"}
                       className={"member-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"member-picture"}/>}
            </div>

            <div className={"member-info-container"}>
              <div className={"member-name"}>{
                profiles[identity_user].profile.content.profile_user.first_name ||
                profiles[identity_user].profile.content.profile_user.last_name ?
                    profiles[identity_user].profile.content.profile_user.first_name
                    + " " +
                    profiles[identity_user].profile.content.profile_user.last_name
                    : profiles[identity_user].profile.content.profile_user.username
              }</div>
              <div className={"member-description"}>{
                profiles[identity_user].profile.content.description
              }</div>
            </div>
          </Link>
          {followingUsers.indexOf(identity_user) >= 0 ? <div className="member-followed-button">دنبال شده</div>
              : clientId !== identity_user ?
                  <div className="member-follow" onClick={() => this.follow(identity_user, identity_organization)}><span
                      className="member-follow-button">دنبال کردن</span></div> : <div className="member-followed"/>}
          {follow_accepted || paramId !== clientId ? null :
              <div>
                <div className="member-follow" onClick={() => this._onAcceptFollow(followers[index])}><span
                    className="member-accept-button"> </span></div>
                <div className="member-follow" onClick={() => this._onDeleteFollow(followers[index])}><span
                    className="member-reject-button"> </span></div>
              </div>}
        </div>
      } else return <div className={this.state.viewType}>
        <div className={"member-loading"}>
          <ClipLoader color={"#cbcbcb"} size={60}/>
        </div>
      </div>
    }
    if (identity_organization !== null) {
      // if (!organs[memberId].organization.isLoading) {
      if (organs[identity_organization] && organs[identity_organization].organization && organs[identity_organization].organization.content) {
        return <div key={index}
                    className={this.state.viewType}>
          {/*{followingOrgans.indexOf(identity_organization) >= 0 ? <div className={"member-followed"}>دنبال شده</div>*/}
              {/*: clientId !== identity_organization ?*/}
                  {/*<div className={"member-follow"} onClick={() => this.follow(identity_user, identity_organization)}><span*/}
                      {/*className={"member-follow-plus"}> + </span></div> : <div className={"member-followed"}/>}*/}
          <Link to={`/organization/${identity_organization}`}>
            <div className={"member-picture-container"}>
              {organs[identity_organization].organization.content.organization_logo !== null ?
                  <img alt=""
                       src={files[organs[identity_organization].organization.content.organization_logo] ?
                           files[organs[identity_organization].organization.content.organization_logo].file :
                           null}
                       width={"55px"} height={"55px"}
                       className={"member-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"member-picture"}/>}
            </div>

            <div className={"member-info-container"}>
              <div className={"member-name"}>{
                organs[identity_organization].organization.content.official_name !== "" ?
                    organs[identity_organization].organization.content.official_name :
                    organs[identity_organization].organization.content.username
              }</div>
              <div className={"member-description"}>{
                organs[identity_organization].organization.content.biography
              }</div>
            </div>
          </Link>
          {followingOrgans.indexOf(identity_organization) >= 0 ? <div className="member-followed-button">دنبال شده</div>
              : clientId !== identity_organization ?
                  <div className="member-follow" onClick={() => this.follow(identity_user, identity_organization)}><span
                      className="member-follow-button">دنبال کردن</span></div> : <div className="member-followed"/>}
          {follow_accepted || paramId !== clientId ? null :
              <div>
                <div className="member-follow" onClick={() => this._onAcceptFollow(followers[index])}><span
                    className="member-accept-button"> </span></div>
                <div className="member-follow" onClick={() => this._onDeleteFollow(followers[index])}><span
                    className="member-reject-button"> </span></div>
              </div>}
        </div>
      } else return <div className={this.state.viewType}>
        <div className={"member-loading"}>
          <ClipLoader color={"#cbcbcb"} size={60}/>
        </div>
      </div>
    }
  }

  setAllMembers() {
    let {exchangeUsers, exchangeId, actions} = this.props
    let {getUser, getOrganization, getUserIdentity, getOrgIdentity} = actions
    let temp = []
    if (exchangeUsers) {
      if (exchangeUsers[exchangeId]) {
        for (let i = 0; i < exchangeUsers[exchangeId].length; i++) {
          if (exchangeUsers[exchangeId][i]) {
            if (exchangeUsers[exchangeId][i].type === "USER") {
              getUser(exchangeUsers[exchangeId][i].id)
              getUserIdentity(exchangeUsers[exchangeId][i].id)
            } else {
              getOrganization(exchangeUsers[exchangeId][i].id)
              getOrgIdentity(exchangeUsers[exchangeId][i].id)
            }
            temp.push(exchangeUsers[exchangeId][i])
          }
        }
        // this.setState({...this.state, initialMembers: temp.slice(), moreMembers: true})
      }
    }
  }

  componentDidMount() {
    window.scrollTo({
      top: 0
    })
    let {getFollowingSelector, followers, actions} = this.props
    let {getUser, getUserIdentity, getOrganization, getOrgIdentity} = actions

    if (followers) {
      for (let i = 0; i < followers.length; i++) {
        if (followers[i].identity_organization !== null) {
          getOrganization(followers[i].identity_organization)
          getOrgIdentity(followers[i].identity_organization)
        } else if (followers[i].identity_user !== null) {
          getUser(followers[i].identity_user)
          getUserIdentity(followers[i].identity_user)
        }
      }
    }

    // getExchangeMembers({exchangeId}) //n

    // let temp = []
    // if (exchangeUsers) {
    //   if (exchangeUsers[exchangeId]) {
    //     for (let i = 0; i < 6; i++) {
    //       if (exchangeUsers[exchangeId][i]) {
    //         if (exchangeUsers[exchangeId][i].type === "USER") {
    //           getUser(exchangeUsers[exchangeId][i].id)
    //           getUserIdentity(exchangeUsers[exchangeId][i].id)
    //         } else {
    //           getOrganization(exchangeUsers[exchangeId][i].id)
    //           getOrgIdentity(exchangeUsers[exchangeId][i].id)
    //         }
    //         temp.push(exchangeUsers[exchangeId][i])
    //       }
    //     }
    //     this.setState({...this.state, initialMembers: temp, requested: true})
    //   }
    // }

    // this.setState({...this.state, initialMembers: followers.slice(), requested: true})

    let tempUsers = []
    let tempOrgans = []
    for (let i = 0; i < getFollowingSelector.length; i++) {
      if (getFollowingSelector[i].identity_user !== null) {
        tempUsers.push(getFollowingSelector[i].identity_user)
      } else if (getFollowingSelector[i].identity_organization !== null) {
        tempOrgans.push(getFollowingSelector[i].identity_organization)
      }
    }
    this.setState({...this.state, followingUsers: tempUsers.slice(), followingOrgans: tempOrgans.slice()})
  }

  // componentDidUpdate(prev, nex, ss) {
  //   if (!this.state.requested) {
  //     let {exchangeUsers, exchangeId, actions} = this.props
  //     let {getUser, getOrganization, getUserIdentity, getOrgIdentity} = actions
  //     let temp = []
  //     if (exchangeUsers) {
  //       if (exchangeUsers[exchangeId]) {
  //         for (let i = 0; i < 6; i++) {
  //           if (exchangeUsers[exchangeId][i]) {
  //             if (exchangeUsers[exchangeId][i].type === "USER") {
  //               getUser(exchangeUsers[exchangeId][i].id)
  //               getUserIdentity(exchangeUsers[exchangeId][i].id)
  //             } else {
  //               getOrganization(exchangeUsers[exchangeId][i].id)
  //               getOrgIdentity(exchangeUsers[exchangeId][i].id)
  //             }
  //             temp.push(exchangeUsers[exchangeId][i])
  //           }
  //         }
  //         this.setState({...this.state, initialMembers: temp, requested: true})
  //       }
  //     }
  //   }
  // }

  render() {
    let {
      // moreMembers,
      viewType,
      requested
    } = this.state
    let {followers, translate} = this.props

    return (
        <div className={"members-frame"}>
          <div className={"members-header-right"}>
            <Contacts width="22px" height="22px" containerClass={"svg-container-info-view"} svgClass={"svg-info-view"}/>
            <span>{translate["Followers"]}</span>
          </div>
          <div className={"members-header-left"} onClick={this.changeViewType}>
            {viewType === "member-square-user" ?
                <Stream width="16px" height="16px" svgClass={"svg-info-view"}/> :
                <QuestionMark width="20px" height="20px" svgClass={"svg-info-view"}/>}
          </div>
          <div className={"members-body"}>
            {followers.length > 0 ? followers.map((p, index) => {
              return this.getMembers(p.identity_user, p.identity_organization, p.follow_accepted, index)
            }) : requested ? <div/>
                :
                <div style={{textAlign: "center", width: "92%"}}>
                  <ClipLoader color={"#cbcbcb"} size={40} loading={true}/>
                </div>
            }
            <div className={"zero-height-member"}/>
            <div className={"zero-height-member"}/>
            {/*{(!moreMembers) && initialMembers.length >= 6 ?*/}
            {/*<div className={"members-more"} onClick={this.setAllMembers}>*/}
            {/*بارگذاری بیشتر*/}
            {/*</div> : null}*/}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clientIdentityId: state.auth.client.identity.content,
    exchangeUsers: state.common.exchangeMembership.members,
    organs: state.organs.list,
    profiles: state.users.list,
    files: state.common.file.list,
    clientId: state.auth.client.user.id,
    translate: getMessages(state),
    getFollowingSelector: getFolloweesSelector(state, {
      identityId: state.auth.client.identity.content,
      ownerId: state.auth.client.user.id,
      identityType: state.auth.client.user_type,
    })
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    // getExchangeMembers: exchangeMembershipActions.getExchangeMembershipByExchangeId,
    getUser: getUserAction.getProfileByUserId,
    getOrganization: organizationActions.getOrganizationByOrganId,
    createFollow: SocialActions.createFollow,
    getFollowingAction: SocialActions.getFollowees,
    getUserIdentity: identityActions.getUserIdentity,
    getOrgIdentity: identityActions.getOrgIdentity
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(NewFollowers)