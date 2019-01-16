// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {Confirm} from '../../common/cards/Confirm'
import {PostForm} from './PostForm'
import connect from 'react-redux/es/connect/connect'
import {getMessages} from 'src/redux/selectors/translateSelector'

type PropsPostEditForm = {
  updateFunc: Function,
  deleteFunc: Function,
  hideEdit: Function,
  post: {},
  translate: {},
}
type StatePostEditForm = {
  confirm: boolean,
}

class PostEditForm extends React.Component<PropsPostEditForm, StatePostEditForm> {

  static propTypes = {
    updateFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {confirm: false}
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
    if (this.form && this.form._formValidate()) {
      const {post, updateFunc, hideEdit} = this.props
      const postId = post.id
      const formValues = this.form._getValues()
      hideEdit()
      return updateFunc(formValues, postId)
    }
  }

  _onSubmit = (e) => {
    e.preventDefault()
    this._save()
    return false
  }

  render() {
    const {confirm} = this.state
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
                     postIdentity={post.post_identity}
                     _showConfirm={this._showConfirm}
                     hideEdit={hideEdit}
                     currentUserName={currentUserName}
                     currentUserMedia={currentUserMedia}
                     translate={translate}
    />

  }
}

const mapStateToProps = state => {
  const client = state.auth.client
  const clientImgId = (client.user_type === 'person') ? (client.profile.profile_media) : (
      (client.organization && client.organization.organization_logo) || null
  )

  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  const {user_type} = state.auth.client
  const stateOrgan = state.organs.list[userId]
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
    translate: getMessages(state)
  })
}

export default connect(mapStateToProps)(PostEditForm)