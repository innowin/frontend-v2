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
import {getMessages} from "../../../../redux/selectors/translateSelector"
// import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
// import {VerifyWrapper} from "../../common/cards/Frames"

type props = {
  actions: Object,
  clientId: number,
  clientIdentityId: number,
  deleteFollow: Function,
  files: [],
  followers: [{
    follow_accepted: boolean,
    identity_organization: number,
    identity_user: number,
  }],
  getFollowingSelector: [{
    identity_organization: number,
    identity_user: number,
  }],
  identityType: string,
  organs: [],
  paramId: number,
  profiles: [],
  translate: { [string]: string },
  updateFollow: Function,
  userId: number,
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
      followingOrgans: [],
      followingUsers: [],
      initialMembers: [],
      moreMembers: false,
      requested: false,
      viewType: "member-square-user"
    }
    const self: any = this
    self.changeViewType = self.changeViewType.bind(self)
    self.getMembers = self.getMembers.bind(self)
    // self.setAllMembers = self.setAllMembers.bind(self)
  }

  changeViewType() {
    // if (this.state.viewType === "member-square-user") {
    //   this.setState({...this.state, viewType: "member-row"})
    // } else this.setState({...this.state, viewType: "member-square-user"})
  }

  follow(identity_type, id) {
    if (identity_type === constants.USER_TYPES.USER) {
      const {clientIdentityId, actions} = this.props
      const identityId = id
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({
        formValues,
        followOwnerId: id,
        followOwnerIdentity: clientIdentityId
      })
      this.state.followingUsers.push(id)
    }
    if (identity_type === constants.USER_TYPES.ORG) {
      const {clientIdentityId, actions} = this.props
      const identityId = id
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({
        formValues,
        followOwnerId: id,
        followOwnerIdentity: clientIdentityId
      })
      this.state.followingOrgans.push(id)
    }
  }

  _onAcceptFollow(follower: Object) {
    const {updateFollow, userId} = this.props
    const followId = follower.follow_id
    const formValues = {follow_accepted: true}
    updateFollow({followId, formValues, followOwnerId: userId})
  }

  _onDeleteFollow(follower: Object) {
    const {deleteFollow, userId} = this.props
    const followId = follower.follow_id
    deleteFollow({followId, followOwnerId: userId})
  }

  getMembers(identity_type, id, follow_accepted, index) { // TODO:ABEL ADD FOLLOW_ACCEPT STUFF
    let {profiles, organs, files, clientId, followers, paramId} = this.props
    let {followingUsers, followingOrgans} = this.state
    if (identity_type === constants.USER_TYPES.USER) {
      if (profiles[id]) {
        // if (!profiles[memberId].profile.isLoading) {
        return <div key={index} className={this.state.viewType}>
          <Link to={`/user/${id}`}>
            <div className={"member-picture-container"}>
              {profiles[id].profile_media !== null ?
                  <img alt=""
                       src={files[profiles[id].profile_media] && files[profiles[id].profile_media].file}
                       width={"55px"} height={"55px"}
                       className={"member-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"member-picture"}/>}
            </div>

            <div className={"member-info-container"}>
              <div className={"member-name"}>{
                profiles[id].first_name ||
                profiles[id].last_name ?
                    profiles[id].first_name
                    + " " +
                    profiles[id].last_name
                    : profiles[id].username
              }</div>
              <div className={"member-description"}>{
                profiles[id].description
              }</div>
            </div>
          </Link>
          {followingUsers.indexOf(id) >= 0 ? <div className="member-followed-button">دنبال شده</div>
              : clientId !== id ?
                  <div className="member-follow" onClick={() => this.follow(identity_type, id)}><span
                      className="member-follow-green-button">دنبال کردن</span></div> : <div className="member-followed"/>}
          {follow_accepted || paramId !== clientId ? null :
              <div>
                <div className="member-follow" onClick={() => this._onAcceptFollow(followers[index])}><span
                    className="member-accept-button"> </span></div>
                <div className="member-follow" onClick={() => this._onDeleteFollow(followers[index])}><span
                    className="member-reject-button"> </span></div>
              </div>}
        </div>
      }
      else return <div className={this.state.viewType}>
        <div className={"member-loading"}>
          <ClipLoader color={"#cbcbcb"} size={60}/>
        </div>
      </div>
    }
    if (identity_type === constants.USER_TYPES.ORG) {
      // if (!organs[memberId].organization.isLoading) {
      if (organs[id]) {
        return <div key={index}
                    className={this.state.viewType}>
          <Link to={`/organization/${id}`}>
            <div className={"member-picture-container"}>
              {organs[id].organization_logo !== null ?
                  <img alt=""
                       src={files[organs[id].organization_logo] ?
                           files[organs[id].organization_logo].file :
                           null}
                       width={"55px"} height={"55px"}
                       className={"member-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"member-picture"}/>}
            </div>

            <div className={"member-info-container"}>
              <div className={"member-name"}>{
                organs[id].official_name !== "" ?
                    organs[id].official_name :
                    organs[id].username
              }</div>
              <div className={"member-description"}>{
                organs[id].biography
              }</div>
            </div>
          </Link>
          {followingOrgans.indexOf(id) >= 0 ? <div className="member-followed-button">دنبال شده</div>
              : clientId !== id ?
                  <div className="member-follow" onClick={() => this.follow(identity_type, id)}><span
                      className="member-follow-green-button">دنبال کردن</span></div> : <div className="member-followed"/>}
          {follow_accepted || paramId !== clientId ? null :
              <div>
                <div className="member-follow" onClick={() => this._onAcceptFollow(followers[index])}><span
                    className="member-accept-button"> </span></div>
                <div className="member-follow" onClick={() => this._onDeleteFollow(followers[index])}><span
                    className="member-reject-button"> </span></div>
              </div>}
        </div>
      }
      else return <div className={this.state.viewType}>
        <div className={"member-loading"}>
          <ClipLoader color={"#cbcbcb"} size={60}/>
        </div>
      </div>
    }
  }

  // setAllMembers() {
  //   let {exchangeUsers, exchangeId, actions} = this.props
  //   let {getUser, getOrganization, getUserIdentity, getOrgIdentity} = actions
  //   let temp = []
  //   if (exchangeUsers) {
  //     if (exchangeUsers[exchangeId]) {
  //       for (let i = 0; i < exchangeUsers[exchangeId].length; i++) {
  //         if (exchangeUsers[exchangeId][i]) {
  //           if (exchangeUsers[exchangeId][i].type === 'USER') {
  //             getUser(exchangeUsers[exchangeId][i].id)
  //             getUserIdentity(exchangeUsers[exchangeId][i].id)
  //           } else {
  //             getOrganization(exchangeUsers[exchangeId][i].id)
  //             getOrgIdentity(exchangeUsers[exchangeId][i].id)
  //           }
  //           temp.push(exchangeUsers[exchangeId][i])
  //         }
  //       }
  //       // this.setState({...this.state, initialMembers: temp.slice(), moreMembers: true})
  //     }
  //   }
  // }

  componentDidMount() {
    window.scrollTo({
      top: 0
    })
    let {followers, actions, followings} = this.props
    let {getUser} = actions

    if (followers) {
      for (let i = 0; i < followers.length; i++) {
        if (followers[i].id !== null && followers[i].identity_type === constants.USER_TYPES.ORG) {
          getUser(followers[i].id)
          // getOrgIdentity(followers[i].id)
        }
        else if (followers[i].id !== null && followers[i].identity_type === constants.USER_TYPES.USER) {
          getUser(followers[i].id)
          // getUserIdentity(followers[i].id)
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
    for (let i = 0; i < followings.length; i++) {
      if (followings[i].id !== null && followings[i].identity_type === constants.USER_TYPES.USER) {
        tempUsers.push(followings[i].id)
      }
      else if (followings[i].id !== null && followings[i].identity_type === constants.USER_TYPES.ORG) {
        tempOrgans.push(followings[i].id)
      }
    }
    this.setState({...this.state, followingUsers: tempUsers.slice(), followingOrgans: tempOrgans.slice()})
  }

  componentDidUpdate(prevProps, prevState, snapshot): void {
    if (this.props.followings && this.props.followings.length !== prevProps.followings.length) {
      let {followings, actions} = this.props
      let tempUsers = []
      let tempOrgans = []
      for (let i = 0; i < followings.length; i++) {
        if (followings[i].id !== null && followings[i].identity_type === constants.USER_TYPES.USER) {
          actions.getUser(followings[i].id)
          tempUsers.push(followings[i].id)
        }
        else if (followings[i].id !== null && followings[i].identity_type === constants.USER_TYPES.ORG) {
          actions.getUser(followings[i].id)
          tempOrgans.push(followings[i].id)
        }
      }
      this.setState({...this.state, followingUsers: tempUsers.slice(), followingOrgans: tempOrgans.slice()})
    }
  }

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
          <div className={"members-header-left"} style={{cursor: "default"}} onClick={this.changeViewType}>
            {viewType === "member-square-user" ?
                <Stream width="16px" height="16px" svgClass={"svg-info-view"}/> :
                <QuestionMark width="20px" height="20px" svgClass={"svg-info-view"}/>}
          </div>
          <div className={"members-body"}>
            {followers.length > 0 ? followers.map((p, index) => {
              return this.getMembers(p.identity_type, p.id, p.follow_accepted, index)
            }) : requested ? <div/>
                :
                <div style={{textAlign: "center", width: "92%"}}>
                  {/*<ClipLoader color={"#cbcbcb"} size={40} loading={true}/>*/}
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
    organs: state.identities.list,
    profiles: state.identities.list,
    files: state.common.file.list,
    clientId: state.auth.client.organization === null ? state.auth.client.user.id : state.auth.client.organization.id,
    translate: getMessages(state),
    getFollowingSelector: getFolloweesSelector(state, {
      identityId: state.auth.client.identity.content,
      ownerId: state.auth.client.user.id,
      identityType: state.auth.client.user_type
    })
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    // getExchangeMembers: exchangeMembershipActions.getExchangeMembershipByExchangeId,
    getUser: getUserAction.getUserByUserId,
    getOrganization: organizationActions.getOrganizationByOrganId,
    createFollow: SocialActions.createFollow,
    getFollowingAction: SocialActions.getFollowees,
    getUserIdentity: identityActions.getUserIdentity,
    getOrgIdentity: identityActions.getOrgIdentity
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(NewFollowers)