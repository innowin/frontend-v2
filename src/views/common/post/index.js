// @flow
/*global __*/

//TODO: mohammad forms need change to redux form
import * as React from "react";
import PropTypes from 'prop-types';

import {CategoryTitle, FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames";
import {PostCreateForm, PostEditForm} from "./Forms";
import {PostItemWrapper, PostView} from "./View";
import {getFile} from "../../../crud/media/media";
import {bindActionCreators} from "redux";
import PostActions from "../../../redux/actions/commonActions/postActions";
import connect from "react-redux/es/connect/connect";
import {makeUserPostsSelector} from 'src/redux/selectors/common/userPostsSelector'
import {postType} from 'src/consts/flowTypes/common/post'
import {identityType} from 'src/consts/flowTypes/user/others'

type postPropTypes = {
  post: {
    post_identity: number,
    id: number,
  },
  posts: [],
  updatePost: Function,
  profileMedia: string,
  deletePost: Function,
  userId: number,
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
    updatePost: PropTypes.func.isRequired,
    profileMedia: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
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

  _update = (formValues :postType, postId :number) => {
    const {updatePost} = this.props
    updatePost(formValues, postId)
  }

  _delete = () => {
    const {deletePost, post, userId} = this.props
    deletePost(post.id, userId)
  }

  _getIdentityDetails = (identity: identityType) => {
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
  id: number,
  identityType: string,
  profileMedia: string,
  postIdentity: number,
  actions: {
    getPostByIdentity: Function,
    createPost: Function,
    deletePost: Function,
    updatePost: Function,
  },
  posts: [],
  isLoading: boolean,
  error: string,
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
    this.state = {createForm: false}
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  };

  _hideCreateForm = () => {
    this.setState({createForm: false})
  };

  _create = (formValues) => {
    const {actions, id} = this.props
    const {createPost} = actions
    createPost(formValues, id)
  };

  componentDidMount() {
    const {actions, postIdentity, id} = this.props
    const {getPostByIdentity} = actions
    getPostByIdentity(postIdentity, id)
  }

  render() {
    const {postIdentity, profileMedia, posts, isLoading, error, actions, id} = this.props
    const {updatePost, deletePost} = actions
    const {createForm} = this.state;
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
              posts && posts !== {}  ? posts.map((post) => (
                <Post
                  posts={posts}
                  post={post}
                  updatePost={updatePost}
                  key={post.id + "Posts"}
                  profileMedia={profileMedia}
                  deletePost={deletePost}
                  userId={id}
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

    let userId = props.id
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const postObject = (stateUser && stateUser.posts) || defaultObject

    return {
      posts: userPostsSelector(state, props),
      isLoading: postObject.isLoading,
      error: postObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPostByIdentity: PostActions.getPostByIdentity,
    createPost: PostActions.createPost,
    updatePost: PostActions.updatePost,
    deletePost: PostActions.deletePost,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)