// @flow
import * as React from "react"
import CommentActions from "src/redux/actions/commonActions/commentActions"
import {AttachFileIcon, DefaultUserIcon, PostSendIcon} from "src/images/icons"
import {bindActionCreators} from "redux"
import {Component} from "react"
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
  handleShowComment: Function,
  commentOn: commentType,
}

type states = {
  comment: string,
  commentBody: string,
  descriptionClass: string,
  open: boolean,
}

class PostCommentNew extends Component<props, states> {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      commentBody: "comment-body",
      descriptionClass: "hide-message",
      comment: "",
    }
    const self: any = this
    self._handleChangeText = self._handleChangeText.bind(self)
  }

  createComment(commentOn, commentTextField) {
    const {handleShowComment} = this.props
    if (commentTextField && commentTextField.value && commentTextField.value.length > 4 && commentTextField.value.length <= 750) {
      const {actions, post, commentParentType} = this.props
      const {createComment} = actions
      let formValues
      if (commentOn) {
        formValues = {text: commentTextField.value, comment_parent: post.id, comment_replied: commentOn.id}
      }
      else {
        formValues = {text: commentTextField.value, comment_parent: post.id}
      }
      commentTextField.value = ""
      createComment({formValues, parentId: post.id, commentParentType})
    }
    else console.log("Handle Notification for Illegal Comment")
    handleShowComment()
  }

  _handleChangeText(e) {
    const comment = e.target.value
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
    const {currentUserMedia, translate, commentOn} = this.props
    const self: any = this
    // console.log(currentUserMedia)
    return (
        <div className={"comment-container"}>
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
                      onBlur={(e) => e.target.value.length === 0 ? this.setState({
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
                          })}
            />
            <div className='comment-icons' contentEditable={false}>
                  <span onClick={() => console.log("Handle Show Menu")}>
                    <AttachFileIcon className='post-component-footer-send-attach'/>
                  </span>
              <span onClick={this.createComment.bind(this, commentOn, self.text)}>
                  <PostSendIcon className={comment.length > 4 ? "post-component-footer-send-attach" : "post-component-footer-send-attach-inactive"}/>
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