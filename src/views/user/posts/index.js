/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {createPost, deletePost, updatePost} from 'src/crud/user/post'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {PostCreateForm} from "./Forms"
import {PostEditForm} from './Forms'
import {PostItemWrapper, PostView} from "./Views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"


class PostInfo extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const {post} = props;
    this.state = {edit: false, post: post, error:false, isLoading:false};
    this._updateStateForView = this._updateStateForView.bind(this);
    this._showEdit = this._showEdit.bind(this);
    this._showEdit = this._showEdit.bind(this);
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, post: res, error:error, isLoading:isLoading})
  };

  render() {
    const {post} = this.state;
    const {user, profile} = this.props;
    if (this.state.edit) {
      return <PostItemWrapper>
        <PostEditForm
          post={post}
          hideEdit={this._hideEdit}
          updateStateForView={this._updateStateForView}
          remove={this.props.deletePost}
          update={this.props.updatePost}
        />
      </PostItemWrapper>;
    }
    return <PostView post={post} user={user} profile={profile} showEdit={this._showEdit}/>;
  }
}

class Post extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._delete = this._delete.bind(this);
    this._update = this._update.bind(this);
    this._updateStateForView = this._updateStateForView.bind(this)
  }


  _delete = (postId) => {
    return deletePost({postId});
  };

  _update = (formValues, postId, updateStateForView, hideEdit) => {
    return updatePost(formValues, postId, updateStateForView, hideEdit);
  };

  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props;
    updateStateForView({error: error, isLoading: isLoading});
    this.setState({...this.state, post: res, error: error, isLoading: isLoading});
  };

  render() {
    const {post, user, profile} = this.props;
    return (
      <PostInfo
        post={post}
        user={user}
        profile={profile}
        updateStateForView={this._updateStateForView}
        deletePost={this._delete}
        updatePost={this._update}
      />
    )
  }
}

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {createForm: false, edit: false, isLoading: false, error: null, posts: [], user: {}, profile: {}};
  }

  static propTypes = {
    userId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {userId} = this.props;
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/base/posts/?post_user=${userId}`,
          result: `userPosts-Posts-get/${userId}`,
          token: TOKEN
        }
      );
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

    socket.on(`userPosts-Posts-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, posts: res, isLoading: false};
        this.setState(newState);
      }
    });
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

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, post:res, error: error, isLoading: isLoading})
  };

  _create = (formValues, hideCreateForm) => {
    const updateStateForView = this._updateStateForView;
    return createPost(formValues, updateStateForView, hideCreateForm);
  };

  render() {
    const {createForm, posts, user, profile, isLoading, error} = this.state;
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
              posts.map((post, i) => (
                <Post
                  post={post}
                  user={user}
                  profile={profile}
                  updateStateForView={this._updateStateForView}
                  key={i}
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