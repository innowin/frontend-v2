/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getUserPosts, createPost, deletePost, updatePost} from 'src/crud/user/post'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {PostCreateForm} from "./Forms"
import {PostEditForm} from './Forms'
import {PostItemWrapper, PostView} from "./Views"
import {SOCKET as socket} from "src/consts/URLS"
import {getIdentity} from "../../../crud/identity";
import {getUser} from "../../../crud/user/user";
import {getProfile} from "../../../crud/user/profile";
import {getOrganization} from "../../../crud/organization/organization";

export class Post extends Component {

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
    this.setState({...this.state, isLoading: true});
    return updatePost(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading);
  };

  _delete = () => {
    this.setState({...this.state, isLoading: true});
    return deletePost(this.props.posts, this.props.post, this.props.updatePosts, this._hideEdit, this._handleErrorLoading);
  };

  componentDidMount() {
    // TODO mohsen: handle get userId or organId from post
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
    const {post, isLoading, error, postUser_username, postUser_name, postUser_mediaId} = this.state;
    return (
      this.state.edit ?
        <VerifyWrapper isLoading={isLoading} error={error}>
          <PostItemWrapper>
            <PostEditForm
              post={post}
              hideEdit={this._hideEdit}
              delete={this._delete}
              update={this._update}
            />
          </PostItemWrapper>
        </VerifyWrapper>
        :
        <VerifyWrapper isLoading={isLoading} error={error}>
          <PostView post={post} postUser_username={postUser_username} postUser_name={postUser_name}
                    postUser_mediaId={postUser_mediaId}
                    showEdit={this._showEdit}/>
        </VerifyWrapper>
    )
  }
}

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null, posts: [], user: {}, profile: {}};
  }


  _delete = (postId, updateStateForView, hideEdit) => {
    return deletePost(postId, updateStateForView, hideEdit);
  };

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };


  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updatePosts = (res, type, deletedIndex = null) => {
    const {posts} = this.state;
    if (type === 'get') {
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

  _getUserPosts = (userId) => {
    this.setState({...this.state, isLoading: true});
    getUserPosts(userId, this._updatePosts, this._handleErrorLoading);
  };

  _create = (formValues) => {
    this.setState({...this.state, isLoading: true});
    createPost(formValues, this._updatePosts, this._handleErrorLoading, this._hideCreateForm);
  };

  componentDidMount() {
    this._getUserPosts(this.props.userId);
  };

  componentWillUnmount() {
    const {userId} = this.props;
    // TODO mohsen: complete by socket.off of update and delete requests
    socket.off(`userPosts-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, posts: res, isLoading: false};
        this.setState(newState);
      }
    });
  }

  render() {
    const {createForm, isLoading, error} = this.state;
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
                <PostCreateForm hideCreateForm={this._hideCreateForm} create={this._create}/>
              </PostItemWrapper>
            }
            {
              posts.map((post) => (
                <Post
                  posts={posts}
                  post={post}
                  updatePosts={this._updatePosts}
                  key={post.id}
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