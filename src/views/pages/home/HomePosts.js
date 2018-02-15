/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts, createPost} from 'src/crud/user/post'
import {FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {Post} from "../../user/posts"
import {getExchanges} from "../../../crud/exchange/exchange";


class HomePosts extends Component {

  static propTypes = {
    exchangeId: PropTypes.number.isRequired,
    identity: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null, posts: [], user: {}, profile: {}};
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

  _create = (formValues) => {
    this.setState({...this.state, isLoading: true});
    createPost(formValues, this._updatePosts, this._handleErrorLoading, this._hideCreateForm);
  };

  _getFirstExchangeId = (identity) => {
    const _handleResult = (res) => {
      if (res) {
        this._getExchangePosts(res[0].id);
      }
    };
    getExchanges(identity, _handleResult);
  };

  componentDidMount() {
    this._getFirstExchangeId(this.props.identity);
  }

  componentWillReceiveProps() {
    const {exchangeId} = this.props;
    if (exchangeId) {
      this._getExchangePosts(exchangeId);
    }
  }

  componentWillUnmount() {
    // TODO mohsen: complete by socket.off of update and delete requests
  }

  render() {
    const {isLoading, error} = this.state;
    const posts = [...new Set(this.state.posts)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <h1>this is create post</h1>
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