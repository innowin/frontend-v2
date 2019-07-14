// @flow
import * as React from "react"
import * as PropTypes from "prop-types"

import {DefaultImage} from "src/images/icons"
import type {postType} from "src/consts/flowTypes/common/post"
import constants from "src/consts/constants"
import PostSlider from "./PostSlider"

type postImageProps = {
  translate: { [string]: string },
  post: postType,
  extendedView?: boolean,
}
type postImageState = {
  pictureLoaded: null | boolean,
  pictureArrayLoaded: [null | boolean, null | boolean, null | boolean],
  postPicturesSlider: boolean,
  imageIndex: number,
}

class PostImage extends React.Component<postImageProps, postImageState> {
  static propTypes = {
    translate: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    extendedView: PropTypes.bool,
  }

  constructor(props: postImageProps) {
    super(props)
    this.state = {
      pictureLoaded: null,
      pictureArrayLoaded: [null, null, null],
      postPicturesSlider: false,
      imageIndex: 0,
    }
    const self: any = this

    self.handleRetry = this.handleRetry.bind(this)
    self._handleRetryArray = this._handleRetryArray.bind(this)
  }

  componentDidMount() {
    const {post} = this.props
    if (post && post.post_media) {
      const {post} = this.props
      let postFilesArray = []
      if (post) {
        postFilesArray = post.post_media.slice(0, 3)
      }
      let pictures = []
      if (postFilesArray.length > 0) {
        for (let i = 0; i < postFilesArray.length; i++) {
          if (postFilesArray[i].type !== constants.CREATE_FILE_TYPES.FILE) {
            pictures.push(new Image())
            let picture = pictures[i]
            picture.src = postFilesArray[i].file
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
        }
      }
      else {
        this.setState({...this.state, pictureArrayLoaded: [null, null, null]})
      }
    }
  }

  componentWillReceiveProps(nextProps: postImageProps): void {
    if (this.props.post !== nextProps.post) {
      const {post} = nextProps
      if (post && post.post_media) {
        let postFilesArray = []
        if (post) {
          postFilesArray = post.post_media.slice(0, 3)
        }
        let pictures = []
        if (postFilesArray.length > 0) {
          for (let i = 0; i < postFilesArray.length; i++) {
            if (postFilesArray[i].type !== constants.CREATE_FILE_TYPES.FILE) {
              pictures.push(new Image())
              let picture = pictures[i]
              picture.src = postFilesArray[i].file
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
          }
        }
        else {
          this.setState({...this.state, pictureArrayLoaded: [null, null, null]})
        }
      }
    }
  }

  handleRetry() {

  }

  _handleRetryArray(fileIndex: number) {
    let newPictureArrayLoaded = this.state.pictureArrayLoaded
    newPictureArrayLoaded[fileIndex] = null
    this.setState({...this.state, pictureArrayLoaded: newPictureArrayLoaded}, () => {
      const {post} = this.props
      if (post && post.post_files_array) {
        const {post} = this.props
        let postFilesArray = []
        if (post) {
          postFilesArray = post.post_media && post.post_media.filter(picture => picture.type === null || picture.type === constants.CREATE_FILE_TYPES.IMAGE)
        }
        if (postFilesArray.length > 0) {
          let picture = new Image()
          picture.src = postFilesArray[fileIndex].file
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
        }
        else {
          this.setState({...this.state, pictureArrayLoaded: [false, false, false]})
        }
      }
    })
  }

  closeImageSlider() {
    document.body.style.overflowY = "auto"
    const {postPicturesSlider} = this.state
    postPicturesSlider && this.setState({
      ...this.state,
      postPicturesSlider: false,
    })
  }

  openImageSlider(imageIndex) {
    document.body.style.overflowY = "hidden"
    const {postPicturesSlider} = this.state
    !postPicturesSlider && this.setState({
      ...this.state,
      postPicturesSlider: true,
      imageIndex,
    })
  }

  render() {
    const {post, extendedView} = this.props
    const {pictureArrayLoaded, postPicturesSlider, imageIndex} = this.state
    let postFilesArray = [], picturesClass = "", postPicturesLength = 0

    if (post) {
      postFilesArray = post.post_media && post.post_media.slice(0, 3).filter(picture => picture.type === null || picture.type === constants.CREATE_FILE_TYPES.IMAGE)
      if (postFilesArray) {
        postPicturesLength = postFilesArray.length
        picturesClass = "onePicture"
        if (postPicturesLength === 2) picturesClass = "twoPictures"
        if (postPicturesLength === 3) picturesClass = "threePictures"
      }
    }

    return (
        <React.Fragment>
          {postFilesArray && postPicturesLength > 0
              ? <div className={extendedView && postPicturesLength === 1 ? "post-image-container" : ("pictures-section " + picturesClass)}>
                {postFilesArray.map((postPictureElement, i) => (
                    <div className='image-container' key={i + "pictures-section"}>
                      <div className='post-image-container'>
                        <div
                            className={pictureArrayLoaded[i] === true ? "post-image-loading-effect" : "post-image-loading"}>
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
                        <img src={postPictureElement.file} alt='عکس پست'
                             onClick={() => this.openImageSlider(i)}
                             ref={e => this.container = e}
                             className={pictureArrayLoaded[i] === true ? "post-image-effect" : "post-image"}/>
                      </div>
                    </div>
                ))}
              </div>
              : null
          }
          {postFilesArray.length > 0 && <PostSlider images={postFilesArray} modalIsOpen={postPicturesSlider} imageIndex={imageIndex}
                                                    closeModal={() => this.closeImageSlider()}/>}
        </React.Fragment>
    )
  }
}

export default PostImage
