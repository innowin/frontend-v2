// @flow
/*global __*/

//TODO: mohammad forms need change to redux form
import * as React from "react";
import PropTypes from 'prop-types';

import {CategoryTitle, FrameCard, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames";
import {PostCreateForm} from "./PostCreateForm";
import {bindActionCreators} from "redux";
import PostActions from "../../../redux/actions/commonActions/postActions";
import connect from "react-redux/es/connect/connect";
import {makeUserPostsSelector} from 'src/redux/selectors/common/userPostsSelector'
import {Post} from './Post'

type postsPropsType = {
  id: number,
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
  }

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
              <div className="-itemWrapperPost">
                <PostCreateForm hideCreateForm={this._hideCreateForm} create={this._create}
                                postIdentity={postIdentity}/>
              </div>
            }
            {
              posts ? posts.map((post) => (
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