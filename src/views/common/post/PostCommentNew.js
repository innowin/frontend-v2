import React, {Component} from "react"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import AttachFileIcon from "../../../images/common/attachFileNew_svg"
import PostSendIcon from "../../../images/common/postSend_svg"
import {bindActionCreators} from "redux"
import CommentActions from "../../../redux/actions/commonActions/commentActions"
import connect from "react-redux/es/connect/connect"
import {getMessages} from "../../../redux/selectors/translateSelector"

class PostCommentNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      commentBody: "comment-body",
    }
  }

  createComment(commentTextField) {
    if (commentTextField && commentTextField.value) {
      const {actions, post, commentParentType} = this.props
      const {createComment} = actions
      const formValues = {text: commentTextField.value, comment_parent: post.id}
      createComment({formValues, parentId: post.id, commentParentType})
      commentTextField.value = ""
    }
    else console.log("Handle Notification for Illegal Comment")
  }

  render() {
    const {commentBody, open} = this.state
    const {currentUserMedia} = this.props
    return (
        <div className={"comment-container"}>
          <div style={{display: "inline-block", width: "11%"}}>
            {currentUserMedia !== null && currentUserMedia !== undefined ?
                <img alt='profile' src={currentUserMedia} className={"comment-owner"}/>
                :
                <DefaultUserIcon width='45px' height='45px'/>
            }
          </div>
          <div className={commentBody}>
              <textarea ref={e => this.text = e}
                        className={open ? "comment-text-area-open" : "comment-text-area"}
                        placeholder={"فرستادن دیدگاه"}
                        onFocus={() => this.setState({...this.state, commentBody: "comment-body-focused"})}
                        onBlur={(e) => e.target.value.length === 0 ? this.setState({
                          ...this.state,
                          open: false,
                          commentBody: "comment-body"
                        }) : this.setState({...this.state, open: true, commentBody: "comment-body"})}
              />
            <div className='comment-icons' contentEditable={false}>
                  <span onClick={() => console.log("Handle Show Menu")}>
                    <AttachFileIcon className='post-component-footer-send-attach'/>
                  </span>
              <span onClick={() => this.createComment(this.text)}>
                  <PostSendIcon className='post-component-footer-send-attach'/>
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