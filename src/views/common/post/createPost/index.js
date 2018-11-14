import React, {Component} from "react"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import AttachFileIcon from "src/images/common/attachFileNew_svg"
import DemandIcon from "src/images/common/demand_svg"
import FileActions from "src/redux/actions/commonActions/fileActions"
import PostActions from "src/redux/actions/commonActions/postActions"
import Share from "src/images/common/share"
import DefaultUserIcon from "src/images/defaults/defaultUser_svg"
import socialActions from "src/redux/actions/commonActions/socialActions"
import SupplyIcon from "src/images/common/supply_svg"
import {getMessages} from "src/redux/selectors/translateSelector"
import PostSendIcon from "src/images/common/postSend_svg"
import CommentActions from "src/redux/actions/commonActions/commentActions"
import {createFileFunc} from "src/views/common/Functions"
import PostCommentNew from "src/views/common/post/PostCommentNew"
import types from "src/redux/actions/types"
import AttachMenu from "./attachMenu"
import ContactMenu from "./contactMenu"
import LinkModal from "./linkModal"
import ViewAttachedFiles from "./viewAttachedFiles"

const timeStamp = new Date().toISOString()


class CreatePost extends Component {
  static defaultProps = {
    className: "",
    postsCountInThisPage: 0
  }

  static propTypes = {
    postParentId: PropTypes.number.isRequired,
    postParentType: PropTypes.string,
    postsCountInThisPage: PropTypes.number,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: "post",
      open: false,
      attachMenu: false,
      enterAttach: true,
      contactMenu: false,
      labels: {},
      context: false,
      linkModal: false,
      pageX: 0,
      pageY: 0,
      commentBody: "comment-body",
      placeholder: "",
      selectedText: "",
      postPictures: [],
      errorAttachPicture: "",
      postFile: "",
      errorAttachFile: "",
      postMedia: "",
      errorAttachMedia: "",
      link: "",
      savingPost: false
    }
  }


  _resetPost = () => {
    this.setState({
      ...this.state,
      open: false,
      selected: "post",
      postPictures: [],
      postFile: "",
      postMedia: "",
      link: "",
      labels: {},
    })
    this.text.innerText = ""
  }

  handleClickOutside = (event) => {
    const {attachMenu, contactMenu, linkModal, postPictures, postFile, postMedia, link, labels, savingPost} = this.state
    const description = this.text ? this.text.innerText : null
    const needReset = !savingPost && !description && !postPictures && !postFile && !postMedia && !link && labels === {}

    if (this.setWrapperRef && !this.setWrapperRef.contains(event.target)) {
      if (attachMenu) {
        this.setState({...this.state, attachMenu: false})
      }
    }

    if (this.setWrapperSecondRef && !this.setWrapperSecondRef.contains(event.target)) {
      if (contactMenu) {
        this.setState({...this.state, contactMenu: false})
      }
    }

    if (this.setWrapperThirdRef && !this.setWrapperThirdRef.contains(event.target)) {
      if (linkModal) {
        this.setState({...this.state, linkModal: false})
      }
    }

    if (needReset) this._resetPost()
  }

  handleSelectShare = () => {
    this.setState({...this.state, selected: "post"})
  }

  handleSelectDemand = () => {
    this.setState({...this.state, selected: "demand"})
  }

  handleSelectSupply = () => {
    this.setState({...this.state, selected: "supply"})
  }

  handleAttach = () => {
    this.setState({...this.state, attachMenu: !this.state.attachMenu})
  }

  handleContact = () => {
    this.setState({...this.state, contactMenu: !this.state.contactMenu})
  }


  _handleLabel = (name) => {
    const {labels} = this.state
    let temp = {...labels}
    if (temp[name] === undefined) {
      if (name === "دنبال کنندگان" || name === "دنبال کنندگانِ دنبال کنندگان" || temp["عمومی"] === undefined)
        temp[name] = name
    }
    else {
      if (name !== "دنبال کنندگان" && name !== "دنبال کنندگانِ دنبال کنندگان")
        delete temp["عمومی"]
      delete temp[name]
    }
    this.setState({...this.state, labels: {...temp}})
  }

  _linkModalFunc = () => {
    this.setState({...this.state, linkModal: true, attachMenu: false})
  }


  _deletePicture = (i) => {
    const {postPictures} = this.state
    const newPostPictures = postPictures.slice(0, i).concat(postPictures.slice(i + 1))
    this.setState({...this.state, postPictures: newPostPictures})
  }

  _deleteFile = () => {
    this.setState({...this.state, postFile: ""})
  }

  _deleteMedia = () => {
    this.setState({...this.state, postMedia: ""})
  }


  _getValues = () => {
    const {selected, link} = this.state
    const {currentUserIdentity, postParentId, currentUserImgId, postPictureIds} = this.props
    const description = this.text.value
    const post_link = link.trim() !== "" ? link : null
    return {
      post_picture: postPictureIds[0] || null,
      post_description: description,
      post_title: "without title",
      post_type: selected,
      post_parent: postParentId,
      post_identity: currentUserIdentity,
      post_related_identity_image: currentUserImgId,
      post_link,
    }
  }

  _formValidate = () => {
    const {descriptionValidate, errorAttachFile, errorAttachMedia, errorAttachPicture} = this.state
    let result = true
    const validates = [
      errorAttachFile,
      errorAttachMedia,
      errorAttachPicture,
      // descriptionValidate
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }


  _preSave = () => {
    this.setState({...this.state, savingPost: true})
    const {postPictures} = this.state
    const {actions} = this.props
    const {createFile} = actions
    const nextActionTypesForPosPictures = types.COMMON.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionDataForPostPictures = {tempFileChildName: timeStamp}
    const fileIdKey = "fileId"
    const postPicturesCreateArguments = {
      fileIdKey,
      nextActionType: nextActionTypesForPosPictures,
      nextActionData: nextActionDataForPostPictures,
    }
    postPictures.map(fileString => {
      return createFileFunc(createFile, fileString, postPicturesCreateArguments)
    })
  }

  _save = () => {
    const {actions, currentUserId, currentUserType, postParentId, postParentType} = this.props
    const {createPost} = actions
    const formValues = this._getValues()
    createPost({
      formValues, postOwnerId: currentUserId, postOwnerType: currentUserType, postParentId, postParentType
    })
    this.setState({...this.state, savingPost: false})
  }

  _onSubmit = (e) => {
    e.preventDefault()
    if (this._formValidate()) {
      this._preSave()
    }
    return false
  }


  componentDidUpdate(prevProps) {
    const {postsCountInThisPage, postPictureIds} = this.props
    const {postPictures, savingPost} = this.state

    if (prevProps.postsCountInThisPage < postsCountInThisPage) {
      this._resetPost()
    }

    if (savingPost && postPictures.length === postPictureIds.length) {
      this._save()
    }
  }

  componentDidMount() {
    const {actions, translate} = this.props
    document.addEventListener("mousedown", this.handleClickOutside)
    this.setState({...this.state, placeholder: translate["Be in zist boom"]})
    const {getFollowers} = actions
    getFollowers({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId
    })
    // componentType === "comment" && this.setState({...this.state, placeholder: translate["Send comment"]})
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }


  render() {
    const {className, followers, exchanges, currentUserIdentity, currentUserMedia, currentUserName, translate} = this.props
    const {
      postPictures, open, attachMenu, selected, labels, link, contactMenu, linkModal
      , postFile, postMedia, errorAttachPicture, errorAttachFile, errorAttachMedia
    } = this.state

    return (
        <form className={"post-component-container " + className} onSubmit={this._onSubmit}>
          <div className='post-component-header'>
            <div>
              {currentUserMedia !== null && currentUserMedia !== undefined ?
                  <img alt='profile' src={currentUserMedia} className='post-component-header-img'/>
                  :
                  <DefaultUserIcon width='45px' height='45px'/>
              }
              {currentUserName}
            </div>
            <div className='post-component-header-item'>
              <Share
                  className={selected === "post" ? "post-component-header-item-logo1" : "post-component-header-item-logo1-unselect"}
                  onClick={this.handleSelectShare}/>
              <DemandIcon height="22px"
                          className={selected === "demand" ? "post-component-header-item-logo" : "post-component-header-item-logo-unselect"}
                          onClickFunc={this.handleSelectDemand}/>
              <SupplyIcon height="18px"
                          className={selected === "supply" ? "post-component-header-item-logo2" : "post-component-header-item-logo2-unselect"}
                          onClickFunc={this.handleSelectSupply}/>
            </div>
          </div>

          <textarea ref={e => this.text = e}
                    className={open ? "post-component-textarea-open" : "post-component-textarea"}
                    placeholder='در زیست بوم باش ...'
                    onBlur={(e) => e.target.value.length === 0 ? this.setState({
                      ...this.state,
                      open: false
                    }) : this.setState({...this.state, open: true})}/>

          <div className='post-component-footer'>

            <div className='post-component-footer-logo' onClick={this.handleContact}>?</div>
            <div className='post-component-footer-items-style-cont'>

              {
                Object.values(labels).map(label =>
                    <div className='post-component-footer-items-style'>
                      <div className='post-component-footer-items-style-text'>{label}</div>
                      <div className='post-component-footer-items-style-close'
                           onClick={() => this._handleLabel(label)}>✕
                      </div>
                    </div>
                )
              }
              <div className='post-component-footer-items-style-hide'>
                <div className='post-component-footer-items-style-text'><span> </span></div>
              </div>

              <div className='post-component-footer-send'>

                <div className='post-component-footer-link'>{link}</div>

                <div style={{display: "inline-block"}} onClick={this.handleAttach}>
                  <AttachFileIcon className='post-component-footer-send-attach'/>
                </div>
                <button type="submit" className='post-component-footer-send-btn'>ارسال</button>
                <AttachMenu
                    ref={e => this.setWrapperRef = (e ? e.attachMenuRef : e)}
                    attachMenu={attachMenu}
                    handleFile={(fileString, error) =>
                        this.setState({...this.state, postFile: fileString, errorAttachFile: error})
                    }
                    handleMedia={(fileString, error) =>
                        this.setState({...this.state, postMedia: fileString, errorAttachMedia: error})
                    }
                    handlePictures={(fileString, error) =>
                        this.setState({
                          ...this.state, postPictures: [...postPictures, fileString],
                          errorAttachPicture: error
                        })
                    }
                    linkModalFunc={this._linkModalFunc}
                    translate={translate}
                />
              </div>
              <ContactMenu
                  ref={e => this.setWrapperSecondRef = (e ? e.contactMenuRef : e)}
                  contactMenu={contactMenu}
                  labels={labels}
                  followers={followers}
                  exchanges={exchanges}
                  currentUserIdentity={currentUserIdentity}
                  handleLabel={this._handleLabel}
              />
            </div>
            <div style={{clear: "both"}}/>
          </div>

          <ViewAttachedFiles
              postPictures={postPictures}
              errorAttachPicture={errorAttachPicture}
              postMedia={postMedia}
              errorAttachMedia={errorAttachMedia}
              postFile={postFile}
              errorAttachFile={errorAttachFile}
              deletePicture={this._deletePicture}
              deleteMedia={this._deleteMedia}
              deleteFile={this._deleteFile}
          />

          <LinkModal
              ref={e => this.setWrapperThirdRef = e ? e.linkModalRef : e}
              linkModal={linkModal}
              cancelFunc={() => this.setState({...this.state, linkModal: false})}
              submitFunc={(linkString) => this.setState({...this.state, link: linkString, linkModal: false})}
          />

        </form>
    )
  }
}

const mapStateToProps = (state) => {

  const client = state.auth.client
  const clientImgId = (client.user_type === "person") ? (client.profile.profile_media) : (
      (client.organization && client.organization.organization_logo) || null
  )

  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  const tempPostPictures = state.temp.file[timeStamp]
  const postPictureIds = tempPostPictures || []

  return ({
    currentUserType: client.user_type,
    currentUserIdentity: client.identity.content,
    currentUserId: userId,
    currentUserImgId: clientImgId,
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: client.user.first_name + " " + client.user.last_name,
    exchanges: state.common.exchangeMembership.list,
    followers: state.common.social.follows.list,
    postPictureIds,
    translate: getMessages(state)
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowers: socialActions.getFollowers,
    createPost: PostActions.createPost,
    createFile: FileActions.createFile,
    createComment: CommentActions.createComment,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)