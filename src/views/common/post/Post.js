import React from 'react'
import * as PropTypes from 'prop-types'
import PostView from './PostView'
import CreatePost from './createPost'

export class Post extends React.PureComponent {

  static propTypes = {
    post: PropTypes.object.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      edit: false,
    }
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _update = (formValues, postId, postFileIds: []) => {
    const {updatePost, post} = this.props
    const postRelatedIdentity = post.post_related_identity
    const postOwnerId = postRelatedIdentity.id
    updatePost({formValues, postId, postOwnerId, postFileIds})
  }

  render() {
    const {edit} = this.state
    const {post} = this.props
    return (
        <div className='post-view-container'>
          {
            edit ?
                <div className="-itemWrapperPost">
                  <CreatePost key={'edit ' + post.id} hideEdit={this._hideEdit} post={post} updateFunc={this._update} isUpdate={true}/>
                </div>
                :
                <PostView post={post}
                          key={'view ' + post.id}
                          showEdit={this._showEdit}
                          extendedView={false}
                />
          }
        </div>
    )
  }
}