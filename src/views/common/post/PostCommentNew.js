// @flow
import * as React from "react"
import CommentActions from "src/redux/actions/commonActions/commentActions"
import {AttachFileIcon, DefaultUserIcon, PostSendIcon} from "src/images/icons"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import type {commentType} from "src/consts/flowTypes/common/comment";
import constants from 'src/consts/constants'

type props = {
  actions: any,
  commentParentType: ?string,
  currentUserMedia: ?number,
  post: { id: number },
  translate: { [string]: string },
  commentOn: commentType,
  removeCommentOn: Function,
  instantViewComments: boolean,
  extendedView: boolean,
}

type states = {
  comment: string,
  commentBody: string,
  descriptionClass: string,
  open: boolean,
  replySender: string,
}

class PostCommentNew extends React.Component<props, states> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      commentBody: "comment-body",
      descriptionClass: "hide-message",
      comment: '',
      replySender: '',
    }
    const self: any = this
    self._handleChangeText = self._handleChangeText.bind(self)
  }

  componentDidMount() {
    const self: any = this
    const {commentOn} = this.props
    if (self.text) {
      self.text.focus()
    }
    if (commentOn && self.text) {
      self.text.focus()
      const replySender = commentOn.comment_sender.username + '@ '
      self.text.value = replySender
      this.setState({...this.state, replySender})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const self: any = this
    const {commentOn} = this.props
    if (commentOn && self.text) {
      self.text.focus()
    }
    if (commentOn !== prevProps.commentOn && commentOn) {
      const replySender = commentOn.comment_sender.username + '@ '
      self.text.value = replySender
      this.setState({...this.state, replySender})
    }
  }

  createComment(commentOn, commentText, commentTextField) {
    const {extendedView} = this.props
    if (commentText.length > 4 && commentText.length <= 750) {
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
      } else {
        formValues = {text: commentText, comment_parent: post.id}
      }
      commentTextField.value = ""
      createComment({formValues, parentId: post.id, commentParentType: constants.COMMENT_PARENT.POST, getComments: extendedView})
    } else console.log("Handle Notification for Illegal Comment")
  }

  _handleChangeText(e) {
    let comment = e.target.value
    const {removeCommentOn} = this.props
    const {replySender} = this.state
    if (replySender) {
      if (!comment.startsWith(replySender)) {
        removeCommentOn()
        this.setState({...this.state, replySender: ''})
      } else {
        comment = comment.substr(replySender.length)
      }
    }

    if (comment.length < 751) this.setState({...this.state, comment}, () => checkCharacter(comment))
    else e.target.value = this.state.comment
    const checkCharacter = (description) => {
      const descriptionLength = description.trim().length
      if (descriptionLength === 0)
        this.setState({...this.state, descriptionClass: "hide-message"})
      if (descriptionLength > 0 && descriptionLength < 5)
        this.setState({...this.state, open: true, descriptionClass: "error-message"})
      if (descriptionLength >= 5 && descriptionLength < 10)
        this.setState({...this.state, descriptionClass: "neutral-message"})
      if (descriptionLength >= 10 && descriptionLength <= 740)
        this.setState({...this.state, descriptionClass: "neutral-message"})
      if (descriptionLength > 740 && descriptionLength <= 750)
        this.setState({...this.state, descriptionClass: "warning-message"})
      // else if (descriptionLength > 750)
      //   this.setState({...this.state, descriptionClass: "error-message"})
    }
  }

  render() {
    const {commentBody, open, descriptionClass, comment} = this.state
    const {currentUserMedia, translate, commentOn, instantViewComments} = this.props
    const self: any = this
    // console.log(currentUserMedia)
    return (
        <div className="comment-container">
          <div>
            {currentUserMedia !== null && currentUserMedia !== undefined ?
                <img alt='profile' src={currentUserMedia} className={"comment-owner"}/>
                :
                <DefaultUserIcon width='45px' height='45px'/>
            }
          </div>
          <div className={commentBody}>
            {descriptionClass &&
            <span className={descriptionClass + " description-character"}> {comment.trim().length + "/750"} </span>
            }
            <textarea ref={e => self.text = e}
                      className={open ? "comment-text-area-open" : "comment-text-area"}
                      placeholder={translate["Send comment"]}
                      onChange={this._handleChangeText}
                      onFocus={() => this.setState({
                        ...this.state,
                        commentBody: "comment-body-focused",
                        descriptionClass: comment.length < 5 ?
                            comment.length === 0 ? "hide-message" : "error-message" :
                            comment.length > 750 ? "error-message" : "neutral-message"
                      })}
                      onBlur={(e) => (e.target.value.length === 0 && !instantViewComments) ? this.setState({
                            ...this.state,
                            open: false,
                            commentBody: "comment-body",
                            descriptionClass: "hide-message",
                          })
                          : this.setState({
                            ...this.state,
                            open: true,
                            commentBody: "comment-body",
                            descriptionClass: "hide-message",
                          })
                      }
            />
            <div className='comment-icons' contentEditable={false}>
                  <span onClick={() => console.log("Handle Show Menu")}>
                    <AttachFileIcon className='post-component-footer-send-attach'/>
                  </span>
              <span onClick={this.createComment.bind(this, commentOn, comment, self.text)}>
                  <PostSendIcon className={comment.length > 4 ? "post-component-footer-send-attach"
                      : "post-component-footer-send-attach-inactive"}/>
                </span>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const identityId = state.auth.client.identity.content
  const client = state.auth.client
  const identities = state.identities.list
  const clientImgId = (client.user_type === constants.USER_TYPES.USER) ? (identities[identityId].profile_media) : (
      (identities[identityId].organization_logo) || null)
  const {common} = state
  const {file} = common
  const currentUserMedia = file.list[clientImgId] ? file.list[clientImgId].file : null
  return {
    currentUserMedia,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createComment: CommentActions.createComment,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(PostCommentNew)