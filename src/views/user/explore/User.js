// @flow
import * as React from 'react'
import {Component} from 'react'
import {DefaultUserIcon} from "src/images/icons"
import {bindActionCreators} from "redux"
import identityActions from "../../../redux/actions/identityActions"
import connect from "react-redux/es/connect/connect"
import socialActions from "../../../redux/actions/commonActions/socialActions"
import {ClipLoader} from "react-spinners"

type appProps =
    {|
      actions: any,
      members: Array<number>,
      data: any
    |}

type appState =
    {||}

class User extends Component <appProps, appState> {
  constructor(props) {
    super(props)
    this.state =
        {
          follow: false,
          followLoading: false
        }
  }

  follow = () => {

    this.setState({followLoading: true}, () => {
      if (this.props.identities[this.props.data.user.id] !== undefined && this.props.identities[this.props.data.user.id].identity.content !== null) {
        const formValues = {follow_follower: this.props.currentUserIdentity, follow_followed: this.props.identities[this.props.data.user.id].identity.content}
        this.props.actions.follow({formValues, followOwnerId: this.props.currentUserId, followOwnerType: this.props.currentUserType})
      }
      else {
        this.setState({...this.state, follow: true})
        this.props.actions.getUserIdentity(this.props.data.user.id)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.follow && (this.props.identities[this.props.data.user.id] !== undefined && this.props.identities[this.props.data.user.id].identity.content !== null)) {
      this.setState({...this.state, follow: false}, () => {
        const formValues = {follow_follower: this.props.currentUserIdentity, follow_followed: nextProps.identities[this.props.data.user.id].identity.content}
        this.props.actions.follow({formValues, followOwnerId: this.props.currentUserId, followOwnerType: this.props.currentUserType})
      })
    }
  }

  renderFollowed(data, followees) {
    if (followees[data.user.id] !== undefined) {
      return <button className='user-follow'>دنبال شده</button>
    }
    else if (this.state.followLoading) {
      return <div className='user-follow-loading'><ClipLoader color='#008057' size={19}/></div>
    }
    else return <button className='user-followed' onClick={this.follow}>دنبال کردن</button>

  }

  render() {
    const {data, followees} = this.props
    return (
        <div className='users-explore'>
          {
            data.profile.profile_banner !== null ?
                <img src={'https://restful.daneshboom.ir/' + data.profile.profile_banner.file} className='user-banner' alt={data.user.last_name}/>
                :
                <img src='https://restful.daneshboom.ir//media/3f366e481437444d8f8cdd5afb528360.jpg' className='user-banner' alt={data.user.last_name}/>
          }
          {data.profile.profile_media !== null ?
              <img src={'https://restful.daneshboom.ir/' + data.profile.profile_media.file} className='user-profile-photo' alt={data.user.last_name}/>
              :
              <DefaultUserIcon className='user-default-profile-photo'/>
          }

          <div>
            <div className='user-name'>{data.user.first_name + ' ' + data.user.last_name}</div>
            <div className='user-id'>@{data.user.username}</div>
          </div>

          <div className='user-description'>
            {data.profile.description}
          </div>

          <div className='user-baj-container'>
            {
              data.badges.map(badge =>
                  <img src={'https://restful.daneshboom.ir/' + badge.badge_related_badge_category.badge_related_media.file} className='user-baj' alt='badge'/>
              )
            }
          </div>

          {
            this.renderFollowed(data, followees)
          }

        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const userId = state.auth.client.organization !== null ? state.auth.client.organization.id : state.auth.client.user.id
  return {
    currentUserType: state.auth.client.user_type,
    currentUserIdentity: state.auth.client.identity.content,
    currentUserId: userId,
    identities: state.users.list,
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getUserIdentity: identityActions.getUserIdentity,
    getOrgIdentity: identityActions.getOrgIdentity,
    follow: socialActions.createFollow,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(User)
