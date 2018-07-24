import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/post/exchangePost'
import {FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {Post} from "src/views/common/post/index"
import HomeCreatePost from "./CreatPostHome"
import {IDENTITY_ID} from "../../../consts/data"


class HomePosts extends Component {

  static propTypes = {
    exchangeId: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      offset: 0,
      activeScrollHeight: 0,
      exchangeId: null,
      isLoading: false,
      error: null,
      scrollLoading: false,
      scrollError: null,
    }
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _updatePosts = (res, type, deletedIndex = null) => {
    const {posts} = this.state
    if (type === 'get' && Array.isArray(res)) {
      this.setState({...this.state, posts: [...res]})
      return false
    }
    if (type === 'post') {
      this.setState({...this.state, posts: [res, ...posts]})
      return false
    }
    if (type === 'del' && deletedIndex) {
      const remainPosts = posts.slice(0, deletedIndex).concat(posts.slice(deletedIndex + 1))
      this.setState({...this.state, posts: remainPosts})
    }
  }


  _onScroll = () => {
    const {posts, exchangeId, offset, activeScrollHeight} = this.state
    const limit = 100
    const scrollHeight = document.body.scrollHeight
    if (exchangeId
      && posts.length > (limit - 1)
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
        () => getExchangePosts(exchangeId, null, limit, newOffset, addToPosts, scrollErrorLoading)
      )
    }
  }

  componentDidMount() {
    const {exchangeId} = this.props
    const limit = 100
    const offset = 0
    this.setState({...this.state, exchangeId, isLoading: true},
      () => (getExchangePosts(exchangeId, null, limit, offset, this._updatePosts, this._handleErrorLoading)))
    window.addEventListener('scroll', this._onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  componentWillReceiveProps(nextProps) {
    let {exchangeId} = nextProps
    const limit = 100
    const offset = 0
    if (exchangeId) {
      this.setState({...this.state, exchangeId},
        () => (getExchangePosts(exchangeId, null, limit, offset, this._updatePosts, this._handleErrorLoading)))
    }
  }

  render() {
    const {isLoading, error, exchangeId, scrollLoading, scrollError} = this.state
    const posts = [...new Set(this.state.posts)]
    // TODO mohsen: choice postIdentity from client
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {(exchangeId) ? (
          <div>
            <HomeCreatePost updatePosts={this._updatePosts} postParent={exchangeId} postIdentity={+IDENTITY_ID}
                            handleErrorLoading={this._handleErrorLoading}/>
            <FrameCard className="-frameCardPost border-top-0">
              <ListGroup>
                {
                  (posts.length > 0) ? (posts.map((post) => (
                    <Post
                      posts={posts}
                      post={post}
                      updatePosts={this._updatePosts}
                      key={post.id + "HomePosts"}
                    />
                  ))) : (<h1 className="mt-5">در این بورس پستی وجود ندارد!</h1>)
                }
                {
                  (scrollLoading || scrollError)?(
                    <VerifyWrapper isLoading={scrollLoading} error={scrollError} />
                  ):('')
                }
              </ListGroup>
            </FrameCard>
          </div>
        ) : ('')}
      </VerifyWrapper>
    )
  }
}

export default HomePosts