import React from 'react'
import * as PropTypes from 'prop-types'
import {DefaultImage} from 'src/images/icons'
import constants from 'src/consts/constants'
import PostSlider from './PostSlider'

class PostImage extends React.PureComponent {
  static propTypes = {
    translate: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    extendedView: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      pictureArrayLoaded: [null, null, null],
      postPicturesSlider: false,
      imageIndex: 0,
    }
    this.closeImageSlider = this.closeImageSlider.bind(this)
  }

  componentDidMount() {
    const {post} = this.props
    if (post.post_media) {
      let postFilesArray = post.post_media.filter(picture => picture.type === null || picture.type === constants.CREATE_FILE_TYPES.IMAGE).slice(0, 3)
      let pictures = []
      if (postFilesArray.length > 0) {
        for (let i = 0; i < postFilesArray.length; i++) {
          if (postFilesArray[i].type !== constants.CREATE_FILE_TYPES.FILE) {
            pictures.push(new Image())
            let picture = pictures[i]
            picture.src = postFilesArray[i].file
            picture.onload = () => {
              let newPictureArrayLoaded = [...this.state.pictureArrayLoaded]
              newPictureArrayLoaded[i] = true
              this.setState({...this.state, pictureArrayLoaded: [...newPictureArrayLoaded]})
            }
            picture.onerror = () => {
              let newPictureArrayLoaded = [...this.state.pictureArrayLoaded]
              newPictureArrayLoaded[i] = false
              this.setState({...this.state, pictureArrayLoaded: [...newPictureArrayLoaded]})
            }
          }
        }
      }
      else this.setState({...this.state, pictureArrayLoaded: [null, null, null]})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {post} = nextProps
    if (this.props.post !== post && post.post_media) {
      let postFilesArray = post.post_media.filter(picture => picture.type === null || picture.type === constants.CREATE_FILE_TYPES.IMAGE).slice(0, 3)
      let pictures = []
      if (postFilesArray.length > 0) {
        for (let i = 0; i < postFilesArray.length; i++) {
          if (postFilesArray[i].type !== constants.CREATE_FILE_TYPES.FILE) {
            pictures.push(new Image())
            let picture = pictures[i]
            picture.src = postFilesArray[i].file
            picture.onload = () => {
              let newPictureArrayLoaded = [...this.state.pictureArrayLoaded]
              newPictureArrayLoaded[i] = true
              this.setState({...this.state, pictureArrayLoaded: [...newPictureArrayLoaded]})
            }
            picture.onerror = () => {
              let newPictureArrayLoaded = [...this.state.pictureArrayLoaded]
              newPictureArrayLoaded[i] = false
              this.setState({...this.state, pictureArrayLoaded: [...newPictureArrayLoaded]})
            }
          }
        }
      }
      else this.setState({...this.state, pictureArrayLoaded: [null, null, null]})
    }
  }

  _handleRetryArray(fileIndex) {
    let newPictureArrayLoaded = [...this.state.pictureArrayLoaded]
    newPictureArrayLoaded[fileIndex] = null
    this.setState({...this.state, pictureArrayLoaded: [...newPictureArrayLoaded]}, () => {
      const {post} = this.props
      let postFilesArray = post.post_media.filter(picture => picture.type === null || picture.type === constants.CREATE_FILE_TYPES.IMAGE).slice(0, 3)
      let picture = new Image()
      picture.src = postFilesArray[fileIndex].file
      picture.onload = () => {
        let newPictureArrayLoaded = [...this.state.pictureArrayLoaded]
        newPictureArrayLoaded[fileIndex] = true
        this.setState({...this.state, pictureArrayLoaded: [...newPictureArrayLoaded]})
      }
      picture.onerror = () => {
        let newPictureArrayLoaded = [...this.state.pictureArrayLoaded]
        newPictureArrayLoaded[fileIndex] = false
        this.setState({...this.state, pictureArrayLoaded: [...newPictureArrayLoaded]})
      }
    })
  }

  closeImageSlider() {
    const {postPicturesSlider} = this.state
    if (postPicturesSlider) {
      document.body.style.overflowY = 'auto'
      this.setState({...this.state, postPicturesSlider: false})
    }
  }

  openImageSlider(imageIndex) {
    const {postPicturesSlider} = this.state
    if (!postPicturesSlider) {
      document.body.style.overflowY = 'hidden'
      this.setState({...this.state, postPicturesSlider: true, imageIndex})
    }
  }

  render() {
    const {post, extendedView} = this.props
    const {pictureArrayLoaded, postPicturesSlider, imageIndex} = this.state
    const postFilesArray = post.post_media ? post.post_media.filter(picture => picture.type === null || picture.type === constants.CREATE_FILE_TYPES.IMAGE).slice(0, 3) : []
    const postPicturesLength = postFilesArray.length

    if (postPicturesLength > 0) {

      let picturesClass = 'onePicture'
      if (postPicturesLength === 2) picturesClass = 'twoPictures'
      else if (postPicturesLength === 3) picturesClass = 'threePictures'
      return (
          <div className={extendedView && postPicturesLength === 1 ? 'post-image-container' : 'pictures-section ' + picturesClass}>
            {
              postFilesArray.map((postPictureElement, i) =>
                  <div className='image-container' key={i + 'pictures-section'}>
                    <div className='post-image-container'>
                      <div className={pictureArrayLoaded[i] === true ? 'post-image-loading-effect' : 'post-image-loading'}>
                        <DefaultImage className='default-image'/>
                        {
                          pictureArrayLoaded[i] === false ?
                              <div className='post-retry-image'>
                                مشکل در بارگذاری عکس.
                                <span className='post-retry-image-click' onClick={this._handleRetryArray.bind(this, i)}> تلاش مجدد </span>
                              </div>
                              :
                              <div className='bright-line'/>
                        }
                      </div>
                      <img src={postPictureElement.file} alt='عکس پست' onClick={this.openImageSlider.bind(this, i)} className={pictureArrayLoaded[i] ? 'post-image-effect' : 'post-image'}/>
                    </div>
                  </div>,
              )
            }
            <PostSlider images={postFilesArray} modalIsOpen={postPicturesSlider} imageIndex={imageIndex} closeModal={this.closeImageSlider}/>
          </div>
      )
    }
    else return null
  }
}

export default PostImage
