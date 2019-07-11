import React from 'react'
import getUserAction from 'src/redux/actions/user/getUserActions'
import SocialActions from 'src/redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'
import {DefaultUserIcon, QuestionMark, Stream} from 'src/images/icons'
import {Link} from 'react-router-dom'
import {getFollowingsSelector} from 'src/redux/selectors/common/social/getNewFollowings'
import {PureComponent} from 'react'

class MembersView extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      initialMembers: [],
      viewType: 'member-square',
      moreMembers: false,
      followingUsers: [],
    }

    this.changeViewType = this.changeViewType.bind(this)
    this.getMembers = this.getMembers.bind(this)
    this.setAllMembers = this.setAllMembers.bind(this)
  }

  componentDidMount() {
    if (document.body.clientWidth > 480) window.scrollTo({top: 0, behavior: 'smooth'})
    let {exchangeUsers, exchangeId, followings, actions} = this.props
    let {getUser} = actions

    let temp = []
    if (exchangeUsers && exchangeUsers[exchangeId]) {
      for (let i = 0; i < 6; i++) {
        if (exchangeUsers[exchangeId][i]) {
          getUser(exchangeUsers[exchangeId][i].id)
          temp.push(exchangeUsers[exchangeId][i])
        }
      }
    }

    let tempUsers = []
    for (let i = 0; i < followings.length; i++) {
      if (followings[i].id)
        tempUsers.push(followings[i].id)
    }
    this.setState({...this.state, initialMembers: [...temp], followingUsers: [...tempUsers]})
  }

  changeViewType() {
    // if (this.state.viewType === "member-square") {
    //   this.setState({...this.state, viewType: "member-row"})
    // }
    // else this.setState({...this.state, viewType: "member-square"})
  }

  follow(targetId) {
    const {clientId, actions} = this.props
    const {createFollow} = actions
    const formValues = {follow_follower: clientId, follow_followed: targetId}
    createFollow({formValues})
    this.state.followingUsers.push(targetId)
  }

  getMembers(memberId, index) {
    let {clientId, identities} = this.props
    let {followingUsers} = this.state

    if (identities[memberId]) {
      return <div key={index} className={this.state.viewType}>
        <Link to={`/${identities[memberId].identity_type}/${memberId}`}>
          <div className={'member-picture-container'}>
            {
              identities[memberId].profile_media ?
                  <img src={identities[memberId].profile_media && identities[memberId].profile_media.file}
                       alt="" width={'55px'} height={'55px'} className={'member-picture'}/>
                  : <DefaultUserIcon
                      height={'55px'} width={'55px'} className={'member-picture'}/>
            }
          </div>

          <div className={'member-info-container'}>
            <div className={'member-name'}>{
              identities[memberId] && identities[memberId].first_name &&
              (identities[memberId].first_name.trim() !== '' ||
                  identities[memberId].last_name.trim() !== '') ?
                  identities[memberId].first_name + ' ' + identities[memberId].last_name :
                  identities[memberId].username !== '' ? identities[memberId].username : 'فرد ناشناس'
            }</div>
            <div className={'member-description'}>{
              identities[memberId].description
            }</div>
          </div>
        </Link>

        {
          clientId !== memberId ?
              <div className={followingUsers.indexOf(memberId) >= 0 ?
                  'member-followed-button'
                  : 'member-follow-green-button'}>
                {followingUsers.indexOf(memberId) >= 0 ?
                    <div>دنبال شده</div>
                    : <div onClick={() => this.follow(memberId)}>دنبال کردن</div>}
              </div> : null
        }
      </div>
    }
    else return <div className={this.state.viewType}>
      <div className='member-loading'>
        <ClipLoader color='#cbcbcb' size={60}/>
      </div>
    </div>
  }

  setAllMembers() {
    let {exchangeUsers, exchangeId, actions} = this.props
    let {getUser} = actions
    let temp = []
    if (exchangeUsers && exchangeUsers[exchangeId]) {
      for (let i = 0; i < exchangeUsers[exchangeId].length; i++) {
        if (exchangeUsers[exchangeId][i]) {
          getUser(exchangeUsers[exchangeId][i].id)
          temp.push(exchangeUsers[exchangeId][i])
        }
      }
      this.setState({...this.state, initialMembers: [...temp], moreMembers: true})
    }
  }

  render() {
    let {initialMembers, moreMembers, viewType} = this.state
    return (
        <div className='members-frame'>
          <div className={'members-header-right'}>
            {/*<Contacts width="22px" height="22px" containerClass={"svg-container-info-view"} svgClass={"svg-info-view"}/>*/}
            <span>اعضا</span>
          </div>
          <div className={'members-header-left'} onClick={this.changeViewType}>
            {viewType === 'member-square' ?
                <Stream width="16px" height="16px" svgClass={'svg-info-view'}/> :
                <QuestionMark width="20px" height="20px" svgClass={'svg-info-view'}/>}
          </div>
          <div className={'members-body'}>
            {initialMembers.length > 0 ? initialMembers.map((p, index) => {
              return this.getMembers(p.id, index)
            }) : <div/>
            }
            <div className={'zero-height-member'}/>
            <div className={'zero-height-member'}/>
            {(!moreMembers) && initialMembers.length >= 6 ?
                <div className={'members-more'} onClick={this.setAllMembers}>
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
    clientId: state.auth.client.identity.content,
    identities: state.identities.list,
    followings: getFollowingsSelector(state, {
      userId: state.auth.client.identity.content,
    }),
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getUser: getUserAction.getUserByUserId,
    createFollow: SocialActions.createFollow,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(MembersView)