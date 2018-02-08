/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';

import {createPost, deletePost, updatePost} from 'src/crud/organization/post.js';
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames";
import {PostCreateForm} from "./forms";
import {PostEditForm} from './forms';
import {PostItemWrapper, PostView} from "./view";
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"


class PostInfo extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const {post} = props;
    this.state = {edit:false, post:post};
  }

  componentWillReceiveProps(props) {
    const {post} = props;
    this.setState({...this.state, post: post})
  }


  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props;
    this.setState({...this.state, post: res})
  };

  render() {
    const {post} = this.state;
    const {organization, profile} = this.props;
    if (this.state.edit) {
      return <PostItemWrapper>
        <PostEditForm
          post={post}
          organization={organization}
          hideEdit={this._hideEdit}
          updateStateForView={this._updateStateForView}
          remove={this.props.deletePost}
          update={this.props.updatePost}
        />
      </PostItemWrapper>;
    }
    return <PostView post={post} organization={organization} profile={profile} showEdit={this._showEdit}/>;
  }
}

class Post extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(props) {
    const {post} = props;
    this.setState({...this.state, post: post});
  }

  _delete = (postId) => {
    return deletePost({postId});
  };

  _update = (formValues, postId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
    return updatePost(formValues, postId, updateStateForView, hideEdit);
  };

  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props;
    updateStateForView({error: error, isLoading: isLoading});
    this.setState({...this.state, post: res, error: error, isLoading: isLoading});
  };

  render() {
    const {post, organization} = this.props;
    return (
      <PostInfo
        post={post}
        organization={organization}
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
    this.state = {createForm: false, edit: false, isLoading: false, error: null, posts: [], organization: {}, profile: {}};
  }

  static propTypes = {
    organizationId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    // const {organizationId} = this.props;
    const {organizationId} = this.props; //TODO amir solve prop injection of organizationId
    const emitting = () => {
      const newState = {...this.state, isLoading: true};
      this.setState(newState);
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/base/posts/?post_parent=${organizationId}`,
          result: `organizationPosts-Posts-get/${organizationId}`,
          token: TOKEN
        }
      );
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/${organizationId}/`,
          result: `organization-Posts-get/${organizationId}`,
          token: TOKEN
        }
      );
    };

    emitting();

    socket.on(`organizationPosts-Posts-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, posts: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.on(`organization-Posts-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, organization: res, isLoading: false};
        this.setState(newState);
      }
    });
	}

  componentWillUnmount() {
    const {organizationId} = this.props;
    socket.off(`organizationPosts-Posts-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, posts: res, isLoading: false};
        this.setState(newState);
      }
    });
    socket.off(`organization-Posts-get/${organizationId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, organization: res, isLoading: false};
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

  _updateStateForView = (error, isLoading) => {
    this.setState({...this.state, error: error, isLoading: isLoading})
  };

  _create = (formValues, hideEdit) => {
    const {organizationId, postId} = this.props;
    const {organization} = this.state;
    return createPost(formValues, organizationId, organization.owner, this._updateStateForView, hideEdit);
  };

  render() {
    const {createForm, posts, organization, profile } = this.state;
    return <div>
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
                organization={organization}
                profile={profile}
                updateStateForView={this._updateStateForView}
                key={i}
              />
            ))
          }
        </ListGroup>
      </FrameCard>
    </div>;
  }
}

export default Posts;