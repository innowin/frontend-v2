import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/post'
import {FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {Post} from "src/views/common/post/index"
import {getExchangeIdentities} from "../../../crud/exchange/exchange";
import HomeCreatePost from "./CreatPostHome";
import {Link} from "react-router-dom"


class HomePosts extends Component {

  static propTypes = {
    exchangeId: PropTypes.number,
    identityId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {posts: [], exchangeId: this.props.exchangeId, isLoading: false, error: null}
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updatePosts = (res, type, deletedIndex = null) => {
      const {posts} = this.state;
      if (type === 'get' && Array.isArray(res)) {
        this.setState({...this.state, posts: [...res]});
        return false;
      }
      if (type === 'post') {
        this.setState({...this.state, posts: [res, ...posts]});
        return false;
      }
      if (type === 'del') {
        const remainPosts = posts.slice(0, deletedIndex).concat(posts.slice(deletedIndex + 1));
        this.setState({...this.state, posts: remainPosts});
      }
  };

  _getFirstExchangeId = (identityId) => {
    const _handleResult = (res) => {
      if (res.length > 0) {
        const exchangeId = res[0].exchange_identity_related_exchange.id;
        this.setState({...this.state, exchangeId, isLoading: true},
          () => (getExchangePosts(exchangeId, this._updatePosts, this._handleErrorLoading)))
      }
    };
    getExchangeIdentities(identityId, _handleResult);
  };

  componentDidMount() {
    this._getFirstExchangeId(this.props.identityId);
  }

  componentWillReceiveProps(nextProps) {
    let {exchangeId} = nextProps;
    if (exchangeId) {
      this.setState({...this.state, exchangeId},
        () => (getExchangePosts(exchangeId, this._updatePosts, this._handleErrorLoading)))
    }
  }

  render() {
    const {isLoading, error, exchangeId} = this.state;
    const posts = [...new Set(this.state.posts)];
    // TODO mohsen: choice postIdentity from client
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {(exchangeId) ? (
          <div>
            <div>
              <Link to={"/exchange/" + exchangeId} className="mr-3">صفحه بورس</Link>
            </div>
            <HomeCreatePost updatePosts={this._updatePosts} postParent={exchangeId} postIdentity={8}
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
                  ))) : (<h1 className="mt-5 red">در این بورس پستی وجود ندارد!</h1>)
                }
              </ListGroup>
            </FrameCard>
          </div>
        ) : ('')}
      </VerifyWrapper>
    )
  }
}

export default HomePosts;