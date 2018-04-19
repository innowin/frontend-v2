/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/exchange/post'
import {VerifyWrapper} from "src/views/common/cards/Frames"
import {PostExchangeView} from "./Views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import HomeCreatePost from "../../../pages/home/CreatPostHome";
import {SupplyIcon, DemandIcon, NoFilterIcon} from "../../../../images/icons";
import {deletePost, updatePost} from "../../../../crud/user/post";
import {getProfile} from "../../../../crud/user/profile";
import {getUser} from "../../../../crud/user/user";
import {getIdentity} from "../../../../crud/identity";
import {getOrganization} from "../../../../crud/organization/organization";
import {PostEditForm} from "../../../user/posts/Forms";
import {PostItemWrapper} from "../../../user/posts/Views";

export class PostExchange extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post || {},
      postUser_username: '',
      postUser_name: '',
      postUser_mediaId: null,
      productPictures: [],
      product: {},
      edit: false,
      error: false,
      isLoading: false,
    };
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateView = (res) => {
    this.setState({...this.state, post: res})
  };

  _update = (formValues, postId) => {
    this.setState({...this.state, isLoading: true});
    return updatePost(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading);
  };

  _delete = () => {
    this.setState({...this.state, isLoading: true});
    return deletePost(this.props.posts, this.props.post, this.props.updatePosts, this._hideEdit, this._handleErrorLoading);
  };

  getProductPictures(productId) {
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/products/pictures/?picture_product=${productId}`,
        result: `product-pictures-get/${productId}`,
        token: TOKEN
      }
    );

    socket.on(`product-pictures-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState)
      } else {
        const newState = {...this.state, productPictures: res, isLoading: false};
        this.setState(newState);
      }
    })
  }

  componentDidMount() {
    const {post_user} = this.props.post;
    const handleResult = (identity) => {
      const userId = identity.identity_user;
      this.setState({...this.state, isLoading: true});
      const organId = identity.identity_organization;
      if (userId) {
        const handleUser = (res) => {
          this.setState({
            ...this.state,
            postUser_username: res.username,
            postUser_name: res.first_name + ' ' + res.last_name
          })
        };
        const handleProfile = (res) => {
          this.setState({...this.state, postUser_mediaId: res.profile_media, isLoading: false})
        };
        getUser(userId, handleUser);
        getProfile(userId, handleProfile);
      }
      if (organId) {
        const handleOrgan = (res) => {
          this.setState({
            ...this.state,
            postUser_username: res.username,
            postUser_name: res.nike_name || res.official_name,
            postUser_mediaId: res.organization_logo,
            isLoading: false
          })
        };
        getOrganization(organId, handleOrgan);
      }
    };
    getIdentity(post_user, handleResult);
  }

  render() {
    const {post, postUser_username, postUser_name, postUser_mediaId, product, productPictures, edit, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {edit ?
          <PostItemWrapper>
            <PostEditForm
              post={post}
              hideEdit={this._hideEdit}
              delete={this._delete}
              update={this._update}
            />
          </PostItemWrapper>
          :
          <PostExchangeView post={post} postUser_username={postUser_username} postUser_name={postUser_name}
                    postUser_mediaId={postUser_mediaId}
                    showEdit={this._showEdit} />
        }
      </VerifyWrapper>
    )
  }
}

class PostsExchange extends Component {

  constructor(props) {
    super(props);
    this.state = {allPosts: [], filteredPosts: [], isLoading: false, error: null};
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updatePosts = (res, type, deletedIndex = null) => {
    const {allPosts} = this.state;
    if (type === 'post') {
      this.setState({...this.state, allPosts: [res, ...allPosts], filteredPosts:[res, ...allPosts]});
      return false;
    }
    if (type === 'del') {
      const remainPosts = allPosts.slice(0, deletedIndex).concat(allPosts.slice(deletedIndex + 1));
      this.setState({...this.state, allPosts: remainPosts, filteredPosts:remainPosts});
    }
  };

  _getExchangePosts = (exchangeId) => {
    this.setState({...this.state, isLoading: true});
    getExchangePosts(exchangeId, (res) => {
      this.setState({...this.state, allPosts: res, filteredPosts: res, isLoading: false})
    })
  };

  _FilterPosts = (e) => {
    const post_type = e.target.getAttribute("data-value");
    const filteredPosts = (post_type === "all") ? (this.state.allPosts) : (
      this.state.allPosts.filter((post) => (post.post_type === post_type))
    );
    this.setState({...this.state, filteredPosts: filteredPosts})
  };

  componentDidMount() {
    this._getExchangePosts(this.props.exchangeId);
  };

  render() {
    const {filteredPosts, isLoading, error} = this.state;
    const posts = [...new Set(filteredPosts)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="postExchangeView">
        <div className="row mb-3">
          <HomeCreatePost updatePosts={this._updatePosts} postParent={this.props.exchangeId}
                          handleErrorLoading={this._handleErrorLoading} className="createPost"/>
          <div className="filterBox">
            <span>فیلتر نمایش:</span>
            <NoFilterIcon height="22px" dataValue="all" onClickFunc={this._FilterPosts}/>
            <i className="fa fa-share-alt ml-2" aria-hidden="true" data-value="post" onClick={this._FilterPosts}/>
            <SupplyIcon height="22px" onClickFunc={this._FilterPosts} dataValue="supply"/>
            <DemandIcon height="22px" onClickFunc={this._FilterPosts} dataValue="demand"/>
          </div>
        </div>
        <div className="row">
          <div className="flex-column col-6 firstDiv">
            {
              posts.map((post, i) => (
                (i % 2 === 0) &&
                <PostExchange
                  posts={posts}
                  post={post}
                  updatePosts={this._updatePosts}
                  key={post.id + "PostsExchangeView-firstDiv"}
                />
              ))
            }
          </div>
          <div className="flex-column col-6 secondDiv">
            {
              posts.map((post, i) => (
                (i % 2 !== 0) &&
                <PostExchange
                  posts={posts}
                  post={post}
                  updatePosts={this._updatePosts}
                  key={post.id + "PostsExchangeView-secondDiv"}
                />
              ))
            }
          </div>
        </div>
      </VerifyWrapper>
    )
  }
}

export default PostsExchange;