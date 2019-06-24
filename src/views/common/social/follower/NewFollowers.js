import React from 'react'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {DefaultUserIcon, Contacts, QuestionMark, Stream} from 'src/images/icons'
import {Link} from 'react-router-dom'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {Component} from 'react'

class NewFollowers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moreMembers: false,
      requested: false,
      viewType: 'member-square-user',
    }
    const self: any = this
    self.changeViewType = self.changeViewType.bind(self)
    // self.setAllMembers = self.setAllMembers.bind(self)
  }

  changeViewType() {
    // if (this.state.viewType === 'member-square-user') {
    //   this.setState({...this.state, viewType: 'member-row'})
    // } else this.setState({...this.state, viewType: 'member-square-user'})
  }

  follow(userId) {
    const {clientId, actions} = this.props
    const {createFollow} = actions
    const formValues = {follow_follower: clientId, follow_followed: userId}
    createFollow({formValues})
  }

  unFollow(followId) {
    const {clientId, actions} = this.props
    const {unFollow} = actions
    unFollow({followId: followId, followOwnerId: clientId})
  }

  componentDidMount() {
    if (document.body.clientWidth > 480) window.scrollTo({top: 0})
  }

  render() {
    let {/*moreMembers,*/viewType} = this.state
    let {followers, clientFollowings, translate, clientId} = this.props

    return (
        <div className={'members-frame'}>
          <div className={'members-header-right'}>
            <Contacts width="22px" height="22px" containerClass={'svg-container-info-view'} svgClass={'svg-info-view'}/>
            <span>{translate['Followings']}</span>
          </div>
          <div className='members-header-left' style={{cursor: 'default'}} onClick={this.changeViewType}>
            {
              viewType === 'member-square-user' ?
                  <Stream width="16px" height="16px" svgClass={'svg-info-view'}/> :
                  <QuestionMark width="20px" height="20px" svgClass={'svg-info-view'}/>
            }
          </div>
          <div className='members-body'>
            {
              followers.length > 0 && followers.map((user, index) =>
                  <div key={index} className={this.state.viewType}>
                    <Link to={`/user/${user.id}`}>
                      <div className={'member-picture-container'}>
                        {
                          user.profile_media ?
                              <img alt="" src={user.profile_media.file} width='55px' height='55px' className='member-picture'/>
                              : <DefaultUserIcon height='55px' width='55px' className='member-picture'/>
                        }
                      </div>
                      <div className='member-info-container'>
                        <div className='member-name'>{user.first_name || user.last_name ? user.first_name + ' ' + user.last_name : user.username}</div>
                        <div className='member-description'>{user.description}</div>
                      </div>
                    </Link>
                    {
                      user.id !== clientId ?
                          !clientFollowings.map(follower => follower.id ? follower.id : parseInt(follower, 10)).includes(user.id)
                              ?
                              <div className="member-follow" onClick={() => this.follow(user.id)}>
                                <span className="member-follow-green-button">دنبال کردن</span>
                              </div>
                              :
                              <div className="member-follow" onClick={() => this.unFollow(user.followId)}>
                                <span className="member-following-button"> </span>
                              </div>
                          : null
                    }
                  </div>,
              )
            }
            <div className='zero-height-member'/>
            <div className='zero-height-member'/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  clientId: state.auth.client.identity.content,
  translate: getMessages(state),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    createFollow: SocialActions.createFollow,
    unFollow: SocialActions.deleteFollow,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(NewFollowers)