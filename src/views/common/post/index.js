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
import {makeUserPostsSelector} from 'src/redux/selectors/common/post/userPostsSelector'
import {Post} from './Post'
import constants from "../../../consts/constants";

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
    const postOwnerType = constants.USER_TYPES.PERSON
    createPost({formValues, postOwnerId: id, postOwnerType})
  }

  componentDidMount() {
    const {actions, postIdentity, id, identityType} = this.props
    const {getPostByIdentity} = actions
    getPostByIdentity({postIdentity, postOwnerId: id, postOwnerType: identityType})
  }

  render() {
    const {postIdentity, profileMedia, posts, isLoading, error, actions, translate} = this.props
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
                <PostCreateForm hideCreateForm={this._hideCreateForm} create={this._create}
                                postIdentity={postIdentity}/>
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
  const userPostsSelector = makeUserPostsSelector(state, ownProps)
  return (state, props) => {
    let userId = props.id
    const stateUser = state.users.list[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const postObject = (stateUser && stateUser.posts) || defaultObject
    return {
      posts: userPostsSelector(state, props),
      translate: state.intl.messages,
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