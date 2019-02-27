import React, {Component} from "react"
import PropTypes from 'prop-types'
import {VerifyWrapper} from "src/views/common/cards/Frames"
import {deletePost, updatePost} from "src/crud/post/post"
import {getProfile} from "../../../../crud/user/profile"
import {getPost} from '../../../../crud/post/post'
import {getIdentity} from "../../../../crud/identity"
import {getExchangePostComment} from '../../../../crud/exchange/exchange'
import PostEditForm from "src/views/common/post/editPost/PostEditForm"
import {ExchangePostView} from "./views"
import {getFile} from "../../../../crud/media/media"

export class ExchangePost extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      post: {},
      postIdentity_name: '',
      postIdentity_mediaId: null,
      productPictures: [],
      product: {},
      edit: false,
      error: false,
      isLoading: true,
      comments: []
    }
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error})
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

  _getIdentityDetails = (post_identity) => {
    const handleResult = (identity) => {
      const user = identity.identity_user
      const organization = identity.identity_organization
      if (user) {
        this.setState({
          ...this.state,
          postIdentity_name: user.first_name + ' ' + user.last_name
        })
        getProfile(user.id, (res) => {
          // TODO mohsen: handle error for getProfile
          if (res.profile_media) {
            getFile(res.profile_media, (res) =>
              this.setState({...this.state, postIdentity_mediaId: res.file})
            )
          }
          this.setState({...this.state, isLoading: false})
        })
      }
      if (organization) {
        this.setState({
          ...this.state,
          postIdentity_name: organization.nike_name || organization.official_name,
          postIdentity_mediaId: organization.organization_logo,
          isLoading: false
        })
      }
    }
    getIdentity(post_identity, handleResult)
  }

  componentDidMount() {
    const {postId} = this.props.match.params
    this.setState({isLoading: true, error: null})

    getPost(postId).then(post => {
      this.setState({...this.state, post: post})
      this._getIdentityDetails(post.post_related_identity)

      getExchangePostComment(post.id).then(comments => {
        this.setState({...this.state, comments: comments, isLoading: false})
      }).catch(err => {
        this.setState({...this.state, isLoading: false, error: err})
      })

    }).catch(err => {
      this.setState({isLoading: false, error: err})
    })

  }

  render() {
    const {post, postIdentity_name, postIdentity_mediaId, edit, comments, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
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
          <ExchangePostView post={post}
                            comments={comments}
                            postIdentityName={postIdentity_name}
                            postIdentityMediaId={postIdentity_mediaId}
          />
        }
      </VerifyWrapper>
    )
  }
}

export default ExchangePost