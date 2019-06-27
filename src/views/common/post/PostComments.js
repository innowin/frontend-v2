import * as React from "react"
import * as PropTypes from 'prop-types'

import type {commentType} from "src/consts/flowTypes/common/comment"
import Comment from './Comment'

type postCommentsProps = {
  comments: [commentType],
  stateComments: { number: commentType },
  translate: { [string]: string },
  replyComment: Function,
  deleteComment: Function,
}

class PostComments extends React.PureComponent<postCommentsProps, {}> {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    stateComments: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    replyComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }

  // commentList: HTMLDivElement

  // getSnapshotBeforeUpdate(prevProps: postCommentsProps) {
  //   if (prevProps.comments.length < this.props.comments.length) {
  //     this.commentList.scrollTop = 0;
  //   }
  //   return null
  // }

  render() {
    const {comments, translate, replyComment, deleteComment, stateComments} = this.props
    return (
        <div /*ref={commentList => this.commentList = commentList}*/ className='comments-wrapper'>
          {
            comments.map(comment =>
                <Comment key={'comment ' + comment.id} comment={comment} stateComments={stateComments} translate={translate}
                         replyComment={replyComment} deleteComment={deleteComment}/>
            )
          }
        </div>
    )
  }
}

export default PostComments