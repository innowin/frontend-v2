import React, {Component} from "react"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import AttachFile from "src/views/common/inputs/AttachFile"
import AttachFileIcon from "../../../images/common/attachFile_svg"
import ContributionIcon from "../../../images/common/contribution_svg"
import DemandIcon from "../../../images/common/demand_svg"
import FileActions from "src/redux/actions/commonActions/fileActions"
import FontAwesome from "react-fontawesome"
import Image from "src/images/common/image_upload_svg"
import PostActions from "src/redux/actions/commonActions/postActions"
import Share from "src/images/common/share"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import socialActions from "src/redux/actions/commonActions/socialActions"
import SupplyIcon from "../../../images/common/supply_svg"
import {getMessages} from "src/redux/selectors/translateSelector"
import "src/styles/components/common/comment.scss"
import PostSendIcon from "../../../images/common/postSend_svg"
import CommentActions from "../../../redux/actions/commonActions/commentActions"
import {createFileFunc} from "src/views/common/Functions"
import types from "../../../redux/actions/types"

const timeStamp = new Date().toISOString()


class CreatePostNew extends Component {
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
      search: "",
      context: false,
      pageX: 0,
      pageY: 0,
      commentBody: "comment-body",
      placeholder: '',
      selectedText: '',
      postPhotos: []
    }
  }

  componentDidMount() {
    const {actions, componentType, translate} = this.props
    const {getFollowers} = actions
    getFollowers({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId
    })
    document.addEventListener("mousedown", this.handleClickOutside)
    componentType === "comment" && this.setState({...this.state, placeholder: translate["Send comment"]})
    componentType === "post" && this.setState({...this.state, placeholder: translate["Be in zist boom"]})
  }

  componentDidUpdate(prevProps) {
    const {postsCountInThisPage} = this.props
    if (prevProps.postsCountInThisPage < postsCountInThisPage) {
      this._resetPost()
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }


  _resetPost = () => {
    this.setState({...this.state, open: false, selected: 'post', postPhotos: []})
    this.text.innerText = ''
  }

  handleClickOutside = (event) => {
    const {postPhotos} = this.state
    const description = this.text ? this.text.innerText : null

    if (this.setWrapperRef && !this.setWrapperRef.contains(event.target)) {
      if (this.state.attachMenu) {
        this.setState({...this.state, attachMenu: !this.state.attachMenu})
      }
    }

    if (this.setWrapperSecondRef && !this.setWrapperSecondRef.contains(event.target)) {
      if (this.state.contactMenu) {
        this.setState({...this.state, contactMenu: !this.state.contactMenu})
      }
    }

    if (!postPhotos && !description) this._resetPost()
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


  handleLabel(name) {
    let temp = {...this.state.labels}
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

  AttachPhotoButton = () => (
      <div>
        <Image className='post-component-footer-logos'/>
        عکس
      </div>
  )

  _getValues = () => {
    const {selected} = this.state
    const {currentUserIdentity, postParentId, currentUserImgId, postPhotoIds} = this.props
    const description = this.text.value
    return {
      post_picture: postPhotoIds[0] || null,
      post_description: description,
      post_title: "without title",
      post_type: selected,
      post_parent: postParentId,
      post_identity: currentUserIdentity,
      post_related_identity_image: currentUserImgId
    }
  }

  _formValidate = () => {
    // const {descriptionValidate} = this.state
    let result = true
    const validates = [
      this.AttachPhotoInput.validate,
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

  _save = () => {
    const {actions, currentUserId, currentUserType, postParentId, postParentType} = this.props
    const {createPost, createFile} = actions
    const {postPhotos} = this.state
    const nextActionTypesForPosPictures = types.COMMON.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionDataForPostPictures = {tempFileChildName: timeStamp}
    const fileIdKey = 'fileId'
    const postPicturesCreateArguments = {
      fileIdKey,
      nextActionType:nextActionTypesForPosPictures,
      nextActionData:nextActionDataForPostPictures,
    }
    postPhotos.map(fileString => {
      return createFileFunc(createFile, fileString, postPicturesCreateArguments)
    })
    const formValues = this._getValues()
    return createPost({
      formValues, postOwnerId: currentUserId, postOwnerType: currentUserType, postParentId, postParentType
    })
  }

  _onSubmit = (e) => {
    e.preventDefault()
    if (this._formValidate()) {
      this._save()
    }
    return false
  }

  _handleBase64 = (fileString) => {
    const {postPhotos} = this.state
    this.setState({...this.state, postPhotos: [...postPhotos, fileString]})
  }


  createComment(commentTextField) {
    if (commentTextField && commentTextField.value) {
      const {actions, post, commentParentType} = this.props
      const {createComment} = actions
      const formValues = {text: commentTextField.value, comment_parent: post.id}
      createComment({formValues, parentId: post.id, commentParentType})
      commentTextField.value = ""
    }
  }

  _deletePicture = (i) => {
    const {postPhotos} = this.state
    const newPostPhotos = postPhotos.slice(0, i).concat(postPhotos.slice(i + 1))
    this.setState({...this.state, postPhotos: newPostPhotos})
  }

  render() {
    const followersArr = Object.values(this.props.followers).filter(follow => follow.follow_follower.id !== this.props.currentUserIdentity && follow.follow_follower.name.includes(this.state.search))
    const exchangesArr = Object.values(this.props.exchanges).filter(exchange => exchange.exchange_identity_related_exchange.name.includes(this.state.search))
    const {className, componentType, currentUserMedia, currentUserName} = this.props
    const {postPhotos} = this.state

    switch (componentType) {
      case "post":
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
                      className={this.state.selected === "post" ? "post-component-header-item-logo1" : "post-component-header-item-logo1-unselect"}
                      onClick={this.handleSelectShare}/>
                  <DemandIcon height="22px"
                              className={this.state.selected === "demand" ? "post-component-header-item-logo" : "post-component-header-item-logo-unselect"}
                              onClickFunc={this.handleSelectDemand}/>
                  <SupplyIcon height="18px"
                              className={this.state.selected === "supply" ? "post-component-header-item-logo2" : "post-component-header-item-logo2-unselect"}
                              onClickFunc={this.handleSelectSupply}/>
                </div>
              </div>

              <textarea ref={e => this.text = e}
                        className={this.state.open ? "post-component-textarea-open" : "post-component-textarea"}
                        placeholder='در زیست بوم باش ...'
                        onBlur={(e) => e.target.value.length === 0 ? this.setState({
                          ...this.state,
                          open: false
                        }) : this.setState({...this.state, open: true})}/>


              <div className='post-component-footer'>

                <div className='post-component-footer-logo' onClick={this.handleContact}>?</div>
                <div className='post-component-footer-items-style-cont'>
                  {
                    Object.values(this.state.labels).map(label =>
                        <div className='post-component-footer-items-style'>
                          <div className='post-component-footer-items-style-text'>{label}</div>
                          <div className='post-component-footer-items-style-close'
                               onClick={() => this.handleLabel(label)}>✕
                          </div>
                        </div>)
                  }

                  <div className='post-component-footer-items-style-hide'/>

                  <div className='post-component-footer-send'>
                    <div style={{display: "inline-block"}} onClick={this.handleAttach}>
                      <AttachFileIcon className='post-component-footer-send-attach'/>
                    </div>
                    <button type="submit" className='post-component-footer-send-btn'>ارسال</button>

                    <div ref={e => this.setWrapperRef = e}
                         className={this.state.attachMenu ? "post-component-footer-attach-menu-container" : "post-component-footer-attach-menu-container-hide"}>
                      <div className='post-component-footer-attach-menu'>
                        <div className='explore-menu-items'>
                          <AttachFileIcon className='post-component-footer-logos'/>
                          فایل
                        </div>
                        <AttachFile
                          ref={e => this.AttachPhotoInput = e}
                          AttachButton={this.AttachPhotoButton}
                          inputId='AttachPicturesInput'
                          // isLoadingProp={postPhotoLoading}
                          className='explore-menu-items'
                          handleBase64={this._handleBase64}
                        />
                        <div className='explore-menu-items'>
                          <ContributionIcon className='post-component-footer-logos'/>
                          ویدئو
                        </div>
                        <div className='explore-menu-items'>
                          <ContributionIcon className='post-component-footer-logos'/>
                          محصول
                        </div>
                        <div className='explore-menu-items'>
                          <ContributionIcon className='post-component-footer-logos'/>
                          لینک
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="post-attached-pictures">
                  {
                    postPhotos.map((fileString, i) => {
                        return (
                          <div>
                            <span onClick={() => this._deletePicture(i)} className='remove-post-picture pulse'>x</span>
                            <img src={fileString} alt="imagePreview"/>
                          </div>
                        )
                      }
                    )
                  }
                  </div>

                  <div ref={e => this.setWrapperSecondRef = e}
                       className={this.state.contactMenu ? "post-component-footer-contact-menu-container" : "post-component-footer-contact-menu-container-hide"}>
                    <div className='post-component-footer-contact-menu'>
                      <div className='post-component-footer-contact-menu-icon'>
                        ?
                        <span>  </span>
                        مخاطبین
                      </div>
                      <div className='post-component-footer-searchbox'>
                        <input type='text' className='post-component-footer-searchbox-input' placeholder='جستجو'
                               onChange={(e) => this.setState({...this.state, search: e.target.value})}
                               onKeyUp={this.submitSearchByWord}/>
                        <FontAwesome name="search" className='post-component-footer-searchbox-icon'/>
                      </div>

                      <div className='post-component-footer-contact-menu-content'>
                        <div className='post-component-footer-check-container'>
                          {
                            "عمومی".includes(this.state.search) ? <label className='post-component-footer-checkbox'>
                                  <input type="checkbox" checked={this.state.labels["عمومی"] !== undefined}
                                         onClick={() => this.handleLabel("عمومی")}/>
                                  <span className='checkmark'/>
                                  عمومی
                                </label>
                                : null
                          }

                          {
                            "دنبال کنندگان".includes(this.state.search) ?
                                <label className='post-component-footer-checkbox'>
                                  <input type="checkbox" checked={this.state.labels["دنبال کنندگان"] !== undefined}
                                         onClick={() => this.handleLabel("دنبال کنندگان")}/>
                                  <span className='checkmark'/>
                                  دنبال کنندگان
                                </label>
                                : null
                          }

                          {
                            "دنبال کنندگانِ دنبال کنندگان".includes(this.state.search) ?
                                <label className='post-component-footer-checkbox'>
                                  <input type="checkbox"
                                         checked={this.state.labels["دنبال کنندگانِ دنبال کنندگان"] !== undefined}
                                         onClick={() => this.handleLabel("دنبال کنندگانِ دنبال کنندگان")}/>
                                  <span className='checkmark'/>
                                  دنبال کنندگانِ دنبال کنندگان
                                </label>
                                : null
                          }
                        </div>

                        <div className='post-component-footer-contact-menu-content-title'
                             style={{display: exchangesArr.length > 0 ? "block" : "none"}}>بورس ها
                        </div>

                        <div className='post-component-footer-check-container'>
                          {
                            exchangesArr.map(exchange =>
                                <label className='post-component-footer-checkbox'>
                                  <input type="checkbox"
                                         checked={this.state.labels[exchange.exchange_identity_related_exchange.name] !== undefined || this.state.labels["عمومی"]}
                                         onClick={() => this.handleLabel(exchange.exchange_identity_related_exchange.name)}/>
                                  <span className='checkmark'/>
                                  {exchange.exchange_identity_related_exchange.name}
                                </label>
                            )
                          }
                        </div>

                        <div className='post-component-footer-contact-menu-content-title'
                             style={{display: followersArr.length > 0 ? "block" : "none"}}>دنبال کنندگان
                        </div>

                        <div className='post-component-footer-check-container'>
                          {
                            followersArr.map(follow => {
                                  return (
                                      <label className='post-component-footer-checkbox'>
                                        <input type="checkbox"
                                               checked={this.state.labels[follow.follow_follower.name] !== undefined || this.state.labels["عمومی"]}
                                               onClick={() => this.handleLabel(follow.follow_follower.name)}/>
                                        <span className='checkmark'/>
                                        {follow.follow_follower.name}
                                      </label>
                                  )
                                }
                            )
                          }
                        </div>

                      </div>

                      <div style={{textAlign: "left"}}>
                        <button className='post-component-footer-cancel-btn'>لغو</button>
                        <button className='post-component-footer-submit-btn'>ثبت</button>
                      </div>

                    </div>
                  </div>

                </div>

                <div style={{clear: "both"}}/>
              </div>

            </form>
        )
      case "comment":
        return (
            <div className={"comment-container"}>
              <div style={{display: "inline-block", width: "11%"}}>
                {this.props.currentUserMedia !== null && this.props.currentUserMedia !== undefined ?
                    <img alt='profile' src={this.props.currentUserMedia} className={"comment-owner"}/>
                    :
                    <DefaultUserIcon width='45px' height='45px'/>
                }
              </div>
              <div className={this.state.commentBody}>
              <textarea ref={e => this.text = e}
                        className={this.state.open ? "comment-text-area-open" : "comment-text-area"}
                        placeholder={this.state.placeholder}
                        onFocus={() => this.setState({...this.state, commentBody: "comment-body-focused"})}
                        onBlur={(e) => e.target.value.length === 0 ? this.setState({
                          ...this.state,
                          open: false,
                          commentBody: "comment-body"
                        }) : this.setState({...this.state, open: true, commentBody: "comment-body"})}/>
                <div className='comment-icons' contentEditable={false}>
                  <span onClick={this.handleAttach}><AttachFileIcon
                      className='post-component-footer-send-attach'/></span>
                  <span onClick={() => this.createComment(this.text)}><PostSendIcon
                      className='post-component-footer-send-attach'/></span>
                  <div ref={e => this.setWrapperRef = e}
                       className={this.state.attachMenu ? "post-component-footer-attach-menu-container" : "post-component-footer-attach-menu-container-hide"}>
                    <div className='post-component-footer-attach-menu'>
                      <div className='explore-menu-items'>
                        <AttachFileIcon className='post-component-footer-logos'/>
                        فایل
                      </div>
                      <AttachFile
                        ref={e => this.AttachPhotoInput = e}
                        AttachButton={this.AttachPhotoButton}
                        inputId='AttachPicturesInput'
                        // isLoadingProp={postPhotoLoading}
                        className='explore-menu-items'
                        handleBase64={this._handleBase64}
                      />
                      <div className='explore-menu-items'>
                        <ContributionIcon className='post-component-footer-logos'/>
                        ویدئو
                      </div>
                      <div className='explore-menu-items'>
                        <ContributionIcon className='post-component-footer-logos'/>
                        محصول
                      </div>
                      <div className='explore-menu-items'>
                        <ContributionIcon className='post-component-footer-logos'/>
                        لینک
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{clear: "both"}}/>
              {
                postPhotos.map((fileString, i) => {
                    return (
                      <div>
                        <span onClick={() => this._deletePicture(i)} className='remove-post-picture pulse'>x</span>
                        <img src={fileString} alt="imagePreview"/>
                      </div>
                    )
                  }
                )
              }
            </div>
        )
      default:
        return (
            <h2>
              Component Type Needed
            </h2>
        )
    }
  }

  handleEmail = () => {
    let email = "mailto:" + this.state.selectedText
    let outEmail = `<a href=${email}>${this.state.selectedText}</a>`
    this.text.innerHTML = this.text.innerText.replace(this.state.selectedText, outEmail)
  }

  handlePhone = () => {
    let email = "tel:" + this.state.selectedText
    let outEmail = `<a href=${email}>${this.state.selectedText}</a>`
    this.text.innerHTML = this.text.innerText.replace(this.state.selectedText, outEmail)
  }
}

const mapStateToProps = (state) => {

  const client = state.auth.client
  const clientImgId = (client.user_type === "person") ? (client.profile.profile_media) : (
      (client.organization && client.organization.organization_logo) || null
  )

  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  const tempPostPictures = state.temp.file[timeStamp]
  const postPhotoIds = tempPostPictures || []

  return ({
    currentUserType: client.user_type,
    currentUserIdentity: client.identity.content,
    currentUserId: userId,
    currentUserImgId: clientImgId,
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: client.user.first_name + " " + client.user.last_name,
    exchanges: state.common.exchangeMembership.list,
    followers: state.common.social.follows.list,
    postPhotoIds,
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
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostNew)