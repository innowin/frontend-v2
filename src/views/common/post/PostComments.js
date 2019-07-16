import React from 'react'
import Comment from './Comment'
import connect from 'react-redux/es/connect/connect'
import {GetAllComments} from '../../../redux/selectors/common/comment/CommentsSelector'

const PostComments = (props) => {

  const {comments, translate, replyComment, deleteComment, identities, allComments} = props
  return (
      <div className='comments-wrapper'>
        {
          comments.map(comment =>
              <Comment key={'comment ' + comment.id}
                       identities={identities}
                       comment={comment}
                       comments={allComments}
                       translate={translate}
                       replyComment={replyComment}
                       deleteComment={deleteComment}/>,
          )
        }
      </div>
  )
}

const mapStateToProps = (state, props) => ({
  identities: state.identities.list,
  allComments: GetAllComments(state, {post: props.post}),
})

export default connect(mapStateToProps)(PostComments)