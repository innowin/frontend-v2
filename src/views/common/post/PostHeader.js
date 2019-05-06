import * as React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import DefaultUserIcon from '../../../images/defaults/defaultUser_svg'
import PostMenu from './PostMenu'
import constants from 'src/consts/constants'
import Material from '../components/Material'
import connect from 'react-redux/es/connect/connect'
import socialActions from '../../../redux/actions/commonActions/socialActions'
import {bindActionCreators} from 'redux'
import {getFollowersSelector} from '../../../redux/selectors/common/social/getFollowers'

class PostHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      instantView: false,
      x: 0,
      y: 0,
    }
    this.showInstant = this.showInstant.bind(this)
    this.hideInstant = this.hideInstant.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this._follow = this._follow.bind(this)
  }

  mouseMove(e) {
    if (!this.state.instantView) {
      let target = this.container
      let rect = target.getBoundingClientRect()
      this.setState({...this.state, x: e.clientX - rect.left, y: e.clientY - rect.top})
    }
  }

  showInstant() {
    if (document.body.clientWidth > 480)
      this.timer = setTimeout(() => this.setState({...this.state, instantView: true}), 500)
  }

  hideInstant() {
    clearTimeout(this.timer)
    this.setState({...this.state, instantView: false})
  }

  _follow() {
    const {actions, clientIdentity, postIdentity} = this.props
    const {createFollow} = actions
    const formValues = {follow_follower: clientIdentity, follow_followed: postIdentity.id}
    createFollow({formValues, followOwnerId: postIdentity.id})
  }

  render() {
    const {instantView, x, y} = this.state
    const {post, translate, postRelatedIdentityImage, postIdentity, showEdit, extendedView, openMenu, deletePost, menuToggle, postMenuId, followers, clientIdentity} = this.props
    let createdTime
    let name = ''
    let url = ''
    if (post) {
      createdTime = post.created_time
      if (postIdentity && postIdentity.id) {
        const isUser = postIdentity.identity_type === constants.USER_TYPES.USER
        name = isUser ? ((postIdentity.first_name || postIdentity.last_name) ? postIdentity.first_name + ' ' + postIdentity.last_name : undefined)
            : (postIdentity.nike_name || postIdentity.official_name || undefined)
        url = isUser ? `/user/${postIdentity.id}` : `/organization/${postIdentity.id}`
      }
    }
    const showFollow = !followers.map(follower => follower.follow_follower.id ? follower.follow_follower.id : follower.follow_follower).includes(clientIdentity)

    return (
        <div ref={e => this.container = e} className="-item-headerPost">
          <div onMouseEnter={this.showInstant} onMouseLeave={this.hideInstant} onMouseMove={this.mouseMove}>
            <Link to={url} className='link-post'>
              <div className="-img-col">
                {postRelatedIdentityImage && postRelatedIdentityImage.file ?
                    <img className="rounded-circle covered-img" src={postRelatedIdentityImage.file} alt=""/>
                    : <DefaultUserIcon className="rounded-circle covered-svg"/>
                }
              </div>
              <div className="-item-titlePost">
                <div>
                <span className="post-name">
                  {name}
                </span>
                  <span className="-green2 post-username">
                  {postIdentity && postIdentity.username}
                </span>
                </div>
                <div className='post-date'>
                  <Moment className="-green2" element="span" fromNow ago>{createdTime}</Moment>
                  <span className="-green2"> {translate['Last']}</span>
                </div>
              </div>
            </Link>

            <div className={instantView ? 'post-instant-view' : 'post-instant-view-hide'} style={{top: y, left: x}}>
              {
                postRelatedIdentityImage && postRelatedIdentityImage.file ?
                    <img className="post-instant-view-img rounded-circle covered-img" src={postRelatedIdentityImage.file} alt=""/>
                    : <DefaultUserIcon className="post-instant-view-img rounded-circle covered-svg"/>
              }
              <div className='post-instant-view-name'>{name}</div>
              <div className='post-instant-view-desc'>{postIdentity && postIdentity.description}</div>
              {
                postIdentity && clientIdentity && clientIdentity !== postIdentity.id ?
                    <div className='post-instant-view-follow'>
                      {
                        showFollow ?
                            <Material className='post-instant-view-follow-btn' content={translate['Follow']} onClick={this._follow}/>
                            :
                            <Material className='post-instant-view-followed-btn' content={translate['Followed']}/>
                      }
                    </div>
                    : null
              }
            </div>

          </div>

          <PostMenu postMenuId={postMenuId} translate={translate} post={post} extendedView={extendedView}
                    deletePost={deletePost}
                    menuToggle={menuToggle} openMenu={openMenu} postIdentity={postIdentity} showEdit={showEdit}/>
        </div>
    )
  }
}

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  postRelatedIdentityImage: PropTypes.object,
  showEdit: PropTypes.func,
  extendedView: PropTypes.bool,
  postMenuId: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  followers: getFollowersSelector(state, {ownerId: ownProps.postIdentity && ownProps.postIdentity.id}),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createFollow: socialActions.createFollow,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostHeader)