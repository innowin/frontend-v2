// @flow
/*global __*/
import * as React from "react";
import PropTypes from 'prop-types';

import {CategoryTitle, FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames";
import {createPost, deletePost, updatePost} from "src/crud/post/post";
import {PostCreateForm, PostEditForm} from "./Forms";
import {PostItemWrapper, PostView} from "./View";
import {getFile} from "../../../crud/media/media";
import {bindActionCreators} from "redux";
import PostActions from "../../../redux/actions/commonActions/postActions";
import connect from "react-redux/es/connect/connect";
import {makeUserPostsSelector} from 'src/redux/selectors/common/userPostsSelector'

type postPropTypes = {
  post: {
    post_identity: number,
  },
  posts: [],
  updatePosts: Function,
  profileMedia: string,
}

type postStateTypes = {
  post: {},
  postIdentity_username: string,
  postIdentity_name: string,
  postIdentityImg: string | null,
  edit: boolean,
  error: {} | boolean,
  isLoading: boolean,
}

export class Post extends React.Component<postPropTypes, postStateTypes> {

  static propTypes = {
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    updatePosts: PropTypes.func.isRequired,
    profileMedia: PropTypes.string.isRequired,
  };

  constructor(props: postPropTypes) {
    super(props)
    this.state = {
      post: this.props.post || {},
      postIdentity_username: '',
      postIdentity_name: '',
      postIdentityImg: null,
      edit: false,
      error: false,
      isLoading: true
    }
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  }

  _updateView = (res) => {
    this.setState({...this.state, post: res})
  }

  _update = (formValues, postId) => {
    this.setState({...this.state, isLoading: true}, () =>
      updatePost(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading))
  }

  _delete = () => {
    this.setState({...this.state, isLoading: true}, () =>
      deletePost(this.props.posts, this.props.post, this.props.updatePosts, this._hideEdit, this._handleErrorLoading))
  }

  _getIdentityDetails = (identity) => {
      const user = identity.identity_user;
      const organization = identity.identity_organization;
      const {profileMedia} = this.props
      if (user) {
        this.setState({
            ...this.state,
            postIdentity_username: user.username,
            postIdentity_name: user.first_name + ' ' + user.last_name
          }
        )
        if (profileMedia) {
          getFile(profileMedia, (res) =>
            this.setState({...this.state, postIdentityImg: res.file})
          )
        }
        this.setState({...this.state, isLoading: false})
      }
      if (organization) {
        const logoId = organization.organization_logo
        if (logoId) {
          getFile(logoId, (res) =>
            this.setState({...this.state, postIdentityImg: res.file})
          )
        }
        this.setState({
          ...this.state,
          postIdentity_username: organization.username,
          postIdentity_name: organization.nike_name || organization.official_name,
          isLoading: false
        })
      }
  }

  componentDidMount() {
    const {post_identity} = this.props.post;
    this._getIdentityDetails(post_identity)
  }

  render() {
    const {post, postIdentity_username, postIdentity_name, postIdentityImg, edit, isLoading, error} = this.state;
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
                    postIdentityImg={postIdentityImg}
                    showEdit={this._showEdit}/>
        }
      </VerifyWrapper>
    )
  }
}

type postsPropsType = {
  id: string,
  identityType: string,
  profileMedia: string,
  postIdentity: number,
  actions: {
    getPostByIdentity: Function,
  },
  posts: [],
  isLoading: boolean,
  error: {} | null
}

type postsStatesType = {
  createForm: boolean,
}

class Posts extends React.Component<postsPropsType, postsStatesType> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    identityType: PropTypes.string.isRequired,
    profileMedia: PropTypes.string.isRequired,
    postIdentity: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
  };

  constructor(props: postsPropsType) {
    super(props);
    this.state = {posts: [], createForm: false, isLoading: true, error: null}
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
    res = res.data
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

  componentDidMount() {
    const {actions, postIdentity} = this.props
    const {getPostByIdentity} = actions

    getPostByIdentity(postIdentity)
  }

  render() {
    const {createForm} = this.state;
    const {postIdentity, profileMedia, posts, isLoading, error} = this.props
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
              posts !== undefined ? posts.map((post) => (
                <Post
                  posts={posts}
                  post={post}
                  updatePosts={this._updatePosts}
                  key={post.id + "Posts"}
                  profileMedia={profileMedia}
                />
              ))
              : ''
            }
          </ListGroup>

        </FrameCard>
      </VerifyWrapper>
    )
  }
}

const mapStateToProps  = () => {
  const userPostsSelector = makeUserPostsSelector()
  return (state, props) => {
    return {
      posts: userPostsSelector(state, props),
      isLoading: state.common.posts.isLoading,
      error: state.common.posts.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPostByIdentity: PostActions.getPostByIdentity
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)