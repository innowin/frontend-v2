import React, {PureComponent} from "react"
import PropTypes from "prop-types"
import {FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {Post} from "src/views/common/post/Post"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import PostActions from "src/redux/actions/commonActions/postActions"
import constant from "src/consts/constants"
import CreatePostNew from "../../common/post/createPost/index"
import RightArrowSvg from "../../../images/common/right_arrow_svg"


class HomePosts extends PureComponent
{

  static propTypes = {
    exchangeId: PropTypes.number,
    className: PropTypes.string
  }

  constructor(props)
  {
    super(props)
    this.state = {
      offset: 0,
      activeScrollHeight: 0,
      scrollButton: false
    }
  }

  _onScroll = () =>
  {
    const {offset, activeScrollHeight} = this.state
    const {posts, exchangeId, filterPostsByPostParentLimitOffset} = this.props
    const limit = 100
    const scrollHeight = document.body.scrollHeight
    if (exchangeId
        && posts.length > (limit - 1)
        && (~~(window.innerHeight + window.scrollY) >= (scrollHeight - 500))
        && (scrollHeight > activeScrollHeight))
    {
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

    if (window.scrollY > 1000)
      this.setState({...this.state, scrollButton: true})
    else this.setState({...this.state, scrollButton: false})

  }

  componentDidUpdate(prevProps)
  {
    const {actions, exchangeId} = this.props
    const {filterPostsByPostParentLimitOffset} = actions
    const limit = 100
    const offset = 0
    if (exchangeId && exchangeId !== prevProps.exchangeId)
    {
      filterPostsByPostParentLimitOffset({
        postParentId: exchangeId, postType: null, limit, offset, postParentType: constant.POST_PARENT.EXCHANGE
      })
    }
  }

  componentDidMount()
  {
    window.addEventListener("scroll", this._onScroll)
  }

  componentWillUnmount()
  {
    window.removeEventListener("scroll", this._onScroll)
  }

  goUp = () =>
  {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }

  render()
  {
    const {isLoading, error} = this.state
    const {posts, exchangeId, className, actions} = this.props
    const {deletePost, updatePost} = actions
    console.log(posts, 'ppppppppppp')
    return (
        <VerifyWrapper isLoading={isLoading} error={error} className={className}>
          {(exchangeId) ? (
              <div>
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
                      ))) : (<div className="empty-posts">در این پنجره پستی وجود ندارد!</div>)
                    }
                    {
                      // TODO mohsen: handle loading scroll and scrolling error
                    }
                  </ListGroup>
                </FrameCard>
                {/*button for scroll to top*/}
                <div className={this.state.scrollButton ? 'go-up-logo-cont' : 'go-up-logo-cont-hide'} onClick={this.goUp}>
                  <RightArrowSvg className='go-up-logo'/>
                </div>
              </div>
          ) : ("")}
        </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) =>
{
  const exchangeId = ownProps.exchangeId
  const allPosts = state.common.post.list
  const allExchange = state.exchanges.list
  const exchangePostsIds = (exchangeId && allExchange[exchangeId] && allExchange[exchangeId].posts
      && allExchange[exchangeId].posts.content) || []
  const posts = exchangePostsIds.map(postId => (allPosts[postId]))
  return {
    posts
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