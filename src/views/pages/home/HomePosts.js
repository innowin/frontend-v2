import React, {Component} from "react"
import PropTypes from 'prop-types'
import {FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {Post} from "src/views/common/post/Post"
import HomeCreatePost from "./CreatPostHome"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import PostActions from "src/redux/actions/commonActions/postActions"
import constant from "src/consts/constants"
import CreatePostNew from "../../common/post/CreatePostNew"


class HomePosts extends Component {

  static propTypes = {
    exchangeId: PropTypes.number,
    className: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      offset: 0,
      activeScrollHeight: 0
    }
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
  }

  componentDidUpdate(prevProps) {
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

  componentDidMount() {
    window.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  render() {
    const {isLoading, error} = this.state
    const {client, posts, exchangeId, className, actions} = this.props
    const {clientId, clientImgId, clientIdentity, clientType} = client
    const {deletePost, updatePost} = actions
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className={className}>
        {(exchangeId) ? (
          <div>
            <HomeCreatePost
              postIdentityId={clientIdentity.id}
              postOwnerId={clientId}
              postOwnerType={clientType}
              postOwnerImgId={clientImgId}
              postParentId={exchangeId}
              postParentType={constant.POST_PARENT.EXCHANGE}
              handleErrorLoading={this._handleErrorLoading}
              postsCountInThisPage={posts.length}
            />
            {/*<CreatePostNew/>*/}
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
                  // TODO mohsen: handle loading scroll and scrolling error
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
  const client = state.auth.client
  const {identity, profile, organization, user_type} = client
  const allIdentities = state.identities.list
  const clientIdentityId = identity.content
  const clientIdentity = (clientIdentityId && allIdentities[clientIdentityId]) ? allIdentities[clientIdentityId] : {}
  const clientId = (client.organization && client.organization.id) ||  (client.user && client.user.id)
  const clientImgId = (user_type === 'person') ? (profile.profile_media):(
    (organization && organization.organization_logo) || null
  )
  const exchangeId = ownProps.exchangeId
  const allPosts = state.common.post.list
  const allExchange = state.exchanges.list
  const exchangePostsIds = (exchangeId && allExchange[exchangeId] && allExchange[exchangeId].posts
    && allExchange[exchangeId].posts.content) || []
  const posts = exchangePostsIds.map(postId => (allPosts[postId]))
  return {
    client:{
      clientId,
      clientImgId,
      clientType: user_type,
      clientIdentity
    },
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