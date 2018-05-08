/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getExchangePosts} from 'src/crud/post/post'
import {VerifyWrapper} from "src/views/common/cards/Frames"
import HomeCreatePost from "../../../pages/home/CreatPostHome";
import {SupplyIcon, DemandIcon, NoFilterIcon} from "../../../../images/icons";
import {deletePost, updatePost} from "src/crud/post/post";
import {getProfile} from "../../../../crud/user/profile";
import {getUser} from "../../../../crud/user/user";
import {getIdentity} from "../../../../crud/identity";
import {getOrganization} from "../../../../crud/organization/organization";
import {PostEditForm} from "src/views/common/post/Forms";
import {ExchangePostView} from "src/views/exchange/ExchangeView/posts/Views";
import Masonry from "react-masonry-css"
import cx from 'classnames'
import {PostItemWrapper} from "../../../common/post/View";
import {IDENTITY_ID} from "../../../../consts/data";

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
      postIdentity_name: '',
      postIdentity_mediaId: null,
      productPictures: [],
      product: {},
      edit: false,
      error: false,
      isLoading: true,
    };
  }

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
    const handleResult = (identity) => {
      const userId = identity.identity_user;
      const organId = identity.identity_organization;
      if (userId) {
        getUser(userId, (res) =>
          this.setState({
              ...this.state,
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
            postIdentity_name: res.nike_name || res.official_name,
            postIdentity_mediaId: res.organization_logo,
            isLoading: false
          })
        });
      }
    };
    getIdentity(post_identity, handleResult)
  };

  componentDidMount() {
    const {post_identity} = this.props.post;
    this._getIdentityDetails(post_identity)
  }

  render() {
    const {post, postIdentity_name, postIdentity_mediaId, edit, isLoading, error} = this.state;
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
  const {filterType, _onClick} = props;
  return (
    <div className="filterBox">
      <span>فیلتر نمایش:</span>
      <NoFilterIcon className={cx("ml-1", {clicked: filterType === "all"})} height="22px" dataValue="all"
                    onClickFunc={_onClick}/>
      <i className={cx("fa fa-share-alt ml-2 pt-1", {clicked: filterType === "post"})} aria-hidden="true"
         data-value="post" onClick={_onClick}/>
      <SupplyIcon height="22px" onClickFunc={_onClick} dataValue="supply"
                  className={cx("ml-2", {clicked: filterType === "supply"})}/>
      <DemandIcon height="24px" onClickFunc={_onClick} dataValue="demand"
                  className={cx({clicked: filterType === "demand"})}/>
    </div>
  )
};


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
      <VerifyWrapper isLoading={isLoading} error={error} className="-exchangePosts">
        <div className="row mb-3">
          <HomeCreatePost updatePosts={this._updatePosts} postParent={exchangeId} postIdentity={+IDENTITY_ID}
                          handleErrorLoading={this._handleErrorLoading} className="createPost"/>
          <ExchangeFilterPosts _onClick={this._FilterPosts} filterType={filterType}/>
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