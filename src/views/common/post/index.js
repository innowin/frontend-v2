// @flow

//TODO: mohammad forms need change to redux form
//FIXME: profileMedia for organization and home page need to fix
import * as React from "react";
import PropTypes from 'prop-types';

import {CategoryTitle, FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames";
import {PostCreateForm} from "./PostCreateForm";
import {bindActionCreators} from "redux";
import PostActions from "../../../redux/actions/commonActions/postActions";
import connect from "react-redux/es/connect/connect";
import {userPostsSelector} from 'src/redux/selectors/common/post/userPostsSelector'
import {Post} from './Post'
import constants from "src/consts/constants"
import client from 'src/consts/client'

type postsPropsType = {
  id: number,
  profileMedia: string,
  postIdentity: number,
  translate: {[string]: string},
  actions: {
    getPostByIdentity: Function,
    createPost: Function,
    deletePost: Function,
    updatePost: Function,
  },
  posts: [],
  isLoading: boolean,
  error: string,
  identityType: string,
  userImageId: number,
}

type postsStatesType = {
  createForm: boolean,
}

class Posts extends React.Component<postsPropsType, postsStatesType> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    profileMedia: PropTypes.string.isRequired,
    postIdentity: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    identityType: PropTypes.string.isRequired,
    userImageId: PropTypes.number.isRequired,
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
    const {actions, id, identityType} = this.props
    const {createPost} = actions
    createPost({formValues, postOwnerId: id, postOwnerType:identityType})
  }

  componentDidMount() {
    const {actions, postIdentity, id, identityType} = this.props
    const {getPostByIdentity} = actions
    getPostByIdentity({postIdentity, postOwnerId: id, postOwnerType: identityType})
  }

  render() {
    const {postIdentity, profileMedia, posts, isLoading, error, actions, translate, userImageId} = this.props
    const {updatePost, deletePost} = actions
    const {createForm} = this.state;
    return (
      //<VerifyWrapper isLoading={isLoading} error={error}>
      <div>
        <CategoryTitle
          title={translate['Post']}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardPost">

          <ListGroup>
            {
              createForm &&
              <div className="-itemWrapperPost">
                <PostCreateForm hideCreateForm={this._hideCreateForm}
                                create={this._create}
                                postIdentity={postIdentity}
                                postsLength = {posts.length}
                                userImageId={userImageId}
                />
              </div>
            }
            {
              posts ? posts.map(post => (
                <Post
                  post={post}
                  updatePost={updatePost}
                  key={post.id + "Posts"}
                  profileMedia={profileMedia}
                  deletePost={deletePost}
                />
              ))
              : ''
            }
          </ListGroup>

        </FrameCard>
      </div>
      // </VerifyWrapper>
    )
  }
}

const mapStateToProps  = (state, ownProps) => {
  const {identityType} = ownProps
  const ownerId = ownProps.id
  const stateOwner = (identityType === constants.USER_TYPES.PERSON) ? state.users.list[ownerId] :
    (identityType === constants.USER_TYPES.ORG && state.organs.list[ownerId])
  const defaultObject = {content: [], isLoading: false, error: null}
  const postObject = (stateOwner && stateOwner.posts) || defaultObject
  const userType = client.getUserType()
  const userImageId = (userType === constants.USER_TYPES.PERSON) ? state.auth.client.profile.profile_media :
      (userType === constants.USER_TYPES.ORG && state.auth.client.organization.organization_logo)
  return {
    posts: userPostsSelector(state, ownProps),
    userImageId,
    translate: state.intl.messages,
    isLoading: postObject.isLoading,
    error: postObject.error,
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