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
import {getMessages} from "src/redux/selectors/translateSelector"
// import {arrayOfDeffered} from 'redux-saga/utils'
// import exchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
// import {VerifyWrapper} from "../../common/cards/Frames"

type props = {
  actions: {
    createFollow: Function,
  },
  clientId: number,
  clientIdentityId: number,
  deleteFollow: Function,
  files: [],
  followings: [],
  getFollowingSelector: [{
    identity_user: number,
    identity_organization: number,
  }],
  organs: [],
  profiles: [],
  translate: { [string]: [string] },
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

class NewFollowings extends Component<props, states> {
  constructor(props) {
    super(props)
    this.state = {
      buttonHover: false,
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
    // if (this.state.viewType === 'member-square-user') {
    //   this.setState({...this.state, viewType: 'member-row'})
    // } else this.setState({...this.state, viewType: 'member-square-user'})
  }

  follow(identity_user, identity_organization) {
    if (identity_user !== null) {
      const {clientIdentityId, profiles, actions} = this.props
      const identityId = profiles[identity_user].identity.content
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({formValues, followOwnerId: identity_user})
      this.state.followingUsers.push(identity_user)
    }
    if (identity_organization !== null) {
      const {clientIdentityId, organs, actions} = this.props
      const identityId = organs[identity_organization].identity.content
      const {createFollow} = actions
      const formValues = {follow_follower: clientIdentityId, follow_followed: identityId}
      createFollow({formValues, followOwnerId: identity_organization})
      this.state.followingOrgans.push(identity_organization)
    }
  }

  _onDeleteFollowing(following) {
    const {deleteFollow, userId} = this.props
    const followId = following.follow_id
    deleteFollow({followId, followOwnerId: userId})
  }

  getMembers(identity_type, id, follow_accepted, index) {
    let {
      profiles,
      organs,
      files,
      clientId,
      // translate,
      followings,
      identityUser
      // paramId
    } = this.props
    // let {
    // followingUsers,
    // followingOrgans,
    // buttonHover
    // } = this.state
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
          {
            id !== clientId ?
                <div
                    className="member-follow"
                    onClick={() => this._onDeleteFollowing(followings[index])}>
                  <span className="member-following-button"> </span>
                </div>
                : null
          }
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
          {
            id !== clientId ?
                <div
                    className="member-follow"
                    onClick={() => this._onDeleteFollowing(followings[index])}>
                  <span className="member-following-button"> </span>
                </div>
                : null
          }
        </div>
      }
      else return <div className={this.state.viewType}>
        <div className={"member-loading"}>
          <ClipLoader color={"#cbcbcb"} size={60}/>
        </div>
      </div>
    }
  }

  componentDidMount() {
    window.scrollTo({
      top: 0
    })
  }

  componentDidUpdate(prevProps, prevState, ss): void {
    if ((this.props.followings && this.props.followings.length !== prevProps.followings.length) || prevProps.ownerId !== this.props.ownerId) {
      let {followings, actions} = this.props
      for (let i = 0; i < followings.length; i++) {
        if (followings[i].id !== null && followings[i].identity_type === constants.USER_TYPES.ORG) {
          actions.getUser(followings[i].id)
        }
        else if (followings[i].id !== null && followings[i].identity_type === constants.USER_TYPES.USER) {
          actions.getUser(followings[i].id)
        }
      }
    }
  }

  render() {
    let {
      // moreMembers,
      viewType,
      requested
    } = this.state
    let {followings, translate} = this.props

    return (
        <div className={"members-frame"}>
          <div className={"members-header-right"}>
            <Contacts width="22px" height="22px" containerClass={"svg-container-info-view"} svgClass={"svg-info-view"}/>
            <span>{translate["Followings"]}</span>
          </div>
          <div className={"members-header-left"} style={{cursor: "default"}} onClick={this.changeViewType}>
            {viewType === "member-square-user" ?
                <Stream width="16px" height="16px" svgClass={"svg-info-view"}/> :
                <QuestionMark width="20px" height="20px" svgClass={"svg-info-view"}/>}
          </div>
          <div className={"members-body"}>
            {followings.length > 0 ? followings.map((p, index) => {
              return this.getMembers(p.identity_type, p.id, p.follow_accepted, index)
            }) : requested ? <div/>
                :
                <div style={{textAlign: "center", width: "92%"}}>
                  {/*<ClipLoader color={'#cbcbcb'} size={40} loading={true}/>*/}
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

const mapStateToProps = (state, ownProps) => {
  return {
    exchangeUsers: state.common.exchangeMembership.members,
    organs: state.identities.list,
    profiles: state.identities.list,
    files: state.common.file.list,
    clientId: state.auth.client.identity.content,
    translate: getMessages(state),
    getFollowingSelector: getFolloweesSelector(state, {
      identityId: state.auth.client.identity.content,
      ownerId: state.auth.client.user.id,
      identityType: state.auth.client.user_type
    }),
    identityUser: state.identities.list[ownProps.ownerId] && state.identities.list[ownProps.ownerId].identity_user ? state.identities.list[ownProps.ownerId].identity_user : null
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getUser: getUserAction.getUserByUserId,
    // getOrganization: organizationActions.getOrganizationByOrganId,
    createFollow: SocialActions.createFollow,
    getFollowingAction: SocialActions.getFollowees
    // getUserIdentity: identityActions.getUserIdentity,
    // getOrgIdentity: identityActions.getOrgIdentity
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(NewFollowings)