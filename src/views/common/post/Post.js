import * as React from "react";
import PropTypes from "prop-types";

import type {postType} from "../../../consts/flowTypes/common/post";
import {VerifyWrapper} from "../cards/Frames";
// import PostEditForm from "./editPost/PostEditForm";
import PostView from "./PostView";
import CreatePost from './createPost'

type postPropTypes = {
  post: postType,
  updatePost: Function,
  deletePost: Function
}

type postStateTypes = {
  edit: boolean,
}

export class Post extends React.Component<postPropTypes, postStateTypes> {

  static propTypes = {
    post: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  }

  constructor(props: postPropTypes) {
    super(props)
    this.state = {
      edit: false
    }
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _update = (formValues: postType, postId: number, postFileIds: []) => {
    const {updatePost, post} = this.props
    const postRelatedIdentity = post.post_related_identity
    const postOwnerId = postRelatedIdentity.id
    updatePost({formValues, postId, postOwnerId, postFileIds})
  }

  render() {
    const {edit} = this.state
    const {post} = this.props
    return (
      // TODO mohsen: handle error and isLoading from state redux
        <VerifyWrapper isLoading={false} error={false} className='post-view-container'>
          {edit ?
              <div className="-itemWrapperPost">
                <CreatePost key={'post edit ' + post.id} hideEdit={this._hideEdit} post={post} updateFunc={this._update} isUpdate={true}/>
              </div>
              :
              <PostView post={post}
                        key={'post view ' + post.id}
                        showEdit={this._showEdit}
                        extendedView={false}
              />
          }
        </VerifyWrapper>
    )
  }
}