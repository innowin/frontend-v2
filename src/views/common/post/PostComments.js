import * as React from "react"
import Moment from "react-moment"
import PropTypes from 'prop-types'

import ReplyArrow from "../../../images/common/reply_arrow_svg";
import FontAwesome from "react-fontawesome";
import type {commentType} from "../../../consts/flowTypes/common/comment";
import CheckOwner from "../CheckOwner";

type postCommentsProps = {
  comments: commentType,
  translate: { [string]: string },
  replyComment: Function,
  deleteComment: Function,
}

class PostComments extends React.Component<postCommentsProps, {}> {

  static propTypes = {
    comments: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    replyComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.object.isRequired,
  }

  commentList: HTMLDivElement

  constructor(props: postCommentsProps) {
    super(props)
    this.state = {menuToggle: false}
  }

  getSnapshotBeforeUpdate(prevProps: postCommentsProps) {
    if (prevProps.comments.length < this.props.comments.length) {
      this.commentList.scrollTop = 0;
    }
    return null
  }

  render() {
    const {comments, translate, replyComment, deleteComment} = this.props
    return (
        <div ref={commentList => this.commentList = commentList} className='comments-wrapper'>
          {
            comments.map(comment => {
                  const commentSender = comment.comment_sender
                  const isUser = commentSender.identity_user !== null
                  const commentSenderIdentity = commentSender.identity_user || commentSender.identity_organization
                  const name = commentSenderIdentity
                      ? (isUser ? ((commentSenderIdentity.first_name || commentSenderIdentity.last_name) ? commentSenderIdentity.first_name + ' ' + commentSenderIdentity.last_name : '')
                              : (commentSenderIdentity.nike_name || commentSenderIdentity.official_name || '')
                      ) : ''

                  return (
                      <div key={'comment ' + comment.id} className='comment-container-extended-view'>
                        <div className='header'>
                          <h5 className='sender-name'>{name}</h5>
                          <h5 className='sender-username'>{comment.comment_sender.name}</h5>
                          <button className='svg-post-container pulse' onClick={() => replyComment(comment)}>
                            <ReplyArrow/>
                          </button>
                          <CheckOwner id={commentSenderIdentity && commentSenderIdentity.id}>
                            <button className='svg-post-container pulse' onClick={() => deleteComment(comment)}>
                              <FontAwesome name="trash" className='delete-icon'/>
                            </button>
                          </CheckOwner>
                          <div className='comment-date'>
                            <Moment element="span" fromNow ago>{comment.created_time}</Moment>
                            <span> {translate['Last']}</span>
                          </div>
                        </div>
                        <div className='content'>
                          {comment.comment_replied && comment.comment_replied.comment_sender &&
                          <p className='replied-username'>{'@' + comment.comment_replied.comment_sender.name}</p>
                          }
                          <p className='post-text-comment'>{comment.text}</p>
                        </div>
                      </div>
                  )
                }
            )
          }
        </div>
    )
  }
}

export default PostComments