import React from 'react'
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
    const {getPostByIdentity, userId, isLogin} = this.props
    getPostByIdentity({postIdentity: userId, postOwnerId: userId, limit: 10, offset: 0, token: !isLogin})
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
    const {offset} = this.state
    const {updatePost, deletePost} = this.props
    const posts = this.props.posts.slice(0, offset)

    return (
        <div className="-frameCardPost user-posts">
          <div className='list-group list-group-flush'>
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
          </div>
        </div>
    )
  }
}

export default Posts