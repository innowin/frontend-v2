import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/user/post'
import {FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {Post} from "../../user/posts"
import {getExchangeIdentities} from "../../../crud/exchange/exchange";
import HomeCreatePost from "./CreatPostHome";


class HomePosts extends Component {

  static propTypes = {
    exchangeId: PropTypes.number.isRequired,
    identity: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      createForm: false, edit: false, isLoading: false, error: null, posts: [], user: {}, profile: {},
      exchangeId: this.props.exchangeId
    };
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updatePosts = (res, type, deletedIndex = null) => {
    const {posts} = this.state;
    if (type === 'get') {
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

  _getExchangePosts = (exchangeId) => {
    this.setState({...this.state, isLoading: true});
    getExchangePosts(exchangeId, this._updatePosts, this._handleErrorLoading);
  };


  _getFirstExchangeId = (identity) => {
    const _handleResult = (res) => {
      if (res) {
        const exchangeId = res[0].exchange_identity_related_exchange.id;
        this.setState({...this.state, exchangeId});
        this._getExchangePosts(exchangeId);
      }
    };
    getExchangeIdentities(identity, _handleResult);
  };

  componentDidMount() {
    this._getFirstExchangeId(this.props.identity);
  }

  componentWillReceiveProps(nextProps) {
    let {exchangeId} = nextProps;
    if (exchangeId) {
      this.setState({...this.state, exchangeId});
      this._getExchangePosts(exchangeId);
    }
  }

  componentWillUnmount() {
    // TODO mohsen: complete by socket.off of update and delete requests
  }

  render() {
    const {isLoading, error, exchangeId} = this.state;
    console.log("exchangeId", exchangeId);
    const posts = [...new Set(this.state.posts)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <HomeCreatePost updatePosts={this._updatePosts} postParent={exchangeId}
                        handleErrorLoading={this._handleErrorLoading}/>
        <FrameCard className="-frameCardPost border-top-0">
          <ListGroup>
            {
              (posts.length > 0) ? (posts.map((post) => (
                <Post
                  posts={posts}
                  post={post}
                  updatePosts={this._updatePosts}
                  key={post.id}
                />
              ))) : (<h1 className="mt-5 red">در این بورس پستی وجود ندارد!</h1>)
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default HomePosts;