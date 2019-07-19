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
    this.state = {edit: false}
    this._showEdit = this._showEdit.bind(this)
    this._hideEdit = this._hideEdit.bind(this)
    this._update = this._update.bind(this)
  }

  _showEdit() {
    this.setState({...this.state, edit: true})
  }

  _hideEdit() {
    this.setState({...this.state, edit: false})
  }

  _update(formValues, postId, postFileIds: []) {
    const {updatePost} = this.props
    updatePost({formValues, postId, postFileIds})
  }

  render() {
    const {edit} = this.state
    const {post, extendedView, location} = this.props
    if (edit)
      return <div className="-itemWrapperPost"><CreatePost hideEdit={this._hideEdit} post={post} updateFunc={this._update} isUpdate={true}/></div>
    else return <PostView post={post} showEdit={this._showEdit} extendedView={extendedView} location={location}/>
  }
}