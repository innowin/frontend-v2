// @flow
import React, {Component} from "react"
import PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import AttachFileIcon from "src/images/common/attachFileNew_svg"
import FileActions from "src/redux/actions/commonActions/fileActions"
import PostActions from "src/redux/actions/commonActions/postActions"
import DefaultUserIcon from "src/images/defaults/defaultUser_svg"
import socialActions from "src/redux/actions/commonActions/socialActions"
import {getMessages} from "src/redux/selectors/translateSelector"
import CommentActions from "src/redux/actions/commonActions/commentActions"
import TempActions from "src/redux/actions/tempActions"
import {createFileFunc} from "src/views/common/Functions"
import types from "src/redux/actions/types"
import AttachMenu from "./attachMenu"
import ContactMenu from "./contactMenu"
import LinkModal from "./linkModal"
import ViewAttachedFiles from "./viewAttachedFiles"
import StickersMenu from "../../components/StickersMenu"
import AddProductModal from "./addProductModal"
import ProductInfoView from "../../contributions/ProductInfoView"
import constants from '../../../../consts/constants'

const POST_MEDIA_TEMP_KEY = "POST_MEDIA"
const POST_FILE_TEMP_KEY = "POST_FILE"
const POST_IMG1_TEMP_KEY = "POST_IMG1"
const POST_IMG2_TEMP_KEY = "POST_IMG2"
const POST_IMG3_TEMP_KEY = "POST_IMG3"

const minAllowedWordCounts = 5 // TODO: Mohsen should be 3
const maxAllowedWordCounts = 4096
const minAllowedHeaderWordCounts = 5
const maxAllowedHeaderWordCounts = 70


type createPostPropsTypes = {
  postParentId: number,
  postParentType?: string,
  postsCountInThisPage: ? number,
  className?: string
}

type createPostStateTypes = {
  open: boolean,
  attachMenu: boolean,
  enterAttach: boolean,
  contactMenu: boolean,
  labels: {},
  context: boolean,
  linkModal: boolean,
  addProductModal: boolean,
  pageX: number,
  pageY: number,
  commentBody: string,
  placeholder: string,
  selectedText: string,
  postImg1: {} | null,
  postImg2: {} | null,
  postImg3: {} | null,
  postFile: string,
  postMedia: string,
  link: string,
  description: string,
  descriptionHeader: string,
  descriptionClass: string,
  descriptionHeaderClass: string,
  profileLoaded: boolean,
  focused: boolean,
  keys: [],
  selectedProduct?: {},
  selectedProductId?: number,
  scrollHeight: number,
  textLength: number,
  postType: string,
}


class CreatePost extends Component<createPostPropsTypes, createPostStateTypes> {
  static defaultProps = {
    className: "",
    postsCountInThisPage: 0
  }

  static propTypes = {
    postParentId: PropTypes.number.isRequired,
    postParentType: PropTypes.string,
    postsCountInThisPage: PropTypes.number,
    className: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      attachMenu: false,
      enterAttach: true,
      contactMenu: false,
      labels: {},
      context: false,
      linkModal: false,
      addProductModal: false,
      pageX: 0,
      pageY: 0,
      commentBody: "comment-body",
      placeholder: "",
      selectedText: "",
      postImg1: null,
      postImg2: null,
      postImg3: null,
      postFile: "",
      postMedia: "",
      link: "",
      description: "",
      descriptionHeader: '',
      descriptionClass: "",
      descriptionHeaderClass: '',
      profileLoaded: false,
      focused: false,
      keys: [],
      selectedProduct: undefined,
      selectedProductId: undefined,
      scrollHeight: 0,
      textLength: 0,
      postType: constants.POST.POST_TYPE.POST,
    }
  }


  _resetPost = () => {
    this.text.innerText = ""
    this.headerText.innerText = ''
    this.setState({
      ...this.state,
      open: false,
      postImg1: null,
      postImg2: null,
      postImg3: null,
      postFile: "",
      postMedia: "",
      link: "",
      description: "",
      descriptionHeader: '',
      descriptionClass: "hide-message",
      descriptionHeaderClass: 'hide-message',
      labels: {},
      selectedProduct: undefined,
      selectedProductId: undefined,
      postType: constants.POST.POST_TYPE.POST,
    })
    this.supplyChecked.checked = false
    this.demandChecked.checked = false
  }

  demandChecked: HTMLInputElement
  supplyChecked: HTMLInputElement
  headerText: HTMLInputElement
  text: HTMLInputElement

  handleClickOutside = (event) => {
    const {attachMenu, contactMenu, linkModal, addProductModal, postImg1, postImg2, postImg3, postFile, postMedia, link, description, labels, open, descriptionHeader} = this.state
    const needReset = !description && !postImg1 && !postImg2 && !postImg3 && !postFile && !postMedia && !link && labels === {}
    const {postImg1Id, postImg2Id, postImg3Id, postMediaId, postFileId} = this.props


    if (!event.target.closest("#create-post-attach-menu-box")) {
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

    if (this.setWrapperFourthRef && !this.setWrapperFourthRef.contains(event.target)) {
      if (addProductModal) {
        this.setState({...this.state, addProductModal: false})
      }
    }

    if (this.form && !this.form.contains(event.target)) {
      const filesCount = (postMediaId || postFileId) ? 1 : ([postImg1Id, postImg2Id, postImg3Id].filter(img => img).length)
      if (open && (description.length === 0) && (descriptionHeader.length === 0) && (filesCount === 0)) {
        this.setState({...this.state, open: false, postType: constants.POST.POST_TYPE.POST})
        this.supplyChecked.checked = false
        this.demandChecked.checked = false
      }
    }

    if (needReset) this._resetPost()
  }

  handleAttach = () => {
    this.setState({...this.state, attachMenu: !this.state.attachMenu})
  }

  handleContact = () => {
    this.setState({...this.state, contactMenu: !this.state.contactMenu})
  }

  _handleFocusText = () => {
    this.setState({...this.state, open: true, focused: true})
  }

  _postTypeClick = (event) => {
    const {postType} = this.state
    if (postType === constants.POST.POST_TYPE.DEMAND) {
      if (event.target === this.demandChecked) {
        this.demandChecked.checked = false
        this.setState({...this.state, postType: constants.POST.POST_TYPE.POST})
      } else {
        this.setState({...this.state, postType: constants.POST.POST_TYPE.SUPPLY})
      }
    } else if (postType === constants.POST.POST_TYPE.SUPPLY) {
      if (event.target === this.supplyChecked) {
        this.supplyChecked.checked = false
        this.setState({...this.state, postType: constants.POST.POST_TYPE.POST})
      } else {
        this.setState({...this.state, postType: constants.POST.POST_TYPE.DEMAND})
      }
    } else {
      if (event.target === this.supplyChecked) {
        this.setState({...this.state, postType: constants.POST.POST_TYPE.SUPPLY})
      } else {
        this.setState({...this.state, postType: constants.POST.POST_TYPE.DEMAND})
      }
    }
  }


  _handleLabel = (name) => {
    const {labels} = this.state
    let temp = {...labels}
    if (temp[name] === undefined) {
      if (name === "دنبال کنندگان" || name === "دنبال کنندگانِ دنبال کنندگان" || temp["عمومی"] === undefined)
        temp[name] = name
    } else {
      if (name !== "دنبال کنندگان" && name !== "دنبال کنندگانِ دنبال کنندگان")
        delete temp["عمومی"]
      delete temp[name]
    }
    this.setState({...this.state, labels: {...temp}})
  }

  _linkModalFunc = () => {
    this.setState({...this.state, linkModal: true, attachMenu: false})
  }

  _addProductModalFunc = () => {
    this.setState({...this.state, addProductModal: true, attachMenu: false})
  }

  handleEmoji = (emoji) => {
    this.setState({...this.state, open: true}, () => {

      this.text.focus()
      if (this.text.selectionStart) {
        let x = this.text.selectionStart
        let y = this.text.selectionEnd
        this.text.innerText = this.text.innerText.substring(0, x) + emoji + this.text.innerText.substring(y, this.text.innerText.length)
        this.text.selectionStart = parseInt(x, 10) + emoji.length
        this.text.selectionEnd = parseInt(y, 10) + emoji.length
      } else {
        this.text.innerText += emoji
      }

      // let range = window.getSelection().getRangeAt(0)
      // let preCaretRange = range.cloneRange()
      // preCaretRange.selectNodeContents(this.text)
      // preCaretRange.setEnd(range.endContainer, range.endOffset)
      // let caretOffset = preCaretRange.toString().length

      // this.text.innerText = this.text.innerText.substring(0, caretOffset) + emoji + this.text.innerText.substring((caretOffset), this.text.innerText.length)

      const description = this.text.innerText
      if (description.trim().length <= (maxAllowedWordCounts))
        this.setState({...this.state, description}, () => {
          const descriptionLength = description.trim().length
          if (descriptionLength === 0)
            this.setState({...this.state, descriptionClass: "hide-message"})
          if (descriptionLength > 0 && descriptionLength < minAllowedWordCounts)
            this.setState({...this.state, descriptionClass: "error-message"})
          if (descriptionLength >= minAllowedWordCounts && descriptionLength < (maxAllowedWordCounts - 26))
            this.setState({...this.state, descriptionClass: "neutral-message"})
          if (descriptionLength > (maxAllowedWordCounts - 26) && descriptionLength < maxAllowedWordCounts)
            this.setState({...this.state, descriptionClass: "warning-message"})
        })
    })
  }

  _handleBlurText = () => {
    this.setState({
      ...this.state,
      descriptionClass: "hide-message",
      focused: false
    })
  }
  _handleBlurHeader = () => {
    this.setState({
      ...this.state,
      descriptionHeaderClass: "hide-message",
      focused: false
    })
  }


  _getValues = () => {
    const {postType, link, description, selectedProduct, descriptionHeader} = this.state
    const {
      currentUserIdentity, postParentId, currentUserImgId, postImg1Id, postImg2Id, postImg3Id, postMediaId,
      postFileId
    } = this.props
    const post_link = link.trim() !== "" ? link : null
    const filesCount = (postMediaId || postFileId) ? 1 :
        ([postImg1Id, postImg2Id, postImg3Id].filter(img => img).length)
    return {
      files_count: filesCount,
      post_description: description,
      post_title: descriptionHeader.length > 0 ? descriptionHeader : 'without title',
      post_type: postType,
      post_parent: postParentId,
      post_identity: currentUserIdentity,
      post_related_identity_image: currentUserImgId,
      post_related_product: selectedProduct ? selectedProduct.id : "",
      post_link
    }
  }

  _handleCtrlEnter = (e) => {
    console.log(e)
    if (this.text.innerText.length > maxAllowedWordCounts) this.text.innerText = this.state.description
    else if (e.keyCode === 17 || e.keyCode === 13) {
      let keys = this.state.keys.slice()
      keys[e.keyCode] = true
      this.setState({...this.state, keys: keys})
      if (e.keyCode === 13 && keys[13] && keys[17]) {
        e.preventDefault()
        this.setState({...this.state, keys: []}, () => {
          this._onSubmit(e)
        })
      }
    } else this.setState({...this.state, keys: []})
  }
  _onKeyDownHeader = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.text.focus()
    }
  }

  _onKeyUpHeader = (e) => {
    const descriptionHeader = this.headerText.innerText
    if (e.keyCode === 13) {
      e.preventDefault()
    }
    else {
      if (descriptionHeader.trim().length <= maxAllowedHeaderWordCounts) {
        this.setState({...this.state, descriptionHeader}, () => {
          const descriptionHeaderLength = descriptionHeader.trim().length
          if (descriptionHeaderLength === 0)
            this.setState({...this.state, descriptionHeaderClass: "hide-message"})
          if (descriptionHeaderLength > 0 && descriptionHeaderLength < minAllowedHeaderWordCounts)
            this.setState({...this.state, descriptionHeaderClass: "error-message"})
          if (descriptionHeaderLength >= minAllowedHeaderWordCounts && descriptionHeaderLength < (maxAllowedHeaderWordCounts - 26))
            this.setState({...this.state, descriptionHeaderClass: "neutral-message"})
          if (descriptionHeaderLength > (maxAllowedHeaderWordCounts - 26) && descriptionHeaderLength < maxAllowedHeaderWordCounts)
            this.setState({...this.state, descriptionHeaderClass: "warning-message"})
        })
      }
      else {
        this.headerText.innerText = this.state.descriptionHeader
      }
    }
  }

  _showLink = (link) => {
    if (link) {
      let urlExp = new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$")
      let word = link.trim()
      if (urlExp.test(word)) {
        word.includes("http://") || word.includes("https://") ?
            this.link.innerHTML = link.replace(new RegExp(word, "g"), `<a target=_blank href=` + word + `>${word}</a>`)
            :
            this.link.innerHTML = link.replace(new RegExp(word, "g"), `<a target=_blank href=http://` + word + `>${word}</a>`)
      }
    }
  }

  _save = () => {
    const {
      actions, currentUserId, currentUserType, postParentId, postParentType, postImg1Id, postImg2Id, postImg3Id,
      postMediaId, postFileId
    } = this.props
    const {createPost, removeFileFromTemp} = actions
    const formValues = this._getValues()
    const postPictureIds = [postImg1Id, postImg2Id, postImg3Id].filter(img => img) //filter imges that not null & not undefined
    const postAttachedFileIds = (postPictureIds.length > 0 && postPictureIds)
        || (postMediaId && [postMediaId])
        || (postFileId && [postFileId]) || []
    createPost({
      formValues, postOwnerId: currentUserId, postOwnerType: currentUserType, postParentId, postParentType,
      postFileIds: postAttachedFileIds
    })
    removeFileFromTemp(POST_IMG1_TEMP_KEY)
    removeFileFromTemp(POST_IMG2_TEMP_KEY)
    removeFileFromTemp(POST_IMG3_TEMP_KEY)
    removeFileFromTemp(POST_MEDIA_TEMP_KEY)
    removeFileFromTemp(POST_FILE_TEMP_KEY)
  }

  _createFile = (fileString, tempFileKeyName) => {
    const {actions} = this.props
    const {createFile} = actions
    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const fileIdKey = 'fileId'
    const nextActionData = {tempFileKeyName}
    const createArguments = {
      fileIdKey,
      nextActionType,
      nextActionData
    }
    createFileFunc(createFile, fileString, createArguments)
  }

  _deletePicture = (i) => {
    const {actions} = this.props
    const {removeFileFromTemp} = actions
    const tempKeyName = (i === 0 && POST_IMG1_TEMP_KEY)
        || (i === 1 && POST_IMG2_TEMP_KEY)
        || (i === 2 && POST_IMG3_TEMP_KEY)
    removeFileFromTemp(tempKeyName)
    if (i === 0) {
      this.setState({...this.state, postImg1: null})
    } else if (i === 1) {
      this.setState({...this.state, postImg2: null})
    } else {
      this.setState({...this.state, postImg3: null})
    }
  }

  _deleteFile = () => {
    const {actions} = this.props
    const {removeFileFromTemp} = actions
    removeFileFromTemp(POST_FILE_TEMP_KEY)
    this.setState({...this.state, postFile: ""})
  }

  _deleteMedia = () => {
    const {actions} = this.props
    const {removeFileFromTemp} = actions
    removeFileFromTemp(POST_MEDIA_TEMP_KEY)
    this.setState({...this.state, postMedia: ""})
  }

  _handlePostPictures = (fileString) => {
    const {postImg1, postImg2, postImg3} = this.state
    const tempFileKeyName = (!postImg1 && POST_IMG1_TEMP_KEY)
        || (!postImg2 && POST_IMG2_TEMP_KEY)
        || (!postImg3 && POST_IMG3_TEMP_KEY)
    if (!postImg1) {
      this.setState({...this.state, attachMenu: false, postImg1: fileString})
    } else if (!postImg2) {
      this.setState({...this.state, attachMenu: false, postImg2: fileString})
    } else {
      this.setState({...this.state, attachMenu: false, postImg3: fileString})
    }
    this._createFile(fileString, tempFileKeyName)
  }

  _handlePostFile = (fileString) => {
    this._createFile(fileString, POST_FILE_TEMP_KEY)
    this.setState({...this.state, attachMenu: false, postFile: fileString})
  }

  _handlePostMedia = (fileString) => {
    this._createFile(fileString, POST_MEDIA_TEMP_KEY)
    this.setState({...this.state, attachMenu: false, postMedia: fileString})
  }

  _allowSubmitCheck = () => {
    const {postImg1, postImg2, postImg3, postMedia, postFile, description, descriptionHeader, postType} = this.state
    const {postImg1Id, postImg2Id, postImg3Id, postMediaId, postFileId} = this.props
    const descriptionLength = description.trim().length
    const descriptionHeaderLength = descriptionHeader.trim().length
    const descriptionCheck = descriptionLength >= minAllowedWordCounts && descriptionLength <= maxAllowedWordCounts
    const descriptionHeaderCheck = (postType === constants.POST.POST_TYPE.DEMAND || postType === constants.POST.POST_TYPE.SUPPLY)
        ? (descriptionHeaderLength >= minAllowedHeaderWordCounts && descriptionHeaderLength <= maxAllowedHeaderWordCounts)
        : true
    const postPicturesCheck = (postImg1 ? postImg1Id : true)
        && (postImg2 ? postImg2Id : true)
        && (postImg3 ? postImg3Id : true)
    const postMediaCheck = postMedia ? postMediaId : true
    const postFileCheck = postFile ? postFileId : true
    const condition1 = Boolean(postImg1 || postImg2 || postImg3 || postMedia || descriptionCheck || descriptionHeaderCheck)
    const condition2 = postFile ? (descriptionCheck && descriptionHeaderCheck) : true
    const condition3 = Boolean(postPicturesCheck && postMediaCheck && postFileCheck)
    return condition1 && condition2 && condition3 //TODO add product condition
  }

  _onSubmit = (e) => {
    e.preventDefault()
    this._save()
  }

  componentDidUpdate(prevProps, prevState) {
    const {link} = this.state
    const {postsCountInThisPage} = this.props

    if (link !== prevState.link) {
      this._showLink(link)
    }

    if (prevProps.postsCountInThisPage < postsCountInThisPage) {
      this._resetPost()
    }
  }

  _autoGrow = () => {
    const scrollHeight = this.text.scrollHeight
    const description = this.text.innerText
    if (description.trim().length <= maxAllowedWordCounts)
      this.setState({...this.state, scrollHeight, description}, () => {
        const descriptionLength = description.trim().length
        if (descriptionLength === 0)
          this.setState({...this.state, descriptionClass: "hide-message"})
        if (descriptionLength > 0 && descriptionLength < minAllowedWordCounts)
          this.setState({...this.state, descriptionClass: "error-message"})
        if (descriptionLength >= minAllowedWordCounts && descriptionLength < (maxAllowedWordCounts - 26))
          this.setState({...this.state, descriptionClass: "neutral-message"})
        if (descriptionLength > (maxAllowedWordCounts - 26) && descriptionLength < maxAllowedWordCounts)
          this.setState({...this.state, descriptionClass: "warning-message"})
      })

    if ((scrollHeight > 250) && (scrollHeight !== this.state.scrollHeight) && (this.text.className !== 'post-component-textarea-open show-scroll')) {
      this.text.className = 'post-component-textarea-open show-scroll'
      setTimeout(() =>
              this.text.className = 'post-component-textarea-open hide-scroll'
          , 1000)
    }
  }

  componentDidMount() {
    const {actions, translate, currentUserMedia} = this.props
    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({...this.state, placeholder: translate['Be in zist boom']})
    const {getFollowers} = actions
    getFollowers({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId,
      notProfile: true
    })
    // componentType === "comment" && this.setState({...this.state, placeholder: translate["Send comment"]})

    //Added for profile url check
    if (currentUserMedia) {
      let profile = new Image()
      profile.src = currentUserMedia
      profile.onload = () => {
        this.setState({...this.state, profileLoaded: true})
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUserMedia !== nextProps.currentUserMedia) {
      this.setState({...this.state, profileLoaded: false}, () => {
        if (nextProps.currentUserMedia) {
          let profile = new Image()
          profile.src = nextProps.currentUserMedia
          profile.onload = () => {
            this.setState({...this.state, profileLoaded: true})
          }
        }
      })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }


  render() {
    const {className, followers, exchanges, currentUserIdentity, currentUserMedia, currentUserName, translate, currentUserId} = this.props
    const {
      postImg1, postImg2, postImg3, open, attachMenu, labels, link, contactMenu, linkModal, postFile, postMedia,
      profileLoaded, description, descriptionClass, descriptionHeaderClass, focused, addProductModal, selectedProduct, postType, descriptionHeader
    } = this.state
    const hasMediaClass = (postMedia || postImg1 || postImg2 || postImg3) ? "hasMedia" : ""
    const postImagesLength = [postImg1, postImg2, postImg3].filter(img => img).length
    const allowSubmit = this._allowSubmitCheck()
    return (
        <form className={"post-component-container " + className} ref={e => this.form = e} onSubmit={this._onSubmit}>
          <div className={open ? "post-component-header" : "post-component-header-hide"}>
            {currentUserMedia && profileLoaded ?
                <img alt='profile' src={currentUserMedia} className='post-component-header-img'/>
                :
                <DefaultUserIcon className='post-component-header-img'/>
            }
            <div className={open ? "post-not-collapse-username" : "post-collapse-username"}>
              {currentUserName}
            </div>
            <div className={open ? 'post-type-create-container' : 'post-type-create-container-hide'}>
              <div className='post-type-flex-container'>
                <label className="container-checkmark">
                  <p className='post-type-text'>{translate['Type supply']}</p>
                  <input type="radio" name="radio-step-1" ref={e => this.supplyChecked = e}
                         onClick={this._postTypeClick}/>
                  <span className="checkmark"/>
                </label>
                <label className="container-checkmark">
                  <p className='post-type-text'>{translate['Type demand']}</p>
                  <input type="radio" name="radio-step-1" ref={e => this.demandChecked = e}
                         onClick={this._postTypeClick}/>
                  <span className="checkmark"/>
                </label>
              </div>
            </div>
          </div>
          <div
              className={open && (postType === constants.POST.POST_TYPE.SUPPLY || postType === constants.POST.POST_TYPE.DEMAND)
                  ? 'post-type-write-container'
                  : 'post-type-write-container-hide'}>
            <p className='post-type-write-header'>
              {translate['Title'] + ' '}
              {postType === constants.POST.POST_TYPE.SUPPLY ? translate['Type supply']
                  : (postType === constants.POST.POST_TYPE.DEMAND && translate['Type demand'])
              }
            </p>

            {descriptionHeaderClass &&
            <span className={descriptionHeaderClass + " post-type-character"}
                  style={descriptionHeader.length > 0 && new RegExp("^[A-Za-z]*$").test(descriptionHeader[0]) ? {right: "6px"} : {left: "6px"}}>
                {descriptionHeader && descriptionHeader.trim().length + `/${maxAllowedHeaderWordCounts}`}
              </span>
            }
            <div className='post-type-write-content'
                 contentEditable={true}
                 ref={e => this.headerText = e}
                 onKeyDown={this._onKeyDownHeader}
                 onKeyPress={this._onKeyUpHeader}
                 onKeyUp={this._onKeyUpHeader}
                 style={
                   descriptionHeader.length > 0 && new RegExp("^[A-Za-z]*$").test(descriptionHeader[0]) ?
                       {direction: "ltr"} :
                       {direction: "rtl"}
                 }
                 onBlur={this._handleBlurHeader}
            />
            <div onClick={() => this.headerText.focus()}
                 className={descriptionHeader.length > 0
                     ? "post-placeholder-hide"
                     : (open) ? "post-placeholder-open post-title-placeholder" : "post-placeholder"}>
              {translate['Create post header placeholder']}
            </div>
          </div>
          <div className={"post-component-content " + hasMediaClass}>
            <div className='post-component-description'>

              {descriptionClass &&
              <span className={descriptionClass + " post-character"}
                    style={description.length > 0 && new RegExp("^[A-Za-z]*$").test(description[0]) ? {right: "6px"} : {left: "6px"}}>
                {description && description.trim().length + `/${maxAllowedWordCounts}`}
              </span>
              }
              <div
                  contentEditable={true}
                  ref={e => this.text = e}
                  className={open ? "post-component-textarea-open hide-scroll" : "post-component-textarea"}
                  style={
                    description.length > 0 && new RegExp("^[A-Za-z]*$").test(description[0]) ?
                        {direction: "ltr", padding: open || focused ? "13px 23px 9px 15px" : "8px 23px 9px 15px"} :
                        {direction: "rtl", padding: open || focused ? "13px 15px 9px 23px" : "8px 15px 9px 23px"}
                  }
                  onBlur={this._handleBlurText}
                  onFocus={this._handleFocusText}
                  onKeyDown={this._handleCtrlEnter}
                  onKeyUp={this._autoGrow}
              />

              <div onClick={() => this.text.focus()}
                   className={this.text && this.text.innerText.length > 0 ? "post-placeholder-hide" : open ? "post-placeholder-open" : "post-placeholder"}>
                مسئله خود را بنویسید...
              </div>

              <div className={open || focused ? "emoji-open" : "emoji-close"}
                   style={description.length > 0 && new RegExp("^[A-Za-z]*$").test(description[0]) ? {right: "7px"} : {left: "7px"}}>
                <StickersMenu ltr={description.length > 0 && new RegExp("^[A-Za-z]*$").test(description[0])}
                              output={this.handleEmoji}/>
              </div>

            </div>

            <ViewAttachedFiles
                postImg1={postImg1}
                postImg2={postImg2}
                postImg3={postImg3}
                postMedia={postMedia}
                postFile={postFile}
                deletePicture={this._deletePicture}
                deleteMedia={this._deleteMedia}
                deleteFile={this._deleteFile}
                focused={focused}
            />
          </div>

          {selectedProduct &&
          <ProductInfoView translate={translate} product={selectedProduct} ownerId={currentUserId}/>
          }

          <div className={open ? "post-component-footer" : "post-component-footer-hide"}>

            {/*<ContactMenuIcon className="post-component-footer-contact-menu-icon" onClickFunc={this.handleContact}/>*/}

            {/*{*/}
            {/*Object.values(labels).map(label =>*/}
            {/*<div className='post-component-footer-items-style'>*/}
            {/*<div className='post-component-footer-items-style-text'>{label}</div>*/}
            {/*<div className='post-component-footer-items-style-close'*/}
            {/*onClick={() => this._handleLabel(label)}>✕*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*)*/}
            {/*}*/}

            <div className='post-component-footer-send'>
              <div className='post-component-footer-link' ref={e => this.link = e}>{link}</div>
              <div style={{display: "inline-block"}} onClick={this.handleAttach}>
                <AttachFileIcon className='post-component-footer-send-attach'/>
              </div>
              <button
                  type="submit"
                  className={allowSubmit ? "post-component-footer-send-btn" : "post-component-footer-send-btn-inactive"}
              >ارسال
              </button>

              <AttachMenu
                  attachMenu={attachMenu}
                  handleFile={this._handlePostFile}
                  handleMedia={this._handlePostMedia}
                  handlePictures={this._handlePostPictures}
                  postImagesLength={postImagesLength}
                  postMediaExist={Boolean(postMedia)}
                  postFileExist={Boolean(postFile)}
                  postLinkExist={Boolean(link)}
                  linkModalFunc={this._linkModalFunc}
                  addProductModalFunc={this._addProductModalFunc}
                  AttachMenuId="create-post-attach-menu-box"
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


          <LinkModal
              ref={e => this.setWrapperThirdRef = e ? e.linkModalRef : e}
              linkModal={linkModal}
              cancelFunc={() => this.setState({...this.state, linkModal: false})}
              submitFunc={(linkString) => this.setState({...this.state, link: linkString, linkModal: false})}
          />
          <AddProductModal
              ref={e => this.setWrapperFourthRef = e ? e.addProductModal : e}
              addProductModal={addProductModal}
              cancelFunc={() => this.setState({
                ...this.state,
                addProductModal: false,
                selectedProductId: undefined,
                selectedProduct: undefined
              })}
              submitFunc={(product, productId) => {
                this.setState({
                  ...this.state,
                  selectedProduct: productId === undefined ? product : undefined,
                  selectedProductId: productId,
                  addProductModal: false
                })
              }}
              // selectProduct={(product) => this.setState({...this.state, selectedProduct: product})}
          />

        </form>
    )
  }
}

const mapStateToProps = state => {
  const client = state.auth.client
  const clientImgId = (client.user_type === 'person') ? (client.profile.profile_media) : (
      (client.organization && client.organization.organization_logo) || null
  )

  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  const postImg1Id = state.temp.file[POST_IMG1_TEMP_KEY] || null
  const postImg2Id = state.temp.file[POST_IMG2_TEMP_KEY] || null
  const postImg3Id = state.temp.file[POST_IMG3_TEMP_KEY] || null
  const postMediaId = state.temp.file[POST_MEDIA_TEMP_KEY] || null
  const postFileId = state.temp.file[POST_FILE_TEMP_KEY] || null

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
    exchanges: state.common.exchangeMembership.list,
    followers: state.common.social.follows.list,
    postImg1Id,
    postImg2Id,
    postImg3Id,
    postMediaId,
    postFileId,
    translate: getMessages(state)
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFollowers: socialActions.getFollowers,
    createPost: PostActions.createPost,
    createFile: FileActions.createFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
    createComment: CommentActions.createComment
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
