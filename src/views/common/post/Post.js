import * as React from "react";
import PropTypes from "prop-types";
import type {postType} from "../../../consts/flowTypes/common/post";
import {identityType} from "../../../consts/flowTypes/user/basicInformation";
import {getFile} from "../../../crud/media/media";
import {VerifyWrapper} from "../cards/Frames";
import {PostEditForm} from "./PostEditForm";
import {PostView} from "./PostView";

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
      edit: false
    }
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _update = (formValues: postType, postId: number) => {
    const {updatePost, userId} = this.props
    updatePost({formValues, postId, userId})
  }

  _delete = () => {
    const {deletePost, post} = this.props
    const postParent = post.post_parent
    const postIdentityUser = post.post_identity.identity_user && post.post_identity.identity_user.id
    const postIdentityOrgan = post.post_identity.identity_organization && post.post_identity.identity_organization.id
    const postParentType = (postParent && postParent.child_name) || null
    const postParentId = (postParent && postParent.id) || null
    const postOwnerId = (postIdentityUser && postIdentityUser.id) || (postIdentityOrgan && postIdentityOrgan.id)
    const postOwnerType = postIdentityUser ? 'person' : 'organization'
    deletePost({postId:post.id, postOwnerId, postOwnerType, postParentId, postParentType})
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
    const {post, postIdentity_username, postIdentity_name, postIdentityImg, edit} = this.state;
    return (
      // TODO mohsen: handle error and isLoading from state redux
        <VerifyWrapper isLoading={false} error={false}>
          {edit ?
              <div className="-itemWrapperPost">
                <PostEditForm
                    post={post}
                    hideEdit={this._hideEdit}
                    deleteFunc={this._delete}
                    updateFunc={this._update}
                />
              </div>
              :
              <PostView post={post} postIdentityUsername={postIdentity_username} postIdentityName={postIdentity_name}
                        postIdentityImg={postIdentityImg}
                        showEdit={this._showEdit}/>
          }
        </VerifyWrapper>
    )
  }
}