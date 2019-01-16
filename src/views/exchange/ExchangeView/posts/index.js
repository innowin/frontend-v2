import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/post/exchangePost'
import {VerifyWrapper} from "src/views/common/cards/Frames"
import {SupplyIcon, DemandIcon, NoFilterIcon} from "../../../../images/icons"
import {deletePost, updatePost} from "src/crud/post/post"
import {getProfile} from "../../../../crud/user/profile"
import PostEditForm from "src/views/common/post/PostEditForm"
import {ExchangePostView} from "src/views/exchange/ExchangeView/posts/Views"
import Masonry from "react-masonry-css"
import cx from 'classnames'
import {getFile} from "../../../../crud/media/media"

export class ExchangePost extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      post: this.props.post || {},
      postIdentity_name: '',
      postIdentity_mediaId: null,
      productPictures: [],
      product: {},
      edit: false,
      error: false,
      isLoading: true,
    }
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updateView = (res) => {
    this.setState({...this.state, post: res})
  }

  _update = (formValues, postId) => {
    this.setState({...this.state, isLoading: true}, () =>
      updatePost(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading))
  }

  _delete = () => {
    this.setState({...this.state, isLoading: true}, () =>
      deletePost(this.props.posts, this.props.post, this.props.updatePosts, this._hideEdit, this._handleErrorLoading))
  }

  _getIdentityDetails = (post_identity) => {
      const user = post_identity.identity_user
      const organization = post_identity.identity_organization
      if (user){
        this.setState({
          ...this.state,
          postIdentity_name: user.first_name + ' ' + user.last_name
        })
        getProfile(user.id, (res) => {
          // TODO mohsen: handle error for getProfile
          if (res.profile_media) {
            getFile(res.profile_media, (res) =>
              this.setState({...this.state, postIdentity_mediaId: res.file})
            )
          }
          this.setState({...this.state, isLoading: false})
        })
      }
      if (organization) {
        this.setState({
          ...this.state,
          postIdentity_name: organization.nike_name || organization.official_name,
          postIdentity_mediaId: organization.organization_logo,
          isLoading: false
        })
      }
  }

  componentDidMount() {
    const {post_identity} = this.props.post
    this._getIdentityDetails(post_identity)
  }

  render() {
    const {post, postIdentity_name, postIdentity_mediaId, edit, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {edit ?
          <div className="-itemWrapperPost">
            <PostEditForm
              post={post}
              hideEdit={this._hideEdit}
              deleteFunc={this._delete}
              updateFunc={this._update}
            />
          </div>
          :
          <ExchangePostView post={post}
                            postIdentityName={postIdentity_name}
                            postIdentityMediaId={postIdentity_mediaId}
          />
        }
      </VerifyWrapper>
    )
  }
}

const ExchangeFilterPosts = (props) => {
  const {postType, _onClick} = props
  return (
    <div className="filterBox">
      <span>فیلتر نمایش:</span>
      <NoFilterIcon className={cx("ml-1", {'clicked': postType === null})} height="22px" onClickFunc={_onClick}/>
      <i className={cx("fa fa-share-alt ml-2 pt-1", {'clicked': postType === "post"})} aria-hidden="true"
         data-value="post" onClick={_onClick}/>
      <SupplyIcon height="22px" onClickFunc={_onClick} dataValue="supply"
                  className={cx("ml-2", {'clicked': postType === "supply"})}/>
      <DemandIcon height="24px" onClickFunc={_onClick} dataValue="demand"
                  className={cx({'clicked': postType === "demand"})}/>
    </div>
  )
}


class ExchangePosts extends Component {
  static propTypes = {
    exchangeId: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      postType: null,
      offset: 0,
      activeScrollHeight: 0,
      isLoading: true,
      error: null,
      scrollLoading: false,
      scrollError: null
    }
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updatePosts = (res, type) => {
    const {posts} = this.state
    if (type === 'get' && Array.isArray(res)) {
      this.setState({...this.state, posts: res})
      return false
    }
    if (type === 'post') {
      this.setState({...this.state, posts: [res, ...posts]})
      return false
    }
  }

  _FilterPosts = (e) => {
    const {exchangeId} = this.props
    const limit = 100
    const offset = 0
    const postType = e.target.getAttribute("data-value")
    if (postType !== this.state.postType) {
      this.setState({...this.state, postType: postType}, () =>
        getExchangePosts(exchangeId, postType, limit, offset, this._updatePosts, this._handleErrorLoading))
    }
  }

  _onScroll = () => {
    const {posts, postType, offset, activeScrollHeight} = this.state
    const {exchangeId} = this.props
    const limit = 100
    const scrollHeight = document.body.scrollHeight
    if (posts.length > (limit - 1)
      && (~~(window.innerHeight + window.scrollY) >= (scrollHeight - 500))
      && (scrollHeight > activeScrollHeight)) {
      const newOffset = offset + 100
      const scrollErrorLoading = (error = null) => (
        this.setState({...this.state, scrollLoading: false, scrollError: error})
      )
      const addToPosts = (res, type) => {
        const newPosts = [...posts, ...res]
        this.setState({...this.state, posts: newPosts})
      }
      this.setState({...this.state, offset: newOffset, activeScrollHeight: scrollHeight, scrollLoading: true},
        () => getExchangePosts(exchangeId, postType, limit, newOffset, addToPosts, scrollErrorLoading)
      )
    }
  }


  componentDidMount() {
    const {exchangeId} = this.props
    const limit = 100
    const offset = 0
    this.setState({...this.state, isLoading: true}, () =>
      getExchangePosts(exchangeId, null, limit, offset, this._updatePosts, this._handleErrorLoading))
    window.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  render() {
    const {postType, isLoading, error, scrollLoading, scrollError} = this.state
    const posts = [...new Set(this.state.posts)]
    const {exchangeId} = this.props
    const breakpointColumnsObj = {
      default: 3,
      1140: 2,
      720: 1,
    }
    // TODO mohsen: choice postIdentity from client
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-exchangePosts">
        <div className="row mb-3">
          {/*<CreatePostNew*/}
              {/*postParentId={exchangeId}*/}
              {/*postParentType={constant.POST_PARENT.EXCHANGE}*/}
              {/*postsCountInThisPage={posts.length}*/}
              {/*className="createPost"*/}
          {/*/>*/}
          <ExchangeFilterPosts _onClick={this._FilterPosts} postType={postType}/>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            posts.map((post) => (
              <ExchangePost
                posts={posts}
                post={post}
                updatePosts={this._updatePosts}
                key={post.id + "ExchangePostsView-Masonry"}
              />
            ))
          }
        </Masonry>
        {
          (scrollLoading || scrollError) ? (
            <VerifyWrapper isLoading={scrollLoading} error={scrollError}/>
          ) : ('')
        }
      </VerifyWrapper>
    )
  }
}

export default ExchangePosts