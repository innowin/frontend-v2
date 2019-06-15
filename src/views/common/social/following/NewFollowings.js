// @flow
import * as React from 'react'
import constants from 'src/consts/constants'
import getUserAction from 'src/redux/actions/user/getUserActions'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {Component} from 'react'
import {connect} from 'react-redux'
import {DefaultUserIcon, Contacts, QuestionMark, Stream} from 'src/images/icons'
import {Link} from 'react-router-dom'
import {getMessages} from 'src/redux/selectors/translateSelector'

type props = {
  actions: {
    createFollow: Function,
  },
  clientId: number,
  clientIdentityId: number,
  deleteFollow: Function,
  files: [],
  followings: [],
  clientFollowings: [],
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
      viewType: 'member-square-user',
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

  follow(identity_type, id) {
    if (identity_type === constants.USER_TYPES.USER) {
      const {clientId, actions} = this.props
      const identityId = id
      const {createFollow, getFollowingAction} = actions
      const formValues = {follow_follower: clientId, follow_followed: identityId}
      createFollow({formValues, followOwnerId: id})
      getFollowingAction({followOwnerId: clientId, followOwnerIdentity: clientId})
      this.state.followingUsers.push(id)
    }
    if (identity_type === constants.USER_TYPES.ORG) {
      const {clientId, actions} = this.props
      const identityId = id
      const {createFollow, getFollowingAction} = actions
      const formValues = {follow_follower: clientId, follow_followed: identityId}
      createFollow({formValues, followOwnerId: id})
      getFollowingAction({followOwnerId: clientId, followOwnerIdentity: clientId})
      this.state.followingOrgans.push(id)
    }
  }

  _isFollowed(userId) {
    const {clientId, user_follows, follows} = this.props
    let follow_list = []
    let res = false
    user_follows.forEach(id => follow_list.push(follows[id]))
    follow_list.forEach(p => !res ? res = p.follow_followed.id === userId && p.follow_follower.id === clientId : null)
    return res
  }

  _onDeleteFollowing(following) {
    const {deleteFollow, clientId, user_follows, follows} = this.props
    let follow_list = []
    user_follows.forEach(id => follow_list.push(follows[id]))
    follow_list.forEach(p =>
        p.follow_followed.id === following.id && p.follow_follower.id === clientId && deleteFollow({followId: p.id, followOwnerId: clientId}),
    )
  }

  getMembers(identity_type, id, follow_accepted, index) {
    let {profiles, organs, files, clientId, followings} = this.props
    if (identity_type === constants.USER_TYPES.USER) {
      if (profiles[id]) {
        return <div key={index} className={this.state.viewType}>
          <Link to={`/user/${id}`}>
            <div className={'member-picture-container'}>
              {profiles[id].profile_media ?
                  <img alt=""
                       src={files[profiles[id].profile_media] && files[profiles[id].profile_media].file}
                       width={'55px'} height={'55px'}
                       className={'member-picture'}/>
                  : <DefaultUserIcon
                      height={'55px'} width={'55px'} className={'member-picture'}/>}
            </div>

            <div className={'member-info-container'}>
              <div className={'member-name'}>{
                profiles[id].first_name ||
                profiles[id].last_name ?
                    profiles[id].first_name
                    + ' ' +
                    profiles[id].last_name
                    : profiles[id].username
              }</div>
              <div className={'member-description'}>{
                profiles[id].description
              }</div>
            </div>
          </Link>
          {
            id !== clientId ?
                this._isFollowed(followings[index].id) ?
                    <div
                        className="member-follow"
                        onClick={() => this._onDeleteFollowing(followings[index])}>
                      <span className="member-following-button"> </span>
                    </div> :
                    <div className="member-follow" onClick={() => this.follow(identity_type, id)}><span
                        className="member-follow-green-button">دنبال کردن</span></div>
                : null
          }
        </div>
      }
      else return <div className={this.state.viewType}>
        <div className={'member-loading'}>
          <ClipLoader color={'#cbcbcb'} size={60}/>
        </div>
      </div>
    }
    if (identity_type === constants.USER_TYPES.ORG) {
      if (organs[id]) {
        return <div key={index}
                    className={this.state.viewType}>
          <Link to={`/organization/${id}`}>
            <div className={'member-picture-container'}>
              {organs[id].organization_logo ?
                  <img alt=""
                       src={files[organs[id].organization_logo] ?
                           files[organs[id].organization_logo].file :
                           null}
                       width={'55px'} height={'55px'}
                       className={'member-picture'}/>
                  : <DefaultUserIcon
                      height={'55px'} width={'55px'} className={'member-picture'}/>}
            </div>

            <div className={'member-info-container'}>
              <div className={'member-name'}>{
                organs[id].official_name !== '' ?
                    organs[id].official_name :
                    organs[id].username
              }</div>
              <div className={'member-description'}>{
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
        <div className={'member-loading'}>
          <ClipLoader color={'#cbcbcb'} size={60}/>
        </div>
      </div>
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480) window.scrollTo({top: 0})
  }

  render() {
    let {/*moreMembers,*/viewType, requested} = this.state
    let {followings, translate} = this.props

    return (
        <div className={'members-frame'}>
          <div className={'members-header-right'}>
            <Contacts width="22px" height="22px" containerClass={'svg-container-info-view'} svgClass={'svg-info-view'}/>
            <span>{translate['Followings']}</span>
          </div>
          <div className={'members-header-left'} style={{cursor: 'default'}} onClick={this.changeViewType}>
            {viewType === 'member-square-user' ?
                <Stream width="16px" height="16px" svgClass={'svg-info-view'}/> :
                <QuestionMark width="20px" height="20px" svgClass={'svg-info-view'}/>}
          </div>
          <div className={'members-body'}>
            {followings.length > 0 ? followings.map((p, index) => {
              return this.getMembers(p.identity_type, p.id, p.follow_accepted, index)
            }) : requested ? <div/>
                :
                <div style={{textAlign: 'center', width: '92%'}}>
                  {/*<ClipLoader color={'#cbcbcb'} size={40} loading={true}/>*/}
                </div>
            }
            <div className={'zero-height-member'}/>
            <div className={'zero-height-member'}/>
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
  let clientId = state.auth.client.identity.content
  return {
    exchangeUsers: state.common.exchangeMembership.members,
    organs: state.identities.list,
    profiles: state.identities.list,
    files: state.common.file.list,
    clientId,
    translate: getMessages(state),
    follows: state.common.social.follows.list,
    user_follows: state.identities.list[clientId].social.follows.content,
    identityUser: state.identities.list[ownProps.ownerId] && state.identities.list[ownProps.ownerId].identity_user ? state.identities.list[ownProps.ownerId].identity_user : null,
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getUser: getUserAction.getUserByUserId,
    createFollow: SocialActions.createFollow,
    getFollowingAction: SocialActions.getFollowees,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(NewFollowings)