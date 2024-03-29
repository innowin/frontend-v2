import * as React from 'react'
import {FrameCard, ListGroup} from 'src/views/common/cards/Frames'
import {Post} from './Post'

const Posts = (props) => {
  const {posts, updatePost, deletePost} = props
  return (
      <FrameCard className="-frameCardPost user-posts">
        <ListGroup>
          {
            posts && posts.map(post =>
                <Post
                    post={post}
                    updatePost={updatePost}
                    key={post.id + 'Posts'}
                    deletePost={deletePost}
                />,
            )
          }
        </ListGroup>
      </FrameCard>
  )
}

export default Posts