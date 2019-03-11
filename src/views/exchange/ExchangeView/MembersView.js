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
// import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
// import {VerifyWrapper} from "../../common/cards/Frames"

type props = {
  actions: any,
  clientId: number,
  clientIdentityId: ?number,
  exchangeId: number,
  exchangeUsers: Object,
  files: Object,
  organs: Object,
  profiles: Object,
}
type states = {
  followingOrgans: [],
  followingUsers: [],
  initialMembers: [],
  moreMembers: boolean,
  requested: boolean,
  viewType: string,
}

class MembersView extends Component<props, states> {
  constructor(props) {
    super(props)
    this.state = {
      initialMembers: [],
      viewType: "member-square",
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
    if (this.state.viewType === "member-square") {
      this.setState({...this.state, viewType: "member-row"})
    }
    else this.setState({...this.state, viewType: "member-square"})
  }

  follow(targetId, targetType) {
    if (targetType === "USER") {
      const {clientIdentityId, profiles, actions} = this.props
      const identityId = profiles[targetId].identity.content
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({formValues, followOwnerId: targetId, followOwnerType: constants.USER_TYPES.USER})
      this.state.followingUsers.push(targetId)
    }
    if (targetType === "ORGANIZATION") {
      const {clientIdentityId, organs, actions} = this.props
      const identityId = organs[targetId].identity.content
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({formValues, followOwnerId: targetId, followOwnerType: constants.USER_TYPES.USER})
      this.state.followingOrgans.push(targetId)
    }
  }

  getMembers(memberId, memberType, index) {
    let {profiles, organs, files, clientId, identities} = this.props
    let {followingUsers, followingOrgans} = this.state
    if (memberType === "USER") {
      if (identities[memberId]) {
        // if (profiles[memberId].profile.content.profile_user) {
        // if (!profiles[memberId].profile.isLoading) {
        return <div key={index} className={this.state.viewType}>
          {followingUsers.indexOf(memberId) >= 0 ? <div className={"member-followed"}>دنبال شده</div>
              : clientId !== memberId ?
                  <div className={"member-follow"} onClick={() => this.follow(memberId, memberType)}><span
                      className={"member-follow-plus"}> + </span></div> : <div className="member-followed"/>}
          <Link to={`/user/${memberId}`}>
            <div className={"member-picture-container"}>
              {identities[memberId].profile_media && identities[memberId].profile_media.file ? <img alt=""
                                                                                                    src={identities[memberId].profile_media.file}
                                                                                                    width={"55px"} height={"55px"}
                                                                                                    className={"member-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"member-picture"}/>}
            </div>

            <div className={"member-info-container"}>
              <div className={"member-name"}>{
                identities[memberId].first_name ||
                identities[memberId].last_name ?
                    identities[memberId].first_name + " " + identities[memberId].last_name :
                    identities[memberId].username
              }</div>
              <div className={"member-description"}>{
                identities[memberId].description
              }</div>
            </div>
          </Link>
        </div>
      }
      else return <div className={this.state.viewType}>
        <div className={"member-loading"}>
          <ClipLoader color={"#cbcbcb"} size={60}/>
        </div>
      </div>
    }
    if (memberType === "ORGANIZATION") {
      // if (!organs[memberId].organization.isLoading) {
      // if (organs[memberId].organization.content) {
      if (identities[memberId]) {
        return <div key={index}
                    className={this.state.viewType}>
          {followingOrgans.indexOf(memberId) >= 0 ? <div className={"member-followed"}>دنبال شده</div>
              : clientId !== memberId ?
                  <div className={"member-follow"} onClick={() => this.follow(memberId, memberType)}><span
                      className={"member-follow-plus"}> + </span></div> : <div className={"member-followed"}/>}
          <Link to={`/organization/${memberId}`}>
            <div className={"member-picture-container"}>
              {identities[memberId].organization_logo !== null ? <img alt=""
                                                                      src={files[identities[memberId].organization_logo] ?
                                                                          files[identities[memberId].organization_logo].file :
                                                                          null}
                                                                      width={"55px"} height={"55px"}
                                                                      className={"member-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"member-picture"}/>}
            </div>

            <div className={"member-info-container"}>
              <div className={"member-name"}>{
                identities[memberId].official_name !== "" ?
                    identities[memberId].official_name :
                    identities[memberId].username
              }</div>
              <div className={"member-description"}>{
                identities[memberId].biography
              }</div>
            </div>
          </Link>
        </div>
      }
      else return <div className={this.state.viewType}>
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
              // getUser(exchangeUsers[exchangeId][i].id)
              // getUserIdentity(exchangeUsers[exchangeId][i].id)
            }
            else {
              getUser(exchangeUsers[exchangeId][i].id)
              // getOrganization(exchangeUsers[exchangeId][i].id)
              // getOrgIdentity(exchangeUsers[exchangeId][i].id)
            }
            temp.push(exchangeUsers[exchangeId][i])
          }
        }
        this.setState({...this.state, initialMembers: temp.slice(), moreMembers: true})
      }
    }
  }

  componentDidMount() {
    window.scrollTo({
      top: 0
    })
    let {exchangeUsers, exchangeId, getFollowingSelector, actions} = this.props
    let {getUser, getOrganization, getUserIdentity, getOrgIdentity} = actions

    // getExchangeMembers({exchangeId}) //n

    let temp = []
    if (exchangeUsers) {
      if (exchangeUsers[exchangeId]) {
        for (let i = 0; i < 6; i++) {
          if (exchangeUsers[exchangeId][i]) {
            if (exchangeUsers[exchangeId][i].type === "USER") {
              getUser(exchangeUsers[exchangeId][i].id)
              // getUser(exchangeUsers[exchangeId][i].id)
              // getUserIdentity(exchangeUsers[exchangeId][i].id)
            }
            else {
              getUser(exchangeUsers[exchangeId][i].id)
              // getOrganization(exchangeUsers[exchangeId][i].id)
              // getOrgIdentity(exchangeUsers[exchangeId][i].id)
            }
            temp.push(exchangeUsers[exchangeId][i])
          }
        }
        this.setState({...this.state, initialMembers: temp, requested: true})
      }
    }

    let tempUsers = []
    let tempOrgans = []
    for (let i = 0; i < getFollowingSelector.length; i++) {
      if (getFollowingSelector[i].identity_user !== null) {
        tempUsers.push(getFollowingSelector[i].identity_user)
      }
      else if (getFollowingSelector[i].identity_organization !== null) {
        tempOrgans.push(getFollowingSelector[i].identity_organization)
      }
    }
    this.setState({...this.state, followingUsers: tempUsers.slice(), followingOrgans: tempOrgans.slice()})
  }

  componentDidUpdate(prev, nex, ss) {
    if (!this.state.requested) {
      let {exchangeUsers, exchangeId, actions} = this.props
      let {getUser, getOrganization, getUserIdentity, getOrgIdentity} = actions
      let temp = []
      if (exchangeUsers) {
        if (exchangeUsers[exchangeId]) {
          for (let i = 0; i < 6; i++) {
            if (exchangeUsers[exchangeId][i]) {
              // if (exchangeUsers[exchangeId][i].type === "USER") {
              //   getUserIdentity(exchangeUsers[exchangeId][i].id)
              //   // getUser(exchangeUsers[exchangeId][i].id)
              //   // getUserIdentity(exchangeUsers[exchangeId][i].id)
              // } else {
              //   getUserIdentity(exchangeUsers[exchangeId][i].id)
              //   // getOrganization(exchangeUsers[exchangeId][i].id)
              //   // getOrgIdentity(exchangeUsers[exchangeId][i].id)
              // }
              temp.push(exchangeUsers[exchangeId][i])
            }
          }
          this.setState({...this.state, initialMembers: temp, requested: true})
        }
      }
    }
  }

  render() {
    let {initialMembers, moreMembers, viewType, requested} = this.state
    return (
        <div className={"members-frame"}>
          <div className={"members-header-right"}>
            <Contacts width="22px" height="22px" containerClass={"svg-container-info-view"} svgClass={"svg-info-view"}/>
            <span>اعضا</span>
          </div>
          <div className={"members-header-left"} onClick={this.changeViewType}>
            {viewType === "member-square" ?
                <Stream width="16px" height="16px" svgClass={"svg-info-view"}/> :
                <QuestionMark width="20px" height="20px" svgClass={"svg-info-view"}/>}
          </div>
          <div className={"members-body"}>
            {initialMembers.length > 0 ? initialMembers.map((p, index) => {
              return this.getMembers(p.id, p.type, index)
            }) : requested ? <div/>
                :
                <div style={{textAlign: "center", width: "92%"}}>
                  <ClipLoader color={"#cbcbcb"} size={40} loading={true}/>
                </div>
            }
            <div className={"zero-height-member"}/>
            <div className={"zero-height-member"}/>
            {(!moreMembers) && initialMembers.length >= 6 ?
                <div className={"members-more"} onClick={this.setAllMembers}>
                  بارگذاری بیشتر
                </div> : null}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exchangeUsers: state.common.exchangeMembership.members,
    organs: state.organs.list,
    profiles: state.identities.list,
    files: state.common.file.list,
    // clientId: state.auth.client.user.id,
    clientId: state.auth.client.identity.content,
    identities: state.identities.list,
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
export default connect(mapStateToProps, mapDispatchToProps)(MembersView)