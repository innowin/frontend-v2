// @flow
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import AttachFileIcon from 'src/images/common/attachFileNew_svg'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import PostActions from 'src/redux/actions/commonActions/postActions'
import DefaultUserIcon from 'src/images/defaults/defaultUser_svg'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import {getMessages} from 'src/redux/selectors/translateSelector'
import CommentActions from 'src/redux/actions/commonActions/commentActions'
import TempActions from 'src/redux/actions/tempActions'
import {createFileFunc} from 'src/views/common/Functions'
import types from 'src/redux/actions/types'
import AttachMenu from './attachMenu'
import ContactMenu from './contactMenu'
import LinkModal from './linkModal'
import ViewAttachedFiles from './viewAttachedFiles'
import StickersMenu from '../../components/StickersMenu'
import AddProductModal from './addProductModal'
import ProductInfoView from '../../contributions/ProductInfoView'
import constants from 'src/consts/constants'
import type {postType} from 'src/consts/flowTypes/common/post'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import uuid from 'uuid'
import type {identityType} from '../../../../consts/flowTypes/user/basicInformation'

const POST_MEDIA_TEMP_KEY = 'POST_MEDIA'
const POST_FILE_TEMP_KEY = 'POST_FILE'
const POST_IMG1_TEMP_KEY = 'POST_IMG1'
const POST_IMG2_TEMP_KEY = 'POST_IMG2'
const POST_IMG3_TEMP_KEY = 'POST_IMG3'

const minAllowedWordCounts = 5 // TODO: Mohsen should be 3
const maxAllowedWordCounts = 4096
const minAllowedHeaderWordCounts = 5
const maxAllowedHeaderWordCounts = 70


type createPostPropsTypes = {
  postParentId?: number,
  postParentType?: string,
  postsCountInThisPage?: number,
  className?: string,
  isUpdate?: boolean,
  hideEdit?: Function,
  post?: postType,
  updateFunc?: Function,
  hideCreatePost?: Function,
  actions: Function,
  postImg1Id: number,
  postImg2Id: number,
  postImg3Id: number,
  postMediaId: number,
  postFileId: number,
  translate: { [string]: string },
  currentUserType: string,
  currentUserId: number,
  currentUserIdentity: identityType | number,
  currentUserMedia: string | null
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
  postFile: string | null,
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
  getFollowers: boolean,
  removePictureArray: Array<fileType>,
  postImg1Index: number,
  postImg2Index: number,
  postImg3Index: number,
  postFileIndex: number,
  postMediaIndex: number,
  isLoading: boolean,
}


class CreatePost extends Component<createPostPropsTypes, createPostStateTypes> {
  static defaultProps = {
    className: '',
    postsCountInThisPage: 0
  }

  static propTypes = {
    postParentId: PropTypes.number,
    postParentType: PropTypes.string,
    postsCountInThisPage: PropTypes.number,
    className: PropTypes.string,
    isUpdate: PropTypes.bool,
    hideEdit: PropTypes.func,
    post: PropTypes.object,
    updateFunc: PropTypes.func,
  }

  constructor(props) {
    super(props)
    let open = false
    open = !(window.innerWidth > 480)
    this.state = {
      open: open,
      attachMenu: false,
      enterAttach: true,
      contactMenu: false,
      labels: {},
      context: false,
      linkModal: false,
      addProductModal: false,
      pageX: 0,
      pageY: 0,
      commentBody: 'comment-body',
      placeholder: '',
      selectedText: '',
      postImg1: null,
      postImg2: null,
      postImg3: null,
      postFile: '',
      postMedia: '',
      link: '',
      description: '',
      descriptionHeader: '',
      descriptionClass: '',
      descriptionHeaderClass: '',
      profileLoaded: false,
      focused: false,
      keys: [],
      selectedProduct: undefined,
      selectedProductId: undefined,
      scrollHeight: 0,
      textLength: 0,
      postType: constants.POST.POST_TYPE.POST,
      getFollowers: false,
      removePictureArray: [],
      postImg1Index: -1,
      postImg2Index: -1,
      postImg3Index: -1,
      postFileIndex: -1,
      postMediaIndex: -1,
      isLoading: false,
    }
  }

  attachMenuId: string

  componentWillMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside)
    document.addEventListener('touchend', this.handleClickOutside)

    const {actions, translate, currentUserType, currentUserId, currentUserIdentity} = this.props
    const {getFollowers} = actions
    if (currentUserIdentity && currentUserType && currentUserId) {
      getFollowers({
        followOwnerIdentity: currentUserIdentity,
        followOwnerType: currentUserType,
        followOwnerId: currentUserId,
        notProfile: true
      })
      this.setState({...this.state, placeholder: translate['Be in zist boom']})
    } else {
      this.setState({...this.state, getFollowers: true, placeholder: translate['Be in zist boom']})
    }
  }

  componentDidMount() {
    const {actions, currentUserMedia, isUpdate, post, currentUserIdentity, currentUserType, currentUserId} = this.props
    const {getFollowers} = actions
    if (this.state.getFollowers) {
      getFollowers({
        followOwnerIdentity: currentUserIdentity,
        followOwnerType: currentUserType,
        followOwnerId: currentUserId,
        notProfile: true
      })
    }

    //Added for profile url check
    if (currentUserMedia) {
      let profile = new Image()
      profile.src = currentUserMedia
      profile.onload = () => {
        this.setState({...this.state, profileLoaded: true})
      }
    }
    if (isUpdate && post) {
      let postType, postFilesArray = post.post_files_array, postImg1 = null, postImg2 = null, postImg3 = null,
          postFile = null, postProduct = post.post_related_product, selectedProduct = undefined, postImg1Index = -1,
          postImg2Index = -1, postImg3Index = -1, postFileIndex = -1
      if (post.post_type === constants.POST.POST_TYPE.SUPPLY) {
        this.supplyChecked.checked = true
        postType = constants.POST.POST_TYPE.SUPPLY
      } else if (post.post_type === constants.POST.POST_TYPE.DEMAND) {
        this.demandChecked.checked = true
        postType = constants.POST.POST_TYPE.DEMAND
      }
      if (postProduct) {
        selectedProduct = postProduct
      }
      if (postFilesArray) {
        let numberOfPostImages = 0
        for (let index = 0; index < postFilesArray.length; index++) {
          let file = postFilesArray[index]
          if (file.type === constants.CRETE_FILE_TYPES.IMAGE) {
            numberOfPostImages++
            if (numberOfPostImages === 1) {
              postImg1 = file.file
              postImg1Index = index
            } else if (numberOfPostImages === 2) {
              postImg2 = file.file
              postImg2Index = index
            }
            if (numberOfPostImages === 3) {
              postImg3 = file.file
              postImg3Index = index
            }
          } else if (file.type === constants.CRETE_FILE_TYPES.FILE) {
            postFile = file.file
            postFileIndex = index
          }
        }
      }
      this.setState({
        ...this.state,
        open: true,
        postType,
        description: post.post_description,
        descriptionHeader: post.post_title,
        postImg1,
        postImg2,
        postImg3,
        postFile,
        selectedProduct,
        postImg1Index,
        postImg2Index,
        postImg3Index,
        postFileIndex,
      })

      if (this.text) {
        this.text.innerText = post.post_description
        this.headerText.innerText = post.post_title
      }
    }
    this.attachMenuId = "create-post-attach-menu-box" + uuid()
  }

  componentDidUpdate(prevProps, prevState) {
    const {link, postImg1, postImg2, postImg3, postFile, postMedia} = this.state
    const {postsCountInThisPage, postImg1Id, postImg2Id, postImg3Id, postFileId, postMediaId} = this.props

    if (link !== prevState.link) {
      this._showLink(link)
    }

    if (prevProps.postsCountInThisPage < postsCountInThisPage) {
      this._resetPost()
    }

    if ((postImg1 && !postImg1Id && postImg1 !== prevState.postImg1)
        || (postImg2 && !postImg2Id && postImg2 !== prevState.postImg2)
        || (postImg3 && !postImg3Id && postImg3 !== prevState.postImg3)
        || (postImg3 && !postImg3Id && postImg3 !== prevState.postImg3)
        || (postFile && !postFileId && postFile !== prevState.postFile)
        || (postMedia && !postMediaId && postMedia !== prevState.postMedia)) {
      this.setState({...this.state, isLoading: false})
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
    document.removeEventListener('touchend', this.handleClickOutside)
  }

  _resetPost = () => {
    const {hideCreatePost} = this.props
    this.text.innerText = ''
    this.headerText.innerText = ''
    this.setState({
      ...this.state,
      open: false,
      postImg1: null,
      postImg2: null,
      postImg3: null,
      postFile: '',
      postMedia: '',
      link: '',
      description: '',
      descriptionHeader: '',
      descriptionClass: 'hide-message',
      descriptionHeaderClass: 'hide-message',
      labels: {},
      selectedProduct: undefined,
      selectedProductId: undefined,
      postType: constants.POST.POST_TYPE.POST,
      removePictureArray: [],
      focused: false,
      postImg1Index: -1,
      postImg2Index: -1,
      postImg3Index: -1,
      postFileIndex: -1,
      postMediaIndex: -1,
      isLoading: false,
    }, () => {
      this.supplyChecked.checked = false
      this.demandChecked.checked = false
      this.text.blur()
      this.headerText.blur()
    })
    if (hideCreatePost) {
      hideCreatePost()
    }
  }

  demandChecked: HTMLInputElement
  supplyChecked: HTMLInputElement
  headerText: HTMLInputElement
  text: HTMLInputElement

  handleClickOutside = (event) => {
    const {
      attachMenu, contactMenu, linkModal, addProductModal, postImg1, postImg2, postImg3, postFile, postMedia,
      selectedProduct, link, description, labels, open, descriptionHeader
    } = this.state
    const needReset = !description && !postImg1 && !postImg2 && !postImg3 && !postFile && !postMedia && !link
        && !selectedProduct && labels === {}
    const {hideCreatePost, postMediaId, postFileId, isUpdate, hideEdit} = this.props
    if (!event.target.closest(`#${this.attachMenuId}`)) {
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
      let newOpen = !(window.innerWidth > 480)
      const filesCount = (postMediaId || postFileId) ? 1 : ([postImg1, postImg2, postImg3].filter(img => img).length)
      if (open && (description.length === 0) && (descriptionHeader.length === 0) && (filesCount === 0) && !selectedProduct) {
        this.setState({...this.state, open: newOpen, postType: constants.POST.POST_TYPE.POST})
        this.supplyChecked.checked = false
        this.demandChecked.checked = false
        if (hideCreatePost) hideCreatePost()
      }
      if (isUpdate && hideEdit) {
        hideEdit()
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
      if (name === 'دنبال کنندگان' || name === 'دنبال کنندگانِ دنبال کنندگان' || temp['عمومی'] === undefined)
        temp[name] = name
    } else {
      if (name !== 'دنبال کنندگان' && name !== 'دنبال کنندگانِ دنبال کنندگان')
        delete temp['عمومی']
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
            this.setState({...this.state, descriptionClass: 'hide-message'})
          if (descriptionLength > 0 && descriptionLength < minAllowedWordCounts)
            this.setState({...this.state, descriptionClass: 'error-message'})
          if (descriptionLength >= minAllowedWordCounts && descriptionLength < (maxAllowedWordCounts - 26))
            this.setState({...this.state, descriptionClass: 'neutral-message'})
          if (descriptionLength > (maxAllowedWordCounts - 26) && descriptionLength < maxAllowedWordCounts)
            this.setState({...this.state, descriptionClass: 'warning-message'})
        })
    })
  }

  _handleBlurText = () => {
    this.setState({
      ...this.state,
      descriptionClass: 'hide-message',
      focused: false
    })
  }
  _handleBlurHeader = () => {
    this.setState({
      ...this.state,
      descriptionHeaderClass: 'hide-message',
      focused: false
    })
  }

  _getValues = () => {
    const {postType, link, description, selectedProduct, descriptionHeader} = this.state
    const {
      currentUserIdentity, postParentId, postImg1Id, postImg2Id, postImg3Id, postMediaId,
      postFileId
    } = this.props
    const post_link = link.trim() !== '' ? link : null
    const filesCount = (postMediaId || postFileId) ? 1 :
        ([postImg1Id, postImg2Id, postImg3Id].filter(img => img).length)
    return {
      files_count: filesCount,
      post_description: description,
      post_title: descriptionHeader.length > 0 ? descriptionHeader : '',
      post_type: postType,
      post_parent: postParentId,
      post_related_identity: currentUserIdentity,
      post_related_product: selectedProduct ? selectedProduct.id : '',
      post_link
    }
  }

  _handleCtrlEnter = (e) => {
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
    } else {
      if (descriptionHeader.trim().length <= maxAllowedHeaderWordCounts) {
        this.setState({...this.state, descriptionHeader}, () => {
          const descriptionHeaderLength = descriptionHeader.trim().length
          if (descriptionHeaderLength === 0)
            this.setState({...this.state, descriptionHeaderClass: 'hide-message'})
          if (descriptionHeaderLength > 0 && descriptionHeaderLength < minAllowedHeaderWordCounts)
            this.setState({...this.state, descriptionHeaderClass: 'error-message'})
          if (descriptionHeaderLength >= minAllowedHeaderWordCounts && descriptionHeaderLength < (maxAllowedHeaderWordCounts - 26))
            this.setState({...this.state, descriptionHeaderClass: 'neutral-message'})
          if (descriptionHeaderLength > (maxAllowedHeaderWordCounts - 26) && descriptionHeaderLength < maxAllowedHeaderWordCounts)
            this.setState({...this.state, descriptionHeaderClass: 'warning-message'})
        })
      } else {
        this.headerText.innerText = this.state.descriptionHeader
      }
    }
  }

  _showLink = (link) => {
    if (link) {
      let urlExp = new RegExp('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$')
      let word = link.trim()
      if (urlExp.test(word)) {
        word.includes('http://') || word.includes('https://') ?
            this.link.innerHTML = link.replace(new RegExp(word, 'g'), `<a target=_blank href=` + word + `>${word}</a>`)
            :
            this.link.innerHTML = link.replace(new RegExp(word, 'g'), `<a target=_blank href=http://` + word + `>${word}</a>`)
      }
    }
  }

  _save = () => {
    const {
      actions, currentUserId, currentUserType, postParentId, postParentType, postImg1Id, postImg2Id, postImg3Id,
      postMediaId, postFileId, isUpdate, updateFunc, post,
    } = this.props
    const {removePictureArray} = this.state
    const {createPost, removeFileFromTemp, deleteFile} = actions
    const formValues = this._getValues()
    const postPictureIds = [postImg1Id, postImg2Id, postImg3Id].filter(img => img) //filter imges that not null & not undefined
    const postAttachedFileIds = (postPictureIds.length > 0 && postPictureIds)
        || (postMediaId && [postMediaId])
        || (postFileId && [postFileId]) || []
    if (isUpdate && updateFunc && post) {
      for (let picture of removePictureArray) {
        deleteFile({fileId: picture.id, fileParentType: constants.FILE_PARENT.POST, fileParentId: post.id})
      }
      updateFunc(formValues, post.id, postAttachedFileIds)
    } else {
      createPost({
        formValues, postOwnerId: currentUserId, postOwnerType: currentUserType, postParentId, postParentType,
        postFileIds: postAttachedFileIds
      })
    }
    removeFileFromTemp(POST_IMG1_TEMP_KEY)
    removeFileFromTemp(POST_IMG2_TEMP_KEY)
    removeFileFromTemp(POST_IMG3_TEMP_KEY)
    removeFileFromTemp(POST_MEDIA_TEMP_KEY)
    removeFileFromTemp(POST_FILE_TEMP_KEY)
  }

  _createFile = (fileString, tempFileKeyName, fileType: string) => {
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
    createFileFunc(createFile, fileString, createArguments, fileType)
  }

  _deletePicture = (i) => {
    const {actions, post, isUpdate} = this.props
    const {postImg1, postImg2, postImg3, removePictureArray} = this.state
    const {removeFileFromTemp} = actions
    let newRemovePictureArray = removePictureArray
    const tempKeyName = (i === 0 && POST_IMG1_TEMP_KEY)
        || (i === 1 && POST_IMG2_TEMP_KEY)
        || (i === 2 && POST_IMG3_TEMP_KEY)
    removeFileFromTemp(tempKeyName)
    if (isUpdate && post) {
      const postFilesArray = post.post_files_array
      for (let picture of postFilesArray) {
        if ((i === 0 && picture.file === postImg1) || (i === 1 && picture.file === postImg2) || (i === 2 && picture.file === postImg3)) {
          newRemovePictureArray.push(picture)
          break
        }
      }
    }
    if (i === 0) {
      this.setState({...this.state, postImg1: null, removePictureArray: newRemovePictureArray})
    } else if (i === 1) {
      this.setState({...this.state, postImg2: null, removePictureArray: newRemovePictureArray})
    } else {
      this.setState({...this.state, postImg3: null, removePictureArray: newRemovePictureArray})
    }
  }

  _deleteFile = () => {
    const {actions, isUpdate, post} = this.props
    const {removePictureArray, postFile} = this.state

    const {removeFileFromTemp} = actions
    removeFileFromTemp(POST_FILE_TEMP_KEY)
    let newRemovePictureArray = removePictureArray


    if (isUpdate && post) {
      const postFilesArray = post.post_files_array
      for (let picture of postFilesArray) {
        if (picture.file === postFile) {
          newRemovePictureArray.push(picture)
          break
        }
      }
    }

    this.setState({...this.state, postFile: '', removePictureArray: newRemovePictureArray})
  }

  _deleteMedia = () => {
    const {actions} = this.props
    const {removeFileFromTemp} = actions
    removeFileFromTemp(POST_MEDIA_TEMP_KEY)
    this.setState({...this.state, postMedia: ''})
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
    this._createFile(fileString, tempFileKeyName, constants.CRETE_FILE_TYPES.IMAGE)
  }

  _handlePostFile = (fileString) => {
    this._createFile(fileString, POST_FILE_TEMP_KEY, constants.CRETE_FILE_TYPES.FILE)
    this.setState({...this.state, attachMenu: false, postFile: fileString})
  }

  _handlePostMedia = (fileString) => {
    this._createFile(fileString, POST_MEDIA_TEMP_KEY, constants.CRETE_FILE_TYPES.VIDEO)
    this.setState({...this.state, attachMenu: false, postMedia: fileString})
  }

  _allowSubmitCheck = () => {
    const {
      postImg1, postImg2, postImg3, postMedia, postFile, description, descriptionHeader, postType, selectedProduct,
      postImg1Index, postImg2Index, postImg3Index, postFileIndex, postMediaIndex
    } = this.state
    const {postImg1Id, postImg2Id, postImg3Id, postMediaId, postFileId, post} = this.props
    const descriptionLength = description.trim().length
    const descriptionHeaderLength = descriptionHeader.trim().length
    const descriptionCheck = descriptionLength >= minAllowedWordCounts && descriptionLength <= maxAllowedWordCounts
    const descriptionHeaderCheck = (postType === constants.POST.POST_TYPE.DEMAND || postType === constants.POST.POST_TYPE.SUPPLY)
        ? (descriptionHeaderLength >= minAllowedHeaderWordCounts && descriptionHeaderLength <= maxAllowedHeaderWordCounts)
        : true

    const postFilesArray = post && post.post_files_array
    const postPicturesCheck = (
        postFilesArray ? (
            (postImg1Index !== -1
                ? postFilesArray[postImg1Index] ? (postImg1 === postFilesArray[postImg1Index].file ? true : (postImg1 ? postImg1Id : true)) : (postImg1 ? postImg1Id : true)
                : true) &&
            (postImg2Index !== -1
                ? postFilesArray[postImg2Index] ? (postImg2 === postFilesArray[postImg2Index].file ? true : (postImg2 ? postImg2Id : true)) : (postImg2 ? postImg2Id : true)
                : true) &&
            (postImg3Index !== -1
                ? postFilesArray[postImg3Index] ? (postImg3 === postFilesArray[postImg3Index].file ? true : (postImg3 ? postImg3Id : true)) : (postImg3 ? postImg3Id : true)
                : true)
        ) : (
            (postImg1 ? postImg1Id : true)
            && (postImg2 ? postImg2Id : true)
            && (postImg3 ? postImg3Id : true)
        )
    )
    const postMediaCheck =
        postFilesArray ? (
            (postMediaIndex !== -1 ?
                postFilesArray[postMediaIndex] ? (postMedia === postFilesArray[postMediaIndex].file ? true : (postMedia ? postMediaId : true)) : (postMedia ? postMediaId : true)
                : true)
        ) : (
            postMedia ? postMediaId : true
        )
    const postFileCheck =
        postFilesArray ? (
            (postFileIndex !== -1
                ? postFilesArray[postFileIndex] ? (postFile === postFilesArray[postFileIndex].file ? true : (postFile ? postFileId : true)) : (postFile ? postFileId : true)
                : true)
        ) : (
            postFile ? postFileId : true
        )
    const condition1 = (postType === constants.POST.POST_TYPE.POST)
        ? postImg1 || postImg2 || postImg3 || postMedia || descriptionCheck
        : postImg1 || postImg2 || postImg3 || postMedia || descriptionCheck || descriptionHeaderCheck
    const condition2 = postFile ? (descriptionCheck && descriptionHeaderCheck) : true
    const condition3 = postPicturesCheck && postMediaCheck && postFileCheck
    const condition4 = selectedProduct ? (descriptionCheck && descriptionHeaderCheck) : true
    return condition1 && condition2 && condition3 && condition4
  }

  _onSubmit = (e) => {
    const {isUpdate, hideEdit} = this.props
    const {isLoading} = this.state
    e.preventDefault()

    if (!isLoading) {
      if (isUpdate && hideEdit) {
        hideEdit()
      }
      this.setState({...this.state, isLoading: true})
      this._save()
    }
  }

  _autoGrow = () => {
    const scrollHeight = this.text.scrollHeight
    const description = this.text.innerText
    if (description.trim().length <= maxAllowedWordCounts)
      this.setState({...this.state, scrollHeight, description}, () => {
        const descriptionLength = description.trim().length
        if (descriptionLength === 0)
          this.setState({...this.state, descriptionClass: 'hide-message'})
        if (descriptionLength > 0 && descriptionLength < minAllowedWordCounts)
          this.setState({...this.state, descriptionClass: 'error-message'})
        if (descriptionLength >= minAllowedWordCounts && descriptionLength < (maxAllowedWordCounts - 26))
          this.setState({...this.state, descriptionClass: 'neutral-message'})
        if (descriptionLength > (maxAllowedWordCounts - 26) && descriptionLength < maxAllowedWordCounts)
          this.setState({...this.state, descriptionClass: 'warning-message'})
      })

    if ((scrollHeight > 250) && (scrollHeight !== this.state.scrollHeight) && (this.text.className !== 'post-component-textarea-open show-scroll')) {
      this.text.className = 'post-component-textarea-open show-scroll'
      setTimeout(() =>
              this.text.className = 'post-component-textarea-open hide-scroll'
          , 1000)
    }
  }

  _removeProduct = () => {
    this.setState({...this.state, selectedProduct: undefined})
  }

  render() {
    const {hideCreatePost, post, hideEdit, className, isUpdate, followers, exchanges, currentUserIdentity, currentUserMedia, currentUserName, translate, currentUserId} = this.props
    const {
      postImg1, postImg2, postImg3, open, attachMenu, labels, link, contactMenu, linkModal, postFile, postMedia,
      isLoading, profileLoaded, description, descriptionClass, descriptionHeaderClass, focused, addProductModal, selectedProduct, postType, descriptionHeader
    } = this.state
    const hasMediaClass = (postMedia || postImg1 || postImg2 || postImg3) ? 'hasMedia' : ''
    const postImagesLength = [postImg1, postImg2, postImg3].filter(img => img).length
    const allowSubmit = this._allowSubmitCheck()
    return (
        <form
            className={isUpdate ? ('post-component-edit-container ' + className) : ('post-component-container ' + className)}
            ref={e => this.form = e} onSubmit={this._onSubmit}>
          <div className={open ? 'post-component-header' : 'post-component-header-hide'}>
            {currentUserMedia && profileLoaded ?
                <img alt='profile' src={currentUserMedia} className='post-component-header-img'/>
                :
                <DefaultUserIcon className='post-component-header-img'/>
            }
            <div className={open ? 'post-not-collapse-username' : 'post-collapse-username'}>
              {currentUserName}
            </div>
            <div className={open ? 'post-type-create-container' : 'post-type-create-container-hide'}>
              <div className='post-type-flex-container'>
                <label className="container-checkmark">
                  <p className='post-type-text'>{translate['Type supply']}</p>
                  <input defaultChecked={post && post.post_type === constants.POST.POST_TYPE.SUPPLY} type="radio"
                         name="radio-step-1" ref={e => this.supplyChecked = e}
                         onClick={this._postTypeClick}/>
                  <span className="checkmark"/>
                </label>
                <label className="container-checkmark">
                  <p className='post-type-text'>{translate['Type demand']}</p>
                  <input defaultChecked={post && post.post_type === constants.POST.POST_TYPE.SUPPLY} type="radio"
                         name="radio-step-1" ref={e => this.demandChecked = e}
                         onClick={this._postTypeClick}/>
                  <span className="checkmark"/>
                </label>
              </div>
              <div className='create-post-close' onClick={hideCreatePost}>✕</div>
            </div>
            {isUpdate &&
            <div className='post-component-header-item'>
              <span className='post-edit-header-left'>{translate['Editing']}</span>
              <div className='post-edit-header-left-close pulse' onClick={hideEdit}>✕</div>
            </div>
            }
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
            <span className={descriptionHeaderClass + ' post-type-character'}
                  style={descriptionHeader.length > 0 && new RegExp('^[A-Za-z]*$').test(descriptionHeader[0]) ? {right: '6px'} : {left: '6px'}}>
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
                   descriptionHeader.length > 0 && new RegExp('^[A-Za-z]*$').test(descriptionHeader[0]) ?
                       {direction: 'ltr'} :
                       {direction: 'rtl'}
                 }
                 onBlur={this._handleBlurHeader}
            />
            <div onClick={() => this.headerText.focus()}
                 className={descriptionHeader.length > 0
                     ? 'post-placeholder-hide'
                     : (open) ? 'post-placeholder-open post-title-placeholder' : 'post-placeholder'}>
              {translate['Create post header placeholder']}
            </div>
          </div>
          <div className={'post-component-content ' + hasMediaClass}>
            <div className='post-component-description'>

              {descriptionClass &&
              <span className={descriptionClass + ' post-character'}
                    style={description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0]) ? {right: '6px'} : {left: '6px'}}>
                {description && description.trim().length + `/${maxAllowedWordCounts}`}
              </span>
              }
              <div
                  contentEditable={true}
                  content={isUpdate && post && post.post_description}
                  ref={e => this.text = e}
                  className={open ? 'post-component-textarea-open hide-scroll' : 'post-component-textarea'}
                  style={
                    description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0]) ?
                        {direction: 'ltr', padding: open || focused ? '13px 23px 9px 15px' : '8px 23px 9px 15px'} :
                        {direction: 'rtl', padding: open || focused ? '13px 15px 9px 23px' : '8px 15px 9px 23px'}
                  }
                  onBlur={this._handleBlurText}
                  onFocus={this._handleFocusText}
                  onKeyDown={this._handleCtrlEnter}
                  onKeyUp={this._autoGrow}
              />

              <div onClick={() => this.text.focus()}
                   className={this.text && this.text.innerText.length > 0 ? 'post-placeholder-hide' : open ? 'post-placeholder-open' : 'post-placeholder'}>
                {translate['Write your post']}
              </div>

              <div className={open || focused ? 'emoji-open' : 'emoji-close'}
                   style={description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0]) ? {right: '7px'} : {left: '7px'}}>
                <StickersMenu ltr={description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0])}
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
                translate={translate}
            />
          </div>

          {selectedProduct &&
          <div className='post-product-container'>
            <span onClick={this._removeProduct} className='remove-product pulse'>x</span>
            <ProductInfoView translate={translate} product={selectedProduct} ownerId={currentUserId}/>
          </div>
          }

          <div className={open ? 'post-component-footer' : 'post-component-footer-hide'}>

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
              <div style={{display: 'inline-block'}} onClick={this.handleAttach}>
                <AttachFileIcon className='post-component-footer-send-attach'/>
              </div>
              {isUpdate
                  ? <div className='buttons'>
                    <div onClick={hideEdit} className="post-component-footer-send-btn cancel-button">
                      {translate['Cancel']}
                    </div>
                    <button
                        type="submit"
                        disabled={!allowSubmit || isLoading}
                        className={allowSubmit && !isLoading
                            ? 'post-component-footer-send-btn'
                            : 'post-component-footer-send-btn-inactive'}>
                      {translate['Confirm']}
                    </button>
                  </div>
                  : <button
                      type="submit"
                      disabled={!allowSubmit || isLoading}
                      className={allowSubmit && !isLoading
                          ? 'post-component-footer-send-btn'
                          : 'post-component-footer-send-btn-inactive'}
                  >{translate['Send']}
                  </button>
              }

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
                  AttachMenuId={this.attachMenuId}
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
  const identityId = client.identity.content
  const identity = state.identities.list[identityId]
  const clientImgId = identity.profile_media

  const postImg1Id = state.temp.file[POST_IMG1_TEMP_KEY] || null
  const postImg2Id = state.temp.file[POST_IMG2_TEMP_KEY] || null
  const postImg3Id = state.temp.file[POST_IMG3_TEMP_KEY] || null
  const postMediaId = state.temp.file[POST_MEDIA_TEMP_KEY] || null
  const postFileId = state.temp.file[POST_FILE_TEMP_KEY] || null

  const {user_type} = state.auth.client
  const isUser = user_type === constants.USER_TYPES.USER
  const name = isUser
      ? identity.first_name + ' ' + identity.last_name
      : identity.nike_name

  return ({
    currentUserType: client.user_type,
    currentUserIdentity: identityId,
    currentUserId: identity.id,
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
    createComment: CommentActions.createComment,
    deleteFile: FileActions.deleteFile,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)