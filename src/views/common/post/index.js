/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';

import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames";
import {getIdentity, getIdentityByOrgan, getIdentityByUser} from "src/crud/identity";
import {getOrganization} from "src/crud/organization/organization";
import {getPostsByIdentity, createPost, updatePost, deletePost} from "src/crud/post/post";
import {getProfile} from "src/crud/user/profile";
import {getUser} from "src/crud/user/user";
import {PostCreateForm} from "./Forms";
import {PostEditForm} from './Forms';
import {PostItemWrapper, PostView} from "./View";

export class Post extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    updatePosts: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post || {},
      postIdentity_username: '',
      postIdentity_name: '',
      postIdentity_mediaId: null,
      edit: false,
      error: false,
      isLoading: false
    }
  }

  _showEdit = () => {
    this.setState({edit: true})
  };

  _hideEdit = () => {
    this.setState({edit: false})
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateView = (res) => {
    this.setState({...this.state, post: res})
  };

  _update = (formValues, postId) => {
    this.setState({...this.state, isLoading: true},() =>
    updatePost(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading))
  };

  _delete = () => {
    this.setState({...this.state, isLoading: true},() =>
      deletePost(this.props.posts, this.props.post, this.props.updatePosts, this._hideEdit, this._handleErrorLoading))
  };

  _getIdentityDetails = (identityId) => {
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
    getIdentity(identityId, handleResult)
  };

  componentDidMount() {
    const {post_identity} = this.props.post;
    this._getIdentityDetails(post_identity)
  }

  render() {
    const {post, postIdentity_username, postIdentity_name, postIdentity_mediaId, edit, isLoading, error} = this.state;
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

class Posts extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    identityType: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {posts: [], postIdentity: null, createForm: false, isLoading: true, error: null}
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _showCreateForm = () => {
    this.setState({createForm: true})
  };

  _hideCreateForm = () => {
    this.setState({createForm: false})
  };

  _create = (formValues) => {
    this.setState({...this.state, isLoading: true});
    createPost(formValues, this._updatePosts, this._handleErrorLoading, this._hideCreateForm)
  };

  _updatePosts = (res, type, deletedIndex = null) => {
    const {posts} = this.state;
    if (type === 'get' && Array.isArray(res)) {
      this.setState({...this.state, posts: [...posts, ...res]});
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

  _getPosts = (id, identityType) => {
    const callBack = (res) => (getPostsByIdentity(res.id, this._updatePosts, this._handleErrorLoading));
    if (identityType === 'user') {
      getIdentityByUser(id, (res) => (this.setState({...this.state, postIdentity: res.id}, callBack(res))))
    }
    if (identityType === 'organization') {
      getIdentityByOrgan(id, (res) => (this.setState({...this.state, postIdentity: res.id}, callBack(res))))
    }
  };

  componentDidMount() {
    const {id, identityType} = this.props;
    this._getPosts(id, identityType)
  }

  render() {
    const {postIdentity, createForm, isLoading, error} = this.state;
    const posts = [...new Set(this.state.posts)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Post')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardPost">

          <ListGroup>
            {
              createForm &&
              <PostItemWrapper>
                <PostCreateForm hideCreateForm={this._hideCreateForm} create={this._create}
                                postIdentity={postIdentity}/>
              </PostItemWrapper>
            }
            {
              posts.map((post) => (
                <Post
                  posts={posts}
                  post={post}
                  updatePosts={this._updatePosts}
                  key={post.id + "Posts"}
                />
              ))
            }
          </ListGroup>

        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Posts;