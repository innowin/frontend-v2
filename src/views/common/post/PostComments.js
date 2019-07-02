import React from 'react'
import * as PropTypes from 'prop-types'
import Comment from './Comment'

class PostComments extends React.PureComponent {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    translate: PropTypes.object.isRequired,
    replyComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }

  render() {
    const {comments, translate, replyComment, deleteComment} = this.props
    return (
        <div className='comments-wrapper'>
          {
            comments.map(comment =>
                <Comment key={'comment ' + comment.id} comment={comment} comments={comments} translate={translate}
                         replyComment={replyComment} deleteComment={deleteComment}/>,
            )
          }
        </div>
    )
  }
}

export default PostComments