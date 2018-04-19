/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getUserPosts, createPost, deletePost, updatePost} from 'src/crud/user/post'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {PostCreateForm} from "./Forms"
import {PostEditForm} from './Forms'
import {PostItemWrapper, PostView} from "./Views"
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
    const {post, postUser_username, postUser_name, postUser_mediaId, edit, isLoading, error} = this.state;
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
          <PostView post={post} postUser_username={postUser_username} postUser_name={postUser_name}
                    postUser_mediaId={postUser_mediaId}
                    showEdit={this._showEdit}/>
        }
      </VerifyWrapper>
    )
  }
}

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {posts: [], createForm: false, isLoading: false, error: null};
  }

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