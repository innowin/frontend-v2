import * as React from 'react'
import constant from 'src/consts/constants'
import CreatePostNew from 'src/views/common/post/createPost/index'
import PostActions from 'src/redux/actions/commonActions/postActions'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {FrameCard, ListGroup, VerifyWrapper} from 'src/views/common/cards/Frames'
import {Post} from 'src/views/common/post/Post'
import {PureComponent} from 'react'
import {RightArrow, DesertIcon, EditIcon} from 'src/images/icons'


class HomePosts extends PureComponent {

  static propTypes = {
    className: PropTypes.string,
    exchangeId: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      activeScrollHeight: 0,
      offset: 0,
      scrollButton: false,
      showCreatePostSmall: false,
      getDataInDidMount: false
    }
  }

  componentWillMount(): void {
    window.addEventListener('scroll', this._onScroll)

    const {actions, exchangeId} = this.props
    const {filterPostsByPostParentLimitOffset} = actions
    const limit = 100
    const offset = 0
    if (exchangeId) {
      filterPostsByPostParentLimitOffset({
        postParentId: exchangeId, postType: null, limit, offset, postParentType: constant.POST_PARENT.EXCHANGE
      })
    } else this.setState({...this.state, getDataInDidMount: true})
  }

  componentDidMount() {
    if (this.state.getDataInDidMount) {
      const {actions, exchangeId} = this.props
      const {filterPostsByPostParentLimitOffset} = actions
      const limit = 100
      const offset = 0
      if (exchangeId) {
        filterPostsByPostParentLimitOffset({
          postParentId: exchangeId, postType: null, limit, offset, postParentType: constant.POST_PARENT.EXCHANGE
        })
      }
    }
  }

  componentDidUpdate(prevProps, prevState, ss) {
    const {actions, exchangeId} = this.props
    const {filterPostsByPostParentLimitOffset} = actions
    const limit = 100
    const offset = 0
    if (exchangeId && exchangeId !== prevProps.exchangeId) {
      filterPostsByPostParentLimitOffset({
        postParentId: exchangeId, postType: null, limit, offset, postParentType: constant.POST_PARENT.EXCHANGE
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  _onScroll = () => {
    const {offset, activeScrollHeight} = this.state
    const {posts, exchangeId, filterPostsByPostParentLimitOffset} = this.props
    const limit = 100
    const scrollHeight = document.body.scrollHeight
    if (exchangeId
        && posts.length > (limit - 1)
        && (~~(window.innerHeight + window.scrollY) >= (scrollHeight - 500))
        && (scrollHeight > activeScrollHeight)) {
      const newOffset = offset + 100
      this.setState({...this.state, offset: newOffset, activeScrollHeight: scrollHeight, scrollLoading: true},
          () => filterPostsByPostParentLimitOffset({
            postParentId: exchangeId,
            postType: null,
            postParentType: constant.POST_PARENT.EXCHANGE,
            limit,
            offset: newOffset
          })
      )
    }

    if (window.innerWidth > 480) {
      if (window.scrollY > 1000)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    } else {
      if (window.scrollY > 400)
        this.setState({...this.state, scrollButton: true})
      else this.setState({...this.state, scrollButton: false})
    }
  }

  goUp = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  _showCreatePostSmall = () => {
    this.setState({...this.state, showCreatePostSmall: true})
  }

  _hideCreatePostSmall = () => {
    this.setState({...this.state, showCreatePostSmall: false})
  }

  render() {
    const {error, showCreatePostSmall} = this.state
    const {
      actions,
      className,
      exchangeId,
      posts,
      // isLoading
    } = this.props
    const {deletePost, updatePost} = actions
    return (
        <VerifyWrapper isLoading={false} error={error} className={className}>
          {(exchangeId) ? (
              (showCreatePostSmall
                      ? <CreatePostNew
                          postParentId={exchangeId}
                          postParentType={constant.POST_PARENT.EXCHANGE}
                          postsCountInThisPage={posts.length}
                          className='create-post-small'
                          hideCreatePost={this._hideCreatePostSmall}
                      />
                      : <div>
                        <CreatePostNew
                            postParentId={exchangeId}
                            postParentType={constant.POST_PARENT.EXCHANGE}
                            postsCountInThisPage={posts.length}
                        />

                        <FrameCard className="-frameCardPost border-top-0">
                          <ListGroup>
                            {
                              (posts.length > 0) ? (posts.map((post) => (post &&
                                      <Post
                                          posts={posts}
                                          post={post}
                                          key={post.id}
                                          deletePost={deletePost}
                                          updatePost={updatePost}
                                      />
                                  ))) :
                                  <div className="empty-posts">
                                    <DesertIcon width="100%" text="در این پنجره پستی وجود ندارد"/>
                                  </div>
                            }
                            {
                              // TODO mohsen: handle loading scroll and scrolling error
                            }
                          </ListGroup>
                        </FrameCard>
                        {/*button for scroll to top*/}
                        <div className={this.state.scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'}
                             onClick={this.goUp}>
                          <RightArrow className='go-up-logo'/>
                        </div>

                        <div className={this.state.scrollButton ? 'write-post-hide' : 'write-post'}
                             onClick={this._showCreatePostSmall}>
                          <EditIcon className='write-post-logo'/>
                        </div>
                      </div>
              )
          ) : ('')}
        </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const exchangeId = ownProps.exchangeId
  const allPosts = state.common.post.list
  const allExchange = state.exchanges.list
  const exchangePostsIds = (exchangeId && allExchange[exchangeId] && allExchange[exchangeId].posts
      && allExchange[exchangeId].posts.content) || []
  const isLoading = (exchangeId && allExchange[exchangeId] && allExchange[exchangeId].posts
      && allExchange[exchangeId].posts.isLoading) || false
  const posts = exchangePostsIds.map(postId => (allPosts[postId]))
  return {
    posts,
    isLoading
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    filterPostsByPostParentLimitOffset: PostActions.filterPostsByPostParentLimitOffset,
    updatePost: PostActions.updatePost,
    deletePost: PostActions.deletePost,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePosts)