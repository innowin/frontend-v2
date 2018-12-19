import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import AttachFileIcon from 'src/images/common/attachFileNew_svg'
import DemandIcon from 'src/images/common/demand_svg'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import PostActions from 'src/redux/actions/commonActions/postActions'
import Share from 'src/images/common/share'
import DefaultUserIcon from 'src/images/defaults/defaultUser_svg'
import socialActions from 'src/redux/actions/commonActions/socialActions'
import SupplyIcon from 'src/images/common/supply_svg'
import {getMessages} from 'src/redux/selectors/translateSelector'
import CommentActions from 'src/redux/actions/commonActions/commentActions'
import {createFileFunc} from 'src/views/common/Functions'
import types from 'src/redux/actions/types'
import AttachMenu from './attachMenu'
import ContactMenu from './contactMenu'
import LinkModal from './linkModal'
import ViewAttachedFiles from './viewAttachedFiles'
import {ContactMenuIcon} from 'src/images/icons'
import StickersMenu from '../../components/StickersMenu'
import AddProductModal from './addProductModal'
import ProductInfoView from '../../contributions/ProductInfoView'

const timeStamp = +new Date()


class CreatePost extends Component {
  static defaultProps = {
    className: '',
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
      selected: 'post',
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
      commentBody: 'comment-body',
      placeholder: '',
      selectedText: '',
      postPictures: [],
      postFile: '',
      postMedia: '',
      link: '',
      description: '',
      descriptionClass: '',
      profileLoaded: false,
      savingPost: false,
      focused: false,
      keys: [],
      selectedProduct: undefined,
      selectedProductId: undefined,
    }
  }


  _resetPost = () => {
    this.setState({
      ...this.state,
      open: false,
      selected: 'post',
      postPictures: [],
      postFile: '',
      postMedia: '',
      link: '',
      description: '',
      descriptionClass: 'hide-message',
      labels: {},
      selectedProduct: undefined,
      selectedProductId: undefined,
    })
  }

  handleClickOutside = (event) => {
    const {attachMenu, contactMenu, linkModal, addProductModal, postPictures, postFile, postMedia, link, description, labels, savingPost, open} = this.state
    const needReset = !savingPost && !description && !postPictures && !postFile && !postMedia && !link && labels === {}

    if (!event.target.closest('#create-post-attach-menu-box')) {
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
      if (open && (description.length === 0)) {
        this.setState({...this.state, open: false})
      }
    }

    if (needReset) this._resetPost()
  }

  handleSelectShare = () => {
    this.setState({...this.state, selected: 'post'})
  }

  handleSelectDemand = () => {
    this.setState({...this.state, selected: 'demand'})
  }

  handleSelectSupply = () => {
    this.setState({...this.state, selected: 'supply'})
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

  _deletePicture = (i) => {
    const {postPictures} = this.state
    const newPostPictures = postPictures.slice(0, i).concat(postPictures.slice(i + 1))
    this.setState({...this.state, postPictures: newPostPictures})
  }

  _handleChangeText = (e) => {
    const description = e.target.value
    if (description.trim().length <= 4096)
      this.setState({...this.state, description}, () => checkCharacter(description))
    const checkCharacter = (description) => {
      const descriptionLength = description.trim().length
      if (descriptionLength === 0)
        this.setState({...this.state, descriptionClass: 'hide-message'})
      if (descriptionLength > 0 && descriptionLength < 5)
        this.setState({...this.state, descriptionClass: 'error-message'})
      if (descriptionLength >= 5 && descriptionLength < 4070)
        this.setState({...this.state, descriptionClass: 'neutral-message'})
      if (descriptionLength > 4070 && descriptionLength < 4096)
        this.setState({...this.state, descriptionClass: 'warning-message'})
    }
  }

  handleEmoji = (emoji) => {
    this.setState({...this.state, open: true}, () => {
      this.text.focus()
      if (this.text.selectionStart) {
        let x = this.text.selectionStart
        let y = this.text.selectionEnd
        this.text.value = this.text.value.substring(0, x) + emoji + this.text.value.substring(y, this.text.value.length)
        this.text.selectionStart = parseInt(x, 10) + emoji.length
        this.text.selectionEnd = parseInt(y, 10) + emoji.length
      } else {
        this.text.value += emoji
      }

      const description = this.text.value
      if (description.trim().length <= 4070)
        this.setState({...this.state, description}, () => checkCharacter(description))
      const checkCharacter = (description) => {
        const descriptionLength = description.trim().length
        if (descriptionLength === 0)
          this.setState({...this.state, descriptionClass: 'hide-message'})
        if (descriptionLength > 0 && descriptionLength < 5)
          this.setState({...this.state, descriptionClass: 'error-message'})
        if (descriptionLength >= 5 && descriptionLength < 4070)
          this.setState({...this.state, descriptionClass: 'neutral-message'})
        if (descriptionLength > 4070 && descriptionLength < 4096)
          this.setState({...this.state, descriptionClass: 'warning-message'})
      }
    })
  }

  _handleBlurText = () => {
    this.setState({
      ...this.state,
      descriptionClass: 'hide-message',
      focused: false
    })
  }

  _deleteFile = () => {
    this.setState({...this.state, postFile: ''})
  }

  _deleteMedia = () => {
    this.setState({...this.state, postMedia: ''})
  }


  _getValues = () => {
    const {selected, link, description, selectedProduct} = this.state
    const {currentUserIdentity, postParentId, currentUserImgId, postPictureIds} = this.props
    const post_link = link.trim() !== '' ? link : null
    const postPicturesIds_ = postPictureIds.slice(0, 3)[0] || null // just three pictures allowable
    return {
      post_picture: postPicturesIds_,
      post_description: description,
      post_title: 'without title',
      post_type: selected,
      post_parent: postParentId,
      post_identity: currentUserIdentity,
      post_related_identity_image: currentUserImgId,
      post_related_product: selectedProduct ? selectedProduct.id : '',
      post_link,
    }
  }

  _formValidate = () => {
    const {description} = this.state
    const descriptionLength = description.trim().length
    const descriptionError = descriptionLength < 5 || descriptionLength > 4096
    let result = true
    //Attached files don't required check validation before save.because don't add to attached files if be error
    const validates = [
      descriptionError
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  _onSubmitControlEnter() {
    if (this._formValidate()) {
      this._preSave()
    }
  }

  _handleShiftEnter = (e) => {
    if (e.keyCode === 17 || e.keyCode === 13) {
      let keys = this.state.keys.slice()
      keys[e.keyCode] = true
      this.setState({...this.state, keys: keys})
      if (e.keyCode === 13 && keys[13] && keys[17]) {
        e.preventDefault()
        this.setState({...this.state, keys: []}, () => {
          this._onSubmitControlEnter()
        })
      }
    } else this.setState({...this.state, keys: []})
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

  _preSave = () => {
    this.setState({...this.state, savingPost: true})
    const {postPictures} = this.state
    const {actions} = this.props
    const {createFile} = actions
    const nextActionTypesForPosPictures = types.COMMON.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionDataForPostPictures = {tempFileKeyName: timeStamp}
    const fileIdKey = 'fileId'
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

  componentDidUpdate(prevProps, prevState) {
    const {postsCountInThisPage, postPictureIds} = this.props
    const {postPictures, savingPost, link} = this.state

    if (prevState.link !== link) {
      this._showLink(link)
    }

    if (prevProps.postsCountInThisPage < postsCountInThisPage) {
      this._resetPost()
    }

    if (savingPost && postPictures.length === postPictureIds.length) {
      this._save()
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
      postPictures, open, attachMenu, selected, labels, link, contactMenu, linkModal, postFile, postMedia,
      profileLoaded, description, descriptionClass, focused, addProductModal, selectedProduct
    } = this.state
    const hasMediaClass = (postMedia || (postPictures.length > 0)) ? 'hasMedia' : ''
    return (
        <form className={'post-component-container ' + className} ref={e => this.form = e} onSubmit={this._onSubmit}>
          <div className={open ? 'post-component-header' : 'post-component-header-hide'}>
            {currentUserMedia && profileLoaded ?
                <img alt='profile' src={currentUserMedia} className='post-component-header-img'/>
                :
                <DefaultUserIcon className='post-component-header-img'/>
            }
            <div className={open ? 'post-not-collapse-username' : 'post-collapse-username'}>
              {currentUserName}
            </div>
            <div className='post-component-header-item'>
              <Share
                  className={selected === 'post' ? 'post-component-header-item-logo1' : 'post-component-header-item-logo1-unselect'}
                  onClick={this.handleSelectShare}/>
              <DemandIcon height="22px"
                          className={selected === 'demand' ? 'post-component-header-item-logo' : 'post-component-header-item-logo-unselect'}
                          onClickFunc={this.handleSelectDemand}/>
              <SupplyIcon height="18px"
                          className={selected === 'supply' ? 'post-component-header-item-logo2' : 'post-component-header-item-logo2-unselect'}
                          onClickFunc={this.handleSelectSupply}/>
            </div>
          </div>

          <div className={'post-component-content ' + hasMediaClass}>
            <div className='post-component-description'>
              {descriptionClass &&
              <span className={descriptionClass + ' post-character'}
                    style={description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0]) ? {right: '6px'} : {left: '6px'}}>
                {description && description.trim().length + '/4096'}
              </span>
              }
              <textarea
                  ref={e => this.text = e}
                  className={open ? 'post-component-textarea-open' : 'post-component-textarea'}
                  style={
                    description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0]) ?
                        {direction: 'ltr', padding: open || focused ? '13px 23px 9px 15px' : '7px 23px 9px 15px'} :
                        {direction: 'rtl', padding: open || focused ? '13px 15px 9px 23px' : '7px 15px 9px 23px'}
                  }
                  placeholder='مسئله خود را بنویسید...'
                  value={description}
                  onBlur={this._handleBlurText}
                  onChange={this._handleChangeText}
                  onFocus={this._handleFocusText}
                  onKeyDown={this._handleShiftEnter}
              />

              <div className={open || focused ? 'emoji-open' : 'emoji-close'} style={description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0]) ? {right: '7px'} : {left: '7px'}}>
                <StickersMenu ltr={description.length > 0 && new RegExp('^[A-Za-z]*$').test(description[0])} output={this.handleEmoji}/>
              </div>

            </div>

            <ViewAttachedFiles
                postPictures={postPictures}
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

          <div className={open ? 'post-component-footer' : 'post-component-footer-hide'}>

            {/*should be back in future !*/}
            {/*<ContactMenuIcon className="post-component-footer-contact-menu-icon" onClickFunc={this.handleContact}/>*/}
            <div className="post-component-footer-contact-menu-icon"/>

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

                <div className='post-component-footer-link' ref={e => this.link = e}>{link}</div>

                <div style={{display: 'inline-block'}} onClick={this.handleAttach}>
                  <AttachFileIcon className='post-component-footer-send-attach'/>
                </div>
                <button type="submit"
                        className={description.length > 4 ? 'post-component-footer-send-btn' : 'post-component-footer-send-btn-inactive'}>ارسال
                </button>
                <AttachMenu
                    attachMenu={attachMenu}
                    handleFile={fileString =>
                        this.setState({...this.state, attachMenu: false, postFile: fileString})
                    }
                    handleMedia={fileString =>
                        this.setState({...this.state, attachMenu: false, postMedia: fileString})
                    }
                    handlePictures={fileString =>
                        this.setState({...this.state, attachMenu: false, postPictures: [...postPictures, fileString]})
                    }
                    postPicturesLength={postPictures.length}
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

const mapStateToProps = (state) => {

  const client = state.auth.client
  const clientImgId = (client.user_type === 'person') ? (client.profile.profile_media) : (
      (client.organization && client.organization.organization_logo) || null
  )

  const userId = (client.organization && client.organization.id) || (client.user && client.user.id)

  const tempPostPictures = state.temp.file[timeStamp]
  const postPictureIds = tempPostPictures ? (Array.isArray(tempPostPictures) ? tempPostPictures : [tempPostPictures]) : []

  return ({
    currentUserType: client.user_type,
    currentUserIdentity: client.identity.content,
    currentUserId: userId,
    currentUserImgId: clientImgId,
    currentUserMedia: (state.common.file.list[clientImgId] && state.common.file.list[clientImgId].file) || null,
    currentUserName: client.user.first_name + ' ' + client.user.last_name,
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