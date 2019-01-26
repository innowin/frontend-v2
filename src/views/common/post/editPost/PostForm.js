import {Component} from 'react'
import PropTypes from 'prop-types'
import {SelectComponent} from '../../SelectComponent'
import {TextInput} from '../../inputs/TextInput'
import {TextareaInput} from '../../inputs/TextareaInput'
import {CheckBox} from '../../inputs/CheckBox'
import {FileInput} from '../../inputs/FileInput'
import React from 'react'
import DefaultUserIcon from '../createPost'
import {AttachFileIcon, DefaultImage} from 'src/images/icons'
import AttachMenu from '../createPost/attachMenu'
// import constants from 'src/consts/constants'

type postFormProps = {
  onSubmit: Function,
  postParent?: number,
  postIdentity: number,
  post?: object,
  deleteFile: Function,
  removeImageArray: Array<{ fileId: number, fileParentId: number }>,
}
type postFormStates = {
  pictureArrayLoaded: [null | boolean, null | boolean, null | boolean],
  attachMenu: boolean,
}

// const minAllowedWordCounts = 5
// const maxAllowedWordCounts = 4096
// const minAllowedHeaderWordCounts = 5
// const maxAllowedHeaderWordCounts = 70

export class PostForm extends Component<postFormProps, postFormStates> {
  static defaultProps = {
    postParent: null,
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    postParent: PropTypes.number,
    postIdentity: PropTypes.number.isRequired,
    post: PropTypes.object,
    deleteFile: PropTypes.func.isRequired,
    removeImageArray: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      pictureArrayLoaded: [null, null, null],
      attachMenu: false,
    }
  }

  componentDidMount(): void {
    const {post} = this.props
    document.addEventListener('mousedown', this.handleClickOutside)

    if (post && post.post_picture_array) {
      const {post} = this.props
      let postPictureArray
      if (post) {
        postPictureArray = post.post_picture_array
      }
      let pictures = []
      if (postPictureArray && postPictureArray.length > 0) {
        for (let i = 0; i < postPictureArray.length; i++) {
          pictures.push(new Image())
          let picture = pictures[i]
          picture.src = postPictureArray[i].file
          picture.onload = () => {
            let newPictureArrayLoaded = this.state.pictureArrayLoaded
            newPictureArrayLoaded[i] = true
            this.setState({...this.state, pictureArrayLoaded: newPictureArrayLoaded})
          }
          picture.onerror = () => {
            let newPictureArrayLoaded = this.state.pictureArrayLoaded
            newPictureArrayLoaded[i] = false
            this.setState({...this.state, pictureArrayLoaded: newPictureArrayLoaded})
          }
        }
      } else {
        this.setState({...this.state, pictureArrayLoaded: [null, null, null]})
      }
      this.POST_MEDIA_TEMP_KEY = "POST_MEDIA" + post.id
      this.POST_FILE_TEMP_KEY = "POST_FILE" + post.id
      this.POST_IMG1_TEMP_KEY = "POST_IMG1" + post.id
      this.POST_IMG2_TEMP_KEY = "POST_IMG2" + post.id
      this.POST_IMG3_TEMP_KEY = "POST_IMG3" + post.id
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }


  _handleRetryArray(fileIndex: number) {
    let newPictureArrayLoaded = this.state.pictureArrayLoaded
    newPictureArrayLoaded[fileIndex] = null
    this.setState({...this.state, pictureArrayLoaded: newPictureArrayLoaded}, () => {
      const {post} = this.props
      if (post && post.post_picture_array) {
        const {post} = this.props
        let postPictureArray
        if (post) {
          postPictureArray = post.post_picture_array
        }
        if (postPictureArray && postPictureArray.length > 0) {
          let picture = new Image()
          picture.src = postPictureArray[fileIndex].file
          picture.onload = () => {
            let newPictureArrayLoaded = this.state.pictureArrayLoaded
            newPictureArrayLoaded[fileIndex] = true
            this.setState({...this.state, pictureArrayLoaded: newPictureArrayLoaded})
          }
          picture.onerror = () => {
            let newPictureArrayLoaded = this.state.pictureArrayLoaded
            newPictureArrayLoaded[fileIndex] = false
            this.setState({...this.state, pictureArrayLoaded: newPictureArrayLoaded})
          }
        } else {
          this.setState({...this.state, pictureArrayLoaded: [false, false, false]})
        }
      }
    })
  }

  _getValues = () => {
    const media = this.postPictureInput.getFile()
    const mediaId = media ? media.id : null
    const {postParent, postIdentity} = this.props
    return {
      post_type: this.postTypeInput.getValue(),
      post_title: this.postTitleInput.getValue(),
      post_description: this.postDescriptionInput.getValue(),
      post_pinned: this.postPinnedInput.getValue(),
      post_picture: mediaId,
      post_parent: postParent,
      post_identity: postIdentity
    }
  }

  _formValidate = () => {
    let result = true
    const validates = [
      this.postTypeInput.validate(),
      this.postTitleInput.validate(),
      this.postDescriptionInput.validate(),
      this.postPinnedInput.validate(),
      this.postPictureInput.validate()
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  handleAttach = () => {
    this.setState({...this.state, attachMenu: !this.state.attachMenu})
  }

  handleClickOutside = (event) => {
    const {attachMenu} = this.state

    if (!event.target.closest("#edit-post-attach-menu-box")) {
      if (attachMenu) {
        this.setState({...this.state, attachMenu: false})
      }
    }
  }

  render() {
    const {onSubmit, currentUserMedia, currentUserName, translate, hideEdit, deleteFile, removeImageArray} = this.props
    const {attachMenu} = this.state
    const removeImageArrayId = removeImageArray.map(removeImage => removeImage.fileId)
    const post = this.props.post || {}
    const options = [
      {value: 'post', label: 'نما'},
      {value: 'supply', label: 'عرضه'},
      {value: 'demand', label: 'تقاضا'}
    ]

    const {pictureArrayLoaded} = this.state

    let postPictureArray = [], picturesClass = '', postPicturesLength = 0
    if (post) {
      postPictureArray = post.post_picture_array
      postPictureArray = postPictureArray.filter(postPicture => !removeImageArrayId.includes(postPicture.id))
      if (postPictureArray) {
        postPicturesLength = postPictureArray.length
        picturesClass = "onePicture"
        if (postPicturesLength === 2) picturesClass = "twoPictures"
        if (postPicturesLength === 3) picturesClass = "threePictures"
      }
    }

    return (
        <form onSubmit={onSubmit} className="edit-form w-90">

          {/*// display none*/}
          <SelectComponent
              name="post_type"
              label={translate['Post type'] + ': '}
              options={options}
              required
              value={post.post_type}
              ref={postTypeInput => {
                this.postTypeInput = postTypeInput
              }}
              className="col-12 form-group display-none"
          />
          <TextInput
              label={translate['Post title'] + ': '}
              name="post_title"
              value={post.post_title}
              required
              ref={postTitleInput => {
                this.postTitleInput = postTitleInput
              }}
              className="display-none"
          />

          <CheckBox
              label={translate['Post pinned'] + ': '}
              name="post_pinned"
              value={post.post_pinned}
              ref={postPinnedInput => {
                this.postPinnedInput = postPinnedInput
              }}
          />

          <FileInput
              label={translate['Post picture'] + ': '}
              mediaId={post.post_picture}
              ref={postPictureInput => {
                this.postPictureInput = postPictureInput
              }}
          />
          {/*//end of display nones*/}

          <div className='post-component-header'>
            {currentUserMedia ?
                <img alt='profile' src={currentUserMedia} className='post-edit-header-img'/>
                :
                <DefaultUserIcon className='post-edit-header-img'/>
            }
            <div className='post-not-collapse-username'>
              {currentUserName}
            </div>
            <div className='post-component-header-item'>
              <span className='post-edit-header-left'>{translate['Editing']}</span>
              <div className='post-edit-header-left-close pulse' onClick={hideEdit}>✕</div>
            </div>
          </div>


          <TextareaInput
              name="post_description"
              label={translate['Post description'] + ': '}
              value={post.post_description}
              ref={postDescriptionInput => {
                this.postDescriptionInput = postDescriptionInput
              }}
          />

          <div>
            {postPictureArray && postPicturesLength > 0
                ? <div className={"pictures-section " + picturesClass}>
                  {postPictureArray.map((postPictureElement, i) => (
                      <div className='image-container' key={i + "pictures-section"}>
                        <div className='post-image-container'>
                          <div
                              className={pictureArrayLoaded[i] === true ? 'post-image-loading-effect' : 'post-image-loading'}>
                            <DefaultImage className='default-image'/>
                            {
                              pictureArrayLoaded[i] === false ?
                                  <div className='post-retry-image'>
                                    مشکل در بارگذاری عکس.
                                    <span className='post-retry-image-click'
                                          onClick={() => this._handleRetryArray(i)}> تلاش مجدد </span>
                                  </div>
                                  :
                                  <div className='bright-line'/>
                            }
                          </div>
                          {pictureArrayLoaded[i] === true &&
                          <span onClick={() => deleteFile({
                            fileId: postPictureElement.id,
                            fileParentId: post.id
                          })} className='remove-file pulse'>x</span>
                          }
                          <img src={postPictureElement.file} alt='عکس پست'
                               className={pictureArrayLoaded[i] === true ? 'post-image-effect' : 'post-image'}/>
                        </div>

                        {/*<img src={postPictureElement.file} alt={"عکس پست" + i}/>*/}
                      </div>
                  ))}
                </div>
                : null
            }
          </div>

          <div className='post-component-footer-send'>
            {/*<div className='post-component-footer-link' ref={e => this.link = e}>{link}</div>*/}
            <div style={{display: 'inline-block'}} onClick={this.handleAttach}>
              <AttachFileIcon className='post-component-footer-send-attach'/>
            </div>
            <div className='edit-post-attach-menu-container'>
              <AttachMenu
                  attachMenu={attachMenu}
                  handleFile={this._handlePostFile}
                  handleMedia={this._handlePostMedia}
                  handlePictures={this._handlePostPictures}
                  // postImagesLength={postImagesLength}
                  // postMediaExist={Boolean(postMedia)}
                  // postFileExist={Boolean(postFile)}
                  // postLinkExist={Boolean(link)}
                  linkModalFunc={this._linkModalFunc}
                  addProductModalFunc={this._addProductModalFunc}
                  AttachMenuId="edit-post-attach-menu-box"
                  translate={translate}
              />
            </div>

            <button type="button" className='post-edit-footer-cancel-btn'
                    onClick={hideEdit}>{translate['Cancel']}</button>

            <button type="submit" className='post-edit-footer-send-btn'>ثبت ویرایش</button>

            {/*<button type="button" className="btn btn-outline-danger mr-auto" onClick={this.props._showConfirm}>*/}
            {/*{__('Delete')}*/}
            {/*</button>*/}

          </div>


        </form>
    )
  }
}
