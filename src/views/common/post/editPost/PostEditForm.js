// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import PropTypes from 'prop-types'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import {bindActionCreators} from 'redux'
import {Confirm} from '../../cards/Confirm'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {PostForm} from './PostForm'
import type {postType} from 'src/consts/flowTypes/common/post'

type PropsPostEditForm = {
  updateFunc: Function,
  deleteFunc: Function,
  hideEdit: Function,
  post: postType,
  translate: {},
  actions: {
    deleteFile: Function,
  },
  currentUserName: string,
  currentUserMedia: fileType,
}
type StatePostEditForm = {
  confirm: boolean,
  removeImageArray: Array<{ fileId: number, fileParentId: number }>,
}

class PostEditForm extends React.Component<PropsPostEditForm, StatePostEditForm> {

  static propTypes = {
    updateFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {confirm: false, removeImageArray: []}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _remove = () => {
    return this.props.deleteFunc()
  }

  form: ?React.ElementRef<typeof PostForm>

  _save = () => {
    const {actions} = this.props
    const {deleteFile} = actions
    const {removeImageArray} = this.state

    if (this.form && this.form._formValidate()) {
      const {post, updateFunc, hideEdit} = this.props
      const postId = post.id
      const formValues = this.form._getValues()
      hideEdit()
      removeImageArray.map(removeImage => deleteFile({
        fileId: removeImage.fileId,
        fileParentId: removeImage.fileParentId,
        fileParentType: constants.FILE_PARENT.POST,
      }))
      return updateFunc(formValues, postId)
    }
  }

  _onSubmit = (e) => {
    e.preventDefault()
    this._save()
    return false
  }

  _deleteFile = (fileData) => {
    const {removeImageArray} = this.state
    this.setState({...this.state, removeImageArray: [...removeImageArray, fileData]})
  }

  render() {
    const {confirm, removeImageArray} = this.state
    const {hideEdit, post, currentUserName, currentUserMedia, translate} = this.props
    if (confirm) {
      return <div className='remove-post-container'>
        <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>
      </div>
    }
    return <PostForm ref={form => this.form = form}
                     onSubmit={this._onSubmit}
                     post={post}
                     postParent={post.post_parent}
                     postIdentity={post.post_related_identity}
                     _showConfirm={this._showConfirm}
                     hideEdit={hideEdit}
                     currentUserName={currentUserName}
                     currentUserMedia={currentUserMedia}
                     translate={translate}
                     deleteFile={this._deleteFile}
                     removeImageArray={removeImageArray}
    />

  }
}

const mapStateToProps = state => {
  const client = state.auth.client
  const clientImgId = client.profile.profile_media
  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)
  const {user_type} = state.auth.client
  const stateOrgan = state.identities.list[userId]
  const name = user_type === 'person' ?
      client.user.first_name + ' ' + client.user.last_name
      :
      stateOrgan && stateOrgan.organization.content.nike_name

  return ({
    currentUserType: client.user_type,
    currentUserIdentity: client.identity.content,
    currentUserId: userId,
    currentUserImgId: clientImgId,
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: name,
    translate: getMessages(state),
  })
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    deleteFile: FileActions.deleteFile,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostEditForm)