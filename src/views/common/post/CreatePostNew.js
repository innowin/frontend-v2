import React, {Component} from 'react'
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
import EditIcon from "../../../images/common/edit.svg"
import {createFileFunc} from "src/views/common/Functions"
import types from "../../../redux/actions/types"

const timeStamp = new Date().toISOString()
class CreatePostNew extends Component {
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
      search: '',
      context: false,
      pageX: 0,
      pageY: 0,
      placeholder: 'در زیست بوم باش ...',
      selectedText: '',
      postPhotos: [],
    }
  }

  componentDidMount() {
    const {actions} = this.props
    const {getFollowers} = actions
    getFollowers({
      followOwnerIdentity: this.props.currentUserIdentity,
      followOwnerType: this.props.currentUserType,
      followOwnerId: this.props.currentUserId
    })
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentDidUpdate(prevProps) {
    const {postsCountInThisPage} = this.props
    if (prevProps.postsCountInThisPage < postsCountInThisPage) {
      this._resetPost()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  _resetPost = () => {
    this.setState({...this.state, open: false, selected: 'post', postPhotos: []})
    this.text.innerText = ''
  }

  handleClickOutside = (event) => {
    const {postPhotos} = this.state
    const description = this.text.innerText


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


    if (this.setWrapperThirdRef && !this.setWrapperThirdRef.contains(event.target)) {
      if (this.state.context) {
        this.setState({...this.state, context: !this.state.context})
      }
    }


    if (!postPhotos && !description) this._resetPost()
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


  handleLabel(name) {
    let temp = {...this.state.labels}
    if (temp[name] === undefined) {
      if (name === 'دنبال کنندگان' || name === 'دنبال کنندگانِ دنبال کنندگان' || temp['عمومی'] === undefined)
        temp[name] = name
    }
    else {
      if (name !== 'دنبال کنندگان' && name !== 'دنبال کنندگانِ دنبال کنندگان')
        delete temp['عمومی']
      delete temp[name]
    }

    this.setState({...this.state, labels: {...temp}})

  }


  contextMenu = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      pageX: e.pageX,
      pageY: e.pageY,
      context: true,
      selectedText: window.getSelection().toString()
    })
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
    const description = this.text.innerText
    return {
      post_picture: postPhotoIds[0] || null,
      post_description: description,
      post_title: 'without title',
      post_type: selected,
      post_parent: postParentId,
      post_identity: currentUserIdentity,
      post_related_identity_image: currentUserImgId
    }
  }

  _formValidate = () => {
    // const {descriptionValidate} = this.state
    let result = true;
    const validates = [
      this.AttachPhotoInput.validate,
      // descriptionValidate
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break
      }
    }
    return result
  }

  _save = () => {
    const {actions, currentUserId, currentUserType, postParentId, postParentType} = this.props
    const {createPost, createFile} = actions
    const formValues = this._getValues()
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
    return createPost({
      formValues, postOwnerId: currentUserId, postOwnerType: currentUserType, postParentId, postParentType
    })
  }

  _onSubmit = (e) => {
    e.preventDefault();
    if (this._formValidate()) {
      this._save()
    }
    return false;
  }

  _handleBase64 = (fileString) => {
    const {postPhotos} = this.state
    this.setState({...this.state, postPhotos: [...postPhotos, fileString]})
  }

  _deletePicture = (i) => {
    const {postPhotos} = this.state
    const newPostPhotos = postPhotos.slice(0, i).concat(postPhotos.slice(i + 1))
    this.setState({...this.state, postPhotos: newPostPhotos})
  }


  render() {

    const followersArr = Object.values(this.props.followers).filter(follow => follow.follow_follower.id !== this.props.currentUserIdentity && follow.follow_follower.name.includes(this.state.search))
    const exchangesArr = Object.values(this.props.exchanges).filter(exchange => exchange.exchange_identity_related_exchange.name.includes(this.state.search))

    const {className, translate} = this.props
    const {postPhotos} = this.state
    const photoInputId = 'AttachPhotoInput'

    return (
      <form className={'post-component-container ' + className} onSubmit={this._onSubmit}>
        <div className='post-component-header'>
          <div>
            {this.props.currentUserMedia !== null && this.props.currentUserMedia !== undefined ?
              <img alt='profile' src={this.props.currentUserMedia} className='post-component-header-img'/>
              :
              <DefaultUserIcon width='45px' height='45px'/>
            }
            {this.props.currentUserName}
          </div>
          <div className='post-component-header-item'>
            <Share
              className={this.state.selected === 'post' ? "post-component-header-item-logo1" : "post-component-header-item-logo1-unselect"}
              onClick={this.handleSelectShare}/>
            <DemandIcon height="22px"
                        className={this.state.selected === 'demand' ? 'post-component-header-item-logo' : 'post-component-header-item-logo-unselect'}
                        onClickFunc={this.handleSelectDemand}/>
            <SupplyIcon height="18px"
                        className={this.state.selected === 'supply' ? 'post-component-header-item-logo2' : 'post-component-header-item-logo2-unselect'}
                        onClickFunc={this.handleSelectSupply}/>
          </div>
        </div>

        <div ref={e => this.text = e}
             className={this.state.open ? 'post-component-textarea-open' : 'post-component-textarea'}
             onContextMenu={this.contextMenu}
             onFocus={() => this.setState({...this.state, placeholder: ''})}
             contentEditable={true}
             onBlur={(e) => e.target.innerText === '' ?
               this.setState({...this.state, placeholder: translate['Be in zist boom'], open: false}) :
               this.setState({...this.state, open: true})}
             style={{color: this.state.placeholder.length > 0 ? '#BBBBBB' : 'black'}}
        >
          {this.state.placeholder}
        </div>

        <div className='post-component-footer'>

          <div className='post-component-footer-logo' onClick={this.handleContact}>?</div>
          <div className='post-component-footer-items-style-cont'>
            {
              Object.values(this.state.labels).map(label =>
                <div className='post-component-footer-items-style'>
                  <div className='post-component-footer-items-style-text'>{label}</div>
                  <div className='post-component-footer-items-style-close' onClick={() => this.handleLabel(label)}>✕
                  </div>
                </div>)
            }

            <div className='post-component-footer-items-style-hide'/>

            <div className='post-component-footer-send'>
              <div style={{display: 'inline-block'}} onClick={this.handleAttach}>
                <AttachFileIcon className='post-component-footer-send-attach'/>
              </div>
              <button type="submit" className='post-component-footer-send-btn'>ارسال</button>

              <div ref={e => this.setWrapperRef = e}
                   className={this.state.attachMenu ? 'post-component-footer-attach-menu-container' : "post-component-footer-attach-menu-container-hide"}>
                <div className='post-component-footer-attach-menu'>
                  <div className='explore-menu-items'>
                    <AttachFileIcon className='post-component-footer-logos'/>
                    فایل
                  </div>
                  <AttachFile
                    ref={e => this.AttachPhotoInput = e}
                    AttachButton={this.AttachPhotoButton}
                    inputId={photoInputId}
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

        </div>

        <div style={{clear: 'both'}}/>

        <div ref={e => this.setWrapperSecondRef = e}
             className={this.state.contactMenu ? 'post-component-footer-contact-menu-container' : "post-component-footer-contact-menu-container-hide"}>
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
                  'عمومی'.includes(this.state.search) ? <label className='post-component-footer-checkbox'>
                      <input type="checkbox" checked={this.state.labels['عمومی'] !== undefined}
                             onClick={() => this.handleLabel('عمومی')}/>
                      <span className='checkmark'/>
                      عمومی
                    </label>
                    : null
                }

                {
                  'دنبال کنندگان'.includes(this.state.search) ? <label className='post-component-footer-checkbox'>
                      <input type="checkbox" checked={this.state.labels['دنبال کنندگان'] !== undefined}
                             onClick={() => this.handleLabel('دنبال کنندگان')}/>
                      <span className='checkmark'/>
                      دنبال کنندگان
                    </label>
                    : null
                }

                {
                  'دنبال کنندگانِ دنبال کنندگان'.includes(this.state.search) ?
                    <label className='post-component-footer-checkbox'>
                      <input type="checkbox" checked={this.state.labels['دنبال کنندگانِ دنبال کنندگان'] !== undefined}
                             onClick={() => this.handleLabel('دنبال کنندگانِ دنبال کنندگان')}/>
                      <span className='checkmark'/>
                      دنبال کنندگانِ دنبال کنندگان
                    </label>
                    : null
                }
              </div>

              <div className='post-component-footer-contact-menu-content-title'
                   style={{display: exchangesArr.length > 0 ? 'block' : 'none'}}>بورس ها
              </div>

              <div className='post-component-footer-check-container'>
                {
                  exchangesArr.map(exchange =>
                    <label className='post-component-footer-checkbox'>
                      <input type="checkbox"
                             checked={this.state.labels[exchange.exchange_identity_related_exchange.name] !== undefined || this.state.labels['عمومی']}
                             onClick={() => this.handleLabel(exchange.exchange_identity_related_exchange.name)}/>
                      <span className='checkmark'/>
                      {exchange.exchange_identity_related_exchange.name}
                    </label>
                  )
                }
              </div>

              <div className='post-component-footer-contact-menu-content-title'
                   style={{display: followersArr.length > 0 ? 'block' : 'none'}}>دنبال کنندگان
              </div>

              <div className='post-component-footer-check-container'>
                {
                  followersArr.map(follow => {
                      return (
                        <label className='post-component-footer-checkbox'>
                          <input type="checkbox"
                                 checked={this.state.labels[follow.follow_follower.name] !== undefined || this.state.labels['عمومی']}
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

            <div style={{textAlign: 'left'}}>
              <button className='post-component-footer-cancel-btn'>لغو</button>

              <button className='post-component-footer-submit-btn'>ثبت</button>
            </div>

          </div>
        </div>

        {
          postPhotos.map((fileString, i) => {
              return (
                <div className="-fileBox">
                  <label htmlFor={photoInputId}>
                    <EditIcon className="edit-post-picture pulse"/>
                  </label>
                  <FontAwesome name="trash"
                               className='remove-post-picture pulse'
                               onClick={() => this._deletePicture(i)}
                  />
                  <img className="contain-img" src={fileString} alt="imagePreview"/>
                </div>
              )
            }
          )
        }


        <div ref={e => this.setWrapperThirdRef = e} className='post-component-context'
             style={{left: this.state.pageX, top: this.state.pageY, height: this.state.context ? '100px' : '0px'}}>
          <div className='post-component-context-items' onClick={this.handleEmail}>
            <FontAwesome name="envelope" style={{color: '#353535', width: '20px', fontSize: '13px'}}/>
            ایمیل
          </div>
          <div className='post-component-context-items' onClick={this.handlePhone}>
            <FontAwesome name="phone" style={{color: '#353535', width: '20px', fontSize: '15px'}}/>
            تلفن
          </div>
        </div>

      </form>
    )
  }

  handleEmail = () => {
    let email = 'mailto:' + this.state.selectedText
    let outEmail = `<a href=${email}>${this.state.selectedText}</a>`
    this.text.innerHTML = this.text.innerText.replace(this.state.selectedText, outEmail)
  }

  handlePhone = () => {
    let email = 'tel:' + this.state.selectedText
    let outEmail = `<a href=${email}>${this.state.selectedText}</a>`
    this.text.innerHTML = this.text.innerText.replace(this.state.selectedText, outEmail)
  }
}


const mapStateToProps = (state) => {

  const client = state.auth.client
  const clientImgId = (client.user_type === 'person') ? (client.profile.profile_media) : (
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
    currentUserName: client.user.first_name + ' ' + client.user.last_name,
    exchanges: state.common.exchangeMembership.list,
    followers: state.common.social.follows.list,
    postPhotoIds,
    translate: getMessages(state)
  })
}

const
  mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
      getFollowers: socialActions.getFollowers,
      createPost: PostActions.createPost,
      createFile: FileActions.createFile
    }, dispatch)
  })
export default connect(mapStateToProps, mapDispatchToProps)(CreatePostNew)