import React from 'react'
import * as PropTypes from 'prop-types'
import Comment from './Comment'

class PostComments extends React.PureComponent {

  static propTypes = {
    comments: PropTypes.array.isRequired,
    stateComments: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    replyComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }

  render() {
    const {comments, translate, replyComment, deleteComment, stateComments} = this.props
    return (
        <div className='comments-wrapper'>
          {
            comments.map(comment =>
                <Comment key={'comment ' + comment.id} comment={comment} stateComments={stateComments} translate={translate}
                         replyComment={replyComment} deleteComment={deleteComment}/>,
            )
          }
        </div>
    )
  }
}

export default PostComments