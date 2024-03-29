import * as React from "react"
import Moment from "react-moment"
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import ReplyArrow from "src/images/common/reply_arrow_svg"
import type {commentType} from "src/consts/flowTypes/common/comment"
import CheckOwner from "../CheckOwner"
import {DefaultOrganIcon, DefaultUserIcon, MoreOptionSvg} from 'src/images/icons'
import constants from 'src/consts/constants'


type CommentProps = {
  comment: commentType,
  stateComments: { number: commentType },
  translate: { [string]: string },
  replyComment: Function,
  deleteComment: Function,
}

type CommentStates = {
  menuToggle: boolean,
}

class Comment extends React.Component<CommentProps, CommentStates> {

  static propTypes = {
    comment: PropTypes.object.isRequired,
    stateComments: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    replyComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }

  constructor(props: postCommentsProps) {
    super(props)
    this.state = {
      menuToggle: false
    }

    this._handleClickOutMenuBox = this._handleClickOutMenuBox.bind(this)
    this._openMenu = this._openMenu.bind(this)
  }

  componentDidMount(): void {
    document.addEventListener('click', this._handleClickOutMenuBox)
    document.addEventListener('touchend', this._handleClickOutMenuBox)
  }

  componentWillUnmount(): void {
    document.removeEventListener('click', this._handleClickOutMenuBox)
    document.removeEventListener('touchend', this._handleClickOutMenuBox)
  }

  _handleClickOutMenuBox(e: any) {
    if (!e.target.closest('.menu-container')) {
      this.setState({
        ...this.state,
        menuToggle: false
      })
    }
  }

  _openMenu(e) {
    e.preventDefault()
    this.setState({
      ...this.state,
      menuToggle: !this.state.menuToggle
    })
  }

  render() {
    const {comment, translate, replyComment, deleteComment, stateComments} = this.props
    const {menuToggle} = this.state

    const commentSender = comment.comment_sender
    const commentRepliedToId = comment.comment_replied_to && comment.comment_replied_to.id
    const commentRepliedSender = commentRepliedToId && stateComments[commentRepliedToId] && stateComments[commentRepliedToId].comment_sender
    const name = (commentSender.first_name || commentSender.last_name)
        ? commentSender.first_name + ' ' + commentSender.last_name
        : commentSender.username
    const profileMediaUrl = commentSender.profile_media_url
    const identityType = commentSender.identity_type
    const isUser = identityType === constants.USER_TYPES.USER
    const url = isUser ? `/user/${commentSender.id}` : `/organization/${commentSender.id}`

    return (
        <div className='comment-item-wrapper'>
          <div className='comment-sender-container'>
            <Link to={url}>
              {profileMediaUrl ?
                  <img src={profileMediaUrl} alt='comment sender' className='comment-sender-image'/>
                  : isUser ?
                      <DefaultUserIcon className='comment-sender-image'/>
                      : <DefaultOrganIcon className='comment-sender-image organ-image'/>
              }
            </Link>
          </div>
          <div className='comment-container-extended-view'>
            <div className='header'>
              <h5 className='sender-name'>{name}</h5>
              <h5 className='sender-username'>{'@' + comment.comment_sender.username}</h5>
              <button className='svg-post-container pulse' onClick={() => replyComment(comment)}>
                <ReplyArrow/>
              </button>
              <div className='comment-date'>
                <Moment element="span" fromNow ago>{comment.created_time}</Moment>
                <span> {translate['Last']}</span>
              </div>

              <div className='menu-container' onClick={this._openMenu}>
                <MoreOptionSvg className="more-option-svg"/>
                {menuToggle &&
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
              {commentRepliedSender &&
              <p className='replied-username'>{'@' + commentRepliedSender.username}</p>
              }
              <p className='post-text-comment'>{comment.text}</p>
            </div>
          </div>
        </div>
    )
  }
}

export default Comment