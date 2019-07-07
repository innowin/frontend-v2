import React from 'react'
import CommentActions from 'src/redux/actions/commonActions/commentActions'
import {AttachFileIcon, DefaultUserIcon, PostSendIcon} from 'src/images/icons'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getMessages} from 'src/redux/selectors/translateSelector'
import constants from 'src/consts/constants'

class PostCommentNew extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      commentBody: 'comment-body',
      descriptionClass: 'hide-message',
      comment: '',
      replySender: '',
    }
    this._handleChangeText = this._handleChangeText.bind(this)
  }

  componentDidMount() {
    const {commentOn} = this.props
    if (this.text) {
      this.text.focus()
    }
    if (commentOn && this.text) {
      this.text.focus()
      const replySender = commentOn.comment_sender.username + '@ '
      this.text.value = replySender
      this.setState({...this.state, replySender})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {commentOn} = nextProps
    if (commentOn && this.text) {
      this.text.focus()
    }
    if (commentOn !== this.props.commentOn && commentOn) {
      const replySender = commentOn.comment_sender.username + '@ '
      this.text.value = replySender
      this.setState({...this.state, replySender})
    }
  }

  createComment(commentOn, commentText, commentTextField) {
    const {extendedView} = this.props
    if (commentText.length > 0 && commentText.length <= 750) {
      const {actions, post} = this.props
      const {replySender} = this.state
      const {createComment} = actions

      if (replySender) {
        if (commentText.startsWith(replySender)) {
          commentText = commentText.substr(replySender.length)
        }
      }

      let formValues
      if (commentOn) {
        formValues = {text: commentText, comment_parent: post.id, comment_replied_to: commentOn.id}
      }
      else {
        formValues = {text: commentText, comment_parent: post.id}
      }
      commentTextField.value = ''
      createComment({formValues, parentId: post.id, commentParentType: constants.COMMENT_PARENT.POST, getComments: extendedView})
    }
    else console.log('Handle Notification for Illegal Comment')
  }

  _handleChangeText(e) {
    let comment = e.target.value
    const {removeCommentOn} = this.props
    const {replySender} = this.state
    if (replySender) {
      if (!comment.startsWith(replySender)) {
        removeCommentOn()
        this.setState({...this.state, replySender: ''})
      }
      else {
        comment = comment.substr(replySender.length)
      }
    }

    if (comment.length < 751) this.setState({...this.state, comment}, () => checkCharacter(comment))
    else e.target.value = this.state.comment
    const checkCharacter = (description) => {
      const descriptionLength = description.trim().length
      if (descriptionLength === 0)
        this.setState({...this.state, descriptionClass: 'hide-message'})
      if (descriptionLength >= 1 && descriptionLength <= 740)
        this.setState({...this.state, descriptionClass: 'neutral-message'})
      if (descriptionLength > 740 && descriptionLength <= 750)
        this.setState({...this.state, descriptionClass: 'warning-message'})
      else if (descriptionLength > 750)
        this.setState({...this.state, descriptionClass: 'error-message'})
    }
  }

  render() {
    const {commentBody, open, descriptionClass, comment} = this.state
    const {identityId, currentUser, translate, commentOn, comments} = this.props
    if (identityId)
      return (
          <div className="comment-container">
            <div>
              {
                currentUser.profile_media ?
                    <img alt='profile' src={currentUser.profile_media.file} className='comment-owner'/>
                    :
                    <DefaultUserIcon width='45px' height='45px'/>
              }
            </div>
            <div className={commentBody}>
              {descriptionClass &&
              <span className={descriptionClass + ' description-character'}> {comment.trim().length + '/750'} </span>
              }
              <textarea ref={e => this.text = e}
                        className={open ? 'comment-text-area-open' : 'comment-text-area'}
                        placeholder={translate['Send comment']}
                        onChange={this._handleChangeText}
                        onFocus={() => this.setState({
                          ...this.state,
                          commentBody: 'comment-body-focused',
                          descriptionClass: comment.length < 1 ?
                              'hide-message' :
                              comment.length > 750 ? 'error-message' : 'neutral-message',
                        })}
                        onBlur={(e) => (e.target.value.length === 0 && !comments) ? this.setState({
                              ...this.state,
                              open: false,
                              commentBody: 'comment-body',
                              descriptionClass: 'hide-message',
                            })
                            : this.setState({
                              ...this.state,
                              open: true,
                              commentBody: 'comment-body',
                              descriptionClass: 'hide-message',
                            })
                        }
              />
              <div className='comment-icons' contentEditable={false}>
                  <span onClick={() => console.log('Handle Show Menu')}>
                    <AttachFileIcon className='post-component-footer-send-attach'/>
                  </span>
                <span onClick={this.createComment.bind(this, commentOn, comment, this.text)}>
                  <PostSendIcon className={comment.length > 0 ? 'post-component-footer-send-attach' : 'post-component-footer-send-attach-inactive'}/>
              </span>
              </div>
            </div>
          </div>
      )
    else return <div className='proposal-loading-down'>لطفا ابتدا عضو شوید!</div>
  }
}

const mapStateToProps = (state) => {
  const identityId = state.auth.client.identity.content
  const identities = state.identities.list
  const currentUser = identities[identityId]
  return {
    identityId,
    currentUser,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createComment: CommentActions.createComment,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(PostCommentNew)