import React from 'react'
import Moment from 'react-moment'
import * as PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ReplyArrow from 'src/images/common/reply_arrow_svg'
import CheckOwner from '../CheckOwner'
import {DefaultOrganIcon, DefaultUserIcon, MoreOptionSvg} from 'src/images/icons'
import constants from 'src/consts/constants'

class Comment extends React.PureComponent {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    replyComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuToggle: false,
    }

    this._handleClickOutMenuBox = this._handleClickOutMenuBox.bind(this)
    this._openMenu = this._openMenu.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickOutMenuBox)
    document.addEventListener('touchend', this._handleClickOutMenuBox)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutMenuBox)
    document.removeEventListener('touchend', this._handleClickOutMenuBox)
  }

  _handleClickOutMenuBox(e) {
    if (!e.target.closest('.menu-container')) {
      this.setState({
        ...this.state,
        menuToggle: false,
      })
    }
  }

  _openMenu(e) {
    e.preventDefault()
    this.setState({
      ...this.state,
      menuToggle: !this.state.menuToggle,
    })
  }

  render() {
    const {identities, comment, translate, replyComment, deleteComment, comments} = this.props
    const {menuToggle} = this.state
    const commentSender = identities[comment.comment_sender]
    const commentRepliedSender = comment.comment_replied_to && comments[comment.comment_replied_to] && identities[comments[comment.comment_replied_to].comment_sender]
    const name = (commentSender.first_name || commentSender.last_name)
        ? commentSender.first_name + ' ' + commentSender.last_name
        : commentSender.username

    const profileMediaUrl = commentSender.profile_media
    const identityType = commentSender.identity_type
    const isUser = identityType === constants.USER_TYPES.USER
    const url = `/${commentSender.identity_type}/${commentSender.id}`

    return (
        <div className='comment-item-wrapper'>
          <Link to={url}>
            {
              profileMediaUrl ?
                  <img src={profileMediaUrl.file} alt='comment sender' className='comment-sender-image'/>
                  : isUser ?
                  <DefaultUserIcon className='comment-sender-image'/>
                  : <DefaultOrganIcon className='comment-sender-image organ-image'/>
            }
          </Link>
          <div className='comment-container-extended-view'>
            <div className='header'>
              <h5 className='sender-name'>{name}</h5>
              <h5 className='sender-username'>{'@' + (commentSender && commentSender.username)}</h5>
              <button className='svg-post-container pulse' onClick={() => replyComment(comment)}>
                <ReplyArrow/>
              </button>
              <div className='comment-date'>
                <Moment element="span" fromNow ago>{comment.created_time}</Moment>
                <span> {translate['Last']}</span>
              </div>

              <div className='menu-container' onClick={this._openMenu}>
                <MoreOptionSvg className="more-option-svg"/>
                {
                  menuToggle &&
                  <div className="menu-box-comment">
                    <CheckOwner id={commentSender && commentSender.id}>
                      <span className='item' onClick={() => deleteComment(comment)}>{translate['Delete Comment']}</span>
                    </CheckOwner>
                    <span className='item'>{translate['Report']}</span>
                  </div>
                }
              </div>

            </div>
            <div className='content'>
              {
                comment.comment_replied_to ?
                    commentRepliedSender ?
                        <Link to={`/${commentRepliedSender.identity_type}/${commentRepliedSender.id}`}><p className='replied-username'>{'@' + commentRepliedSender.username}</p></Link>
                        :
                        <p className='replied-username delete'>@کامنت حذف شده</p>
                    : null
              }
              <p className='post-text-comment'>{comment.text}</p>
            </div>
          </div>
        </div>
    )
  }
}

export default Comment