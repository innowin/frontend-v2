import * as React from 'react'
import {FrameCard, ListGroup} from 'src/views/common/cards/Frames'
import {Post} from './Post'

class Posts extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeScrollHeight: 0,
      offset: 10,
    }
  }

  componentDidMount() {
    const {getPostByIdentity, userId} = this.props
    getPostByIdentity({postIdentity: userId, postOwnerId: userId, limit: 10, offset: 0})
    document.addEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    if (Object.values(this.props.posts).length > 0) {
      const {offset} = this.state
      const {activeScrollHeight} = this.state
      const scrollHeight = document.body ? document.body.scrollHeight : 0
      if (((window.innerHeight + window.scrollY) >= (scrollHeight - 250)) && (scrollHeight > activeScrollHeight)) {
        const {getPostByIdentity, userId} = this.props
        this.setState({...this.state, activeScrollHeight: scrollHeight, offset: offset + 10},
            () => {
              getPostByIdentity({postIdentity: userId, postOwnerId: userId, limit: 10, offset})
            },
        )
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll)
  }

  render() {
    const {posts, updatePost, deletePost} = this.props
    return (
        <FrameCard className="-frameCardPost user-posts">
          <ListGroup>
            {
              posts && posts.map(post =>
                  post && post.id ?
                      <Post
                          key={post.id + 'Posts'}
                          post={post}
                          updatePost={updatePost}
                          deletePost={deletePost}
                      />
                      : null,
              )
            }
          </ListGroup>
        </FrameCard>
    )
  }
}

export default Posts