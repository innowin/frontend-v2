import React, {Component} from "react"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import AttachFileIcon from "../../../images/common/attachFileNew_svg"
import PostSendIcon from "../../../images/common/postSend_svg"
import {bindActionCreators} from "redux"
import CommentActions from "../../../redux/actions/commonActions/commentActions"
import connect from "react-redux/es/connect/connect"

class PostCommentNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      commentBody: "comment-body",
      descriptionClass: "hide-message",
      comment: "",
    }
  }

  createComment(commentTextField) {
    if (commentTextField && commentTextField.value && commentTextField.value.length > 4 && commentTextField.value.length <= 750) {
      const {actions, post, commentParentType} = this.props
      const {createComment} = actions
      const formValues = {text: commentTextField.value, comment_parent: post.id}
      createComment({formValues, parentId: post.id, commentParentType})
      commentTextField.value = ""
    }
    else console.log("Handle Notification for Illegal Comment")
  }

  handleChangeText = (e) => {
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
    const {currentUserMedia} = this.props
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
            <textarea ref={e => this.text = e}
                      className={open ? "comment-text-area-open" : "comment-text-area"}
                      placeholder={"فرستادن دیدگاه"}
                      onChange={this.handleChangeText}
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
              <span onClick={() => this.createComment(this.text)}>
                  <PostSendIcon
                      className={comment.length > 4 ? "post-component-footer-send-attach" : "post-component-footer-send-attach-inactive"}/>
                </span>
            </div>
          </div>
        </div>
    )
  }
}

/*
 const mapStateToProps = (state) => {
 const client = state.auth.client
 const clientImgId = (client.user_type === "person") ? (client.profile.profile_media) : (
 (client.organization && client.organization.organization_logo) || null
 )
 const userId = (client.organization && client.organization.id) || (client.user && client.user.id)
 }
 */

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createComment: CommentActions.createComment,
  }, dispatch)
})
export default connect(null, mapDispatchToProps)(PostCommentNew)