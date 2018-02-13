/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getPosts, createPost, deletePost, updatePost} from 'src/crud/user/post'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {PostCreateForm} from "./Forms"
import {PostEditForm} from './Forms'
import {PostItemWrapper, PostView} from "./Views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"

class Post extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {edit: false, error: false, isLoading: false, post: this.props.post || {}};
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

  render() {
    const {post, isLoading, error} = this.state;
    const {user, profile} = this.props;
    if (this.state.edit) {
      return (
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
      )
    }
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <PostView post={post} user={user} profile={profile} showEdit={this._showEdit}/>
      </VerifyWrapper>
    )
  }
}

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createForm: false,
      edit: false, isLoading: false, error: null, posts: [], user: {}, profile: {}, resetState: false
    };
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

  _getPosts = () => {
    this.setState({...this.state, isLoading: true});
    getPosts(this.props.userId, this._updatePosts, this._handleErrorLoading);
  };

  _create = (formValues) => {
    this.setState({...this.state, isLoading: true});
    createPost(formValues, this._updatePosts, this._handleErrorLoading, this._hideCreateForm);
  };

  componentDidMount() {
    const {userId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      this._getPosts();
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/${userId}/`,
          result: `user-Posts-get/${userId}`,
          token: TOKEN
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/profiles/?profile_user=${userId}`,
          result: `profileUser-Posts-get/${userId}`,
          token: TOKEN
        }
      );
    };

    emitting();

    socket.on(`user-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

    socket.on(`profileUser-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false};
        this.setState(newState);
      }
    });

  }

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
    socket.off(`user-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, user: res, isLoading: false};
        this.setState(newState);
      }
    });

    socket.off(`profileUser-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false};
        this.setState(newState);
      }
    });

  }

  render() {
    const {createForm, user, profile, isLoading, error} = this.state;
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
                  user={user}
                  profile={profile}
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