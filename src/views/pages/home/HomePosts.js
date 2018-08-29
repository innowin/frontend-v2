import React, {Component} from "react"
import PropTypes from 'prop-types'
import {FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {Post} from "src/views/common/post/index"
import HomeCreatePost from "./CreatPostHome"
import {IDENTITY_ID} from "../../../consts/data"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import PostActions from "src/redux/actions/commonActions/postActions"


class HomePosts extends Component {

  static propTypes = {
    exchangeId: PropTypes.number,
    className: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      offset: 0,
      activeScrollHeight: 0,
      isLoading: false,
      error: null,
      scrollLoading: false,
      scrollError: null,
    }
  }

  // _onScroll = () => {
  //   const {offset, activeScrollHeight} = this.state
  //   const {posts, exchangeId} = this.props
  //   const limit = 100
  //   const scrollHeight = document.body.scrollHeight
  //   if (exchangeId
  //     && posts.length > (limit - 1)
  //     && (~~(window.innerHeight + window.scrollY) >= (scrollHeight - 500))
  //     && (scrollHeight > activeScrollHeight)) {
  //     const newOffset = offset + 100
  //     const scrollErrorLoading = (error = null) => (
  //       this.setState({...this.state, scrollLoading: false, scrollError: error})
  //     )
  //     const addToPosts = (res, type) => {
  //       const newPosts = [...posts, ...res]
  //       this.setState({...this.state, posts: newPosts})
  //     }
  //     this.setState({...this.state, offset: newOffset, activeScrollHeight: scrollHeight, scrollLoading: true},
  //       () => getExchangePosts(exchangeId, null, limit, newOffset, addToPosts, scrollErrorLoading)
  //     )
  //   }
  // }

  componentDidUpdate(nextProps) {
    const {actions, exchangeId} = this.props
    const {filterPostsByPostParentLimitOffset} = actions
    const limit = 100
    const offset = 0
    if (exchangeId && exchangeId !== nextProps.exchangeId) {
      filterPostsByPostParentLimitOffset({parentId: exchangeId, postType: null, limit, offset})
    }
  }

  // componentDidMount() {
  //   window.addEventListener('scroll', this._onScroll)
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this._onScroll)
  // }

  render() {
    const {isLoading, error, scrollLoading, scrollError} = this.state
    const {posts, exchangeId, className, actions} = this.props
    const {deletePost, updatePost} = actions
    // TODO mohsen: choice postIdentity from client
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className={className}>
        {(exchangeId) ? (
          <div>
            <HomeCreatePost
              postParent={exchangeId} postIdentity={+IDENTITY_ID}
              handleErrorLoading={this._handleErrorLoading}
            />
            <FrameCard className="-frameCardPost border-top-0">
              <ListGroup>
                {
                  (posts.length > 0) ? (posts.map((post) => (
                    <Post
                      posts={posts}
                      post={post}
                      key={post.id + "HomePosts"}
                      deletePost={deletePost}
                      updatePost={updatePost}
                    />
                  ))) : (<h1 className="mt-5">در این بورس پستی وجود ندارد!</h1>)
                }
                {
                  (scrollLoading || scrollError) ? (
                    <VerifyWrapper isLoading={scrollLoading} error={scrollError}/>
                  ) : ('')
                }
              </ListGroup>
            </FrameCard>
          </div>
        ) : ('')}
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const exchangeId = ownProps.exchangeId
  const allPosts = state.common.post.list
  const exchangeIdPosts = (exchangeId && state.exchanges[exchangeId] && state.exchanges[exchangeId].posts
    && state.exchanges[exchangeId].posts.content) ||[]
  const posts = exchangeIdPosts.map(postId => (allPosts[postId]))
  return {posts}
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    filterPostsByPostParentLimitOffset: PostActions.filterPostsByPostParentLimitOffset,
    updatePost: PostActions.updatePost,
    deletePost: PostActions.deletePost,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePosts)