/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/post/post'
import {VerifyWrapper} from "src/views/common/cards/Frames"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import HomeCreatePost from "../../../pages/home/CreatPostHome";
import {SupplyIcon, DemandIcon, NoFilterIcon} from "../../../../images/icons";
import {deletePost, updatePost} from "src/crud/post/post";
import {getProfile} from "../../../../crud/user/profile";
import {getUser} from "../../../../crud/user/user";
import {getIdentity} from "../../../../crud/identity";
import {getOrganization} from "../../../../crud/organization/organization";
import {PostEditForm} from "src/views/common/post/Forms";
import {PostItemWrapper, PostView} from "src/views/common/post/View";
import Masonry from "react-masonry-css"
import cx from 'classnames'

export class ExchangePost extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post || {},
      postIdentity_username: '',
      postIdentity_name: '',
      postIdentity_mediaId: null,
      productPictures: [],
      product: {},
      edit: false,
      error: false,
      isLoading: true,
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
    this.setState({...this.state, isLoading: true}, () =>
      updatePost(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading));
  };

  _delete = () => {
    this.setState({...this.state, isLoading: true}, () =>
      deletePost(this.props.posts, this.props.post, this.props.updatePosts, this._hideEdit, this._handleErrorLoading))
  };

  _getIdentityDetails = (post_identity) => {
    const handleResult = (identityId) => {
      const userId = identityId.identity_user;
      const organId = identityId.identity_organization;
      if (userId) {
        getUser(userId, (res) =>
          this.setState({
              ...this.state,
              postIdentity_username: res.username,
              postIdentity_name: res.first_name + ' ' + res.last_name
            }
          ));
        getProfile(userId, (res) => {
          this.setState({
            ...this.state,
            postIdentity_mediaId: res.profile_media,
            isLoading: false
          })
        });
      }
      if (organId) {
        getOrganization(organId, (res) => {
          this.setState({
            ...this.state,
            postIdentity_username: res.username,
            postIdentity_name: res.nike_name || res.official_name,
            postIdentity_mediaId: res.organization_logo,
            isLoading: false
          })
        });
      }
    };
    getIdentity(post_identity, handleResult)
  };

  _getIdentityDetails = (post_identity) => {
    this.setState({...this.state, isLoading: true});
    const handleResult = (identityId) => {
      const userId = identityId.identity_user;
      const organId = identityId.identity_organization;
      if (userId) {
        getUser(userId, (res) =>
          this.setState({
              ...this.state,
              postIdentity_username: res.username,
              postIdentity_name: res.first_name + ' ' + res.last_name
            }
          ));
        getProfile(userId, (res) => {
          this.setState({...this.state,
            postIdentity_mediaId: res.profile_media,
            isLoading: false})
        });
      }
      if (organId) {
        getOrganization(organId, (res) => {
          this.setState({
            ...this.state,
            postIdentity_username: res.username,
            postIdentity_name: res.nike_name || res.official_name,
            postIdentity_mediaId: res.organization_logo,
            isLoading: false
          })
        });
      }
    };
    getIdentity(post_identity, handleResult)
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
    const {post_identity} = this.props.post;
    this._getIdentityDetails(post_identity)
  }

  render() {
    const {post, postIdentity_username, postIdentity_name, postIdentity_mediaId, product, productPictures, edit, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        {edit ?
          <PostItemWrapper>
            <PostEditForm
              post={post}
              hideEdit={this._hideEdit}
              deleteFunc={this._delete}
              updateFunc={this._update}
            />
          </PostItemWrapper>
          :
          <PostView post={post} postIdentityUsername={postIdentity_username} postIdentityName={postIdentity_name}
                    postIdentityMediaId={postIdentity_mediaId}
                    showEdit={this._showEdit}/>
        }
      </VerifyWrapper>
    )
  }
}

class ExchangePosts extends Component {
  static propTypes = {
    exchangeId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {allPosts: [], filteredPosts: [], filterType: 'all', isLoading: true, error: null};
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updatePosts = (res, type, deletedIndex = null) => {
    const {allPosts} = this.state;
    if (type === 'get' && Array.isArray(res)) {
      this.setState({...this.state, allPosts: res, filteredPosts: res},
        () => this._handleErrorLoading());
      return false;
    }
    if (type === 'post') {
      this.setState({...this.state, allPosts: [res, ...allPosts], filteredPosts: [res, ...allPosts]});
      return false;
    }
    if (type === 'del') {
      const remainPosts = allPosts.slice(0, deletedIndex).concat(allPosts.slice(deletedIndex + 1));
      this.setState({...this.state, allPosts: remainPosts, filteredPosts: remainPosts});
    }
  };

  _getExchangePosts = (exchangeId) => {
    this.setState({...this.state, isLoading: true});
    getExchangePosts(exchangeId, this._updatePosts, this._handleErrorLoading)
  };

  _FilterPosts = (e) => {
    const filterType = e.target.getAttribute("data-value");
    const filteredPosts = (filterType === "all") ? (this.state.allPosts) : (
      this.state.allPosts.filter((post) => (post.post_type === filterType))
    );
    this.setState({...this.state, filteredPosts: filteredPosts, filterType: filterType})
  };

  componentDidMount() {
    this._getExchangePosts(this.props.exchangeId);
  };

  render() {
    const {filteredPosts, filterType, isLoading, error} = this.state;
    const posts = [...new Set(filteredPosts)];
    const {exchangeId} = this.props;
    const breakpointColumnsObj = {
      default: 3,
      1140: 2,
      720: 1,
    };
    // TODO mohsen: choice postIdentity from client
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="postExchangeView">
        <div className="row mb-3">
          <HomeCreatePost updatePosts={this._updatePosts} postParent={exchangeId} postIdentity={8}
                          handleErrorLoading={this._handleErrorLoading} className="createPost"/>
          <div className="filterBox">
            <span>فیلتر نمایش:</span>
            <NoFilterIcon height="22px" dataValue="all" onClickFunc={this._FilterPosts}/>
            <i className="fa fa-share-alt ml-2" aria-hidden="true" data-value="post" onClick={this._FilterPosts}/>
            <SupplyIcon height="22px" onClickFunc={this._FilterPosts} dataValue="supply"/>
            <DemandIcon height="22px" onClickFunc={this._FilterPosts} dataValue="demand"/>
          </div>
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
      </VerifyWrapper>
    )
  }
}

export default ExchangePosts;