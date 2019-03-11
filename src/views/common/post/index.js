// @flow

//TODO: mohammad forms need change to redux form
import * as React from 'react'
import PropTypes from 'prop-types'

import {FrameCard, ListGroup} from 'src/views/common/cards/Frames'
import {PostCreateForm} from './editPost/PostCreateForm'
import {bindActionCreators} from 'redux'
import PostActions from '../../../redux/actions/commonActions/postActions'
import connect from 'react-redux/es/connect/connect'
import {userPostsSelector} from 'src/redux/selectors/common/post/userPostsSelector'
import {Post} from './Post'
import constants from 'src/consts/constants'

type postsPropsType = {
  id: number | string,
  postIdentity: number,
  translate: { [string]: string },
  actions: {
    getPostByIdentity: Function,
    createPost: Function,
    deletePost: Function,
    updatePost: Function,
  },
  posts: [],
  isLoading: boolean,
  error?: string,
  identityType: string,
}

type postsStatesType = {
  createForm: boolean,
}

class Posts extends React.Component<postsPropsType, postsStatesType> {
  static propTypes = {
    id: PropTypes.number.isRequired,
    postIdentity: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    translate: PropTypes.object.isRequired,
    identityType: PropTypes.string.isRequired,
  }

  constructor(props: postsPropsType) {
    super(props)
    this.state = {createForm: false}
  }

  _showCreateForm = () => {
    this.setState({...this.state, createForm: true})
  }

  _hideCreateForm = () => {
    this.setState({...this.state, createForm: false})
  }

  _create = (formValues) => {
    const {actions, id, identityType} = this.props
    const {createPost} = actions
    createPost({formValues, postOwnerId: id, postOwnerType: identityType})
  }

  componentDidMount() {
    const {actions, id, identityType} = this.props
    const {getPostByIdentity} = actions
    getPostByIdentity({postIdentity: id, postOwnerId: id, postOwnerType: identityType})
  }

  render() {
    const {
      postIdentity,
      posts,
      // isLoading,
      // error,
      actions,
      // translate,
    } = this.props
    const {updatePost, deletePost} = actions
    const {createForm} = this.state
    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          {/*<CategoryTitle*/}
          {/*title={translate['Post']}*/}
          {/*showCreateForm={this._showCreateForm}*/}
          {/*// createForm={createForm}*/}
          {/*/>*/}
          <FrameCard className="-frameCardPost">

            <ListGroup>
              {
                createForm &&
                <div className="-itemWrapperPost">
                  <PostCreateForm hideCreateForm={this._hideCreateForm}
                                  create={this._create}
                                  postIdentity={postIdentity}
                                  postsLength={posts.length}
                  />
                </div>
              }
              {
                posts ? posts.map(post => (
                        <Post
                            post={post}
                            updatePost={updatePost}
                            key={post.id + 'Posts'}
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

const mapStateToProps = (state, ownProps) => {
  const {identityType} = ownProps
  const ownerId = ownProps.id
  const stateOwner = (identityType === constants.USER_TYPES.USER) ? state.identities.list[ownerId] :
      (identityType === constants.USER_TYPES.ORG && state.identities.list[ownerId])
  const defaultObject = {content: [], isLoading: false, error: null}
  const postObject = (stateOwner && stateOwner.posts) || defaultObject
  return {
    posts: userPostsSelector(state, ownProps),
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
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)