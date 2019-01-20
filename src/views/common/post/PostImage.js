// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import {DefaultImage} from 'src/images/icons'
import type {postType} from 'src/consts/flowTypes/common/post'
import type {fileType} from 'src/consts/flowTypes/common/fileType'

type postImageProps = {
  translate: { [string]: string },
  post: postType,
  userImage?: fileType,
  userImageId: number,
  extendedView?: boolean,
  fileList: {},
}
type postImageState = {
  pictureLoaded: null | boolean,
  pictureArrayLoaded: [null | boolean, null | boolean, null | boolean],
}

class PostImage extends React.Component<postImageProps, postImageState> {
  static propTypes = {
    translate: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    userImage: PropTypes.object,
    userImageId: PropTypes.number,
    extendedView: PropTypes.bool,
    fileList: PropTypes.object,
  }

  constructor(props: postImageProps) {
    super(props)
    this.state = {
      pictureLoaded: null,
      pictureArrayLoaded: [null, null, null],
    }
    const self: any = this

    self.handleRetry = this.handleRetry.bind(this)
    self._handleRetryArray = this._handleRetryArray.bind(this)
  }

  componentDidMount() {
    const {extendedView, post} = this.props

    if (post && post.post_picture) {
      const {post, fileList} = this.props
      let postPicture, postPictureId
      if (post) {
        postPicture = post.post_picture
        postPictureId = post.post_picture
      }
      let picture = new Image()

      picture.src = !extendedView
          ? (postPicture ? postPicture.file : '')
          : (postPictureId ? (fileList[postPictureId] ? fileList[postPictureId].file : '') : '')
      picture.onload = () => {
        this.setState({...this.state, pictureLoaded: true})
      }
      picture.onerror = () => {
        this.setState({...this.state, pictureLoaded: false})
      }
    }
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
    }
  }

  componentWillReceiveProps(nextProps: postImageProps): void {
    if (this.props.post !== nextProps.post) {
      const {post, extendedView, fileList} = nextProps
      if (post && post.post_picture) {
        let postPicture, postPictureId
        if (post) {
          postPicture = post.post_picture
          postPictureId = post.post_picture
        }
        let picture = new Image()
        picture.src = !extendedView
            ? (postPicture ? postPicture.file : '')
            : (postPictureId ? (fileList[postPictureId] ? fileList[postPictureId].file : '') : '')
        picture.onload = () => {
          this.setState({...this.state, pictureLoaded: true})
        }
        picture.onerror = () => {
          this.setState({...this.state, pictureLoaded: false})
        }
      }
      if (post && post.post_picture_array) {
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
          this.setState({...this.state, pictureArrayLoaded: [false, false, false]})
        }
      }
    }
  }

  handleRetry() {
    this.setState({...this.state, pictureLoaded: null}, () => {
      const {post} = this.props
      if (post && post.post_picture) {
        let picture = new Image()
        picture.src = post.post_picture.file
        picture.onload = () => {
          this.setState({...this.state, pictureLoaded: true})
        }
        picture.onerror = () => {
          this.setState({...this.state, pictureLoaded: false})
        }
      }
    })
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

  render() {
    const {post, extendedView, fileList} = this.props
    const {pictureLoaded, pictureArrayLoaded} = this.state
    let postPicture, postPictureId
    let postPictureArray = [], picturesClass = '', postPicturesLength = 0

    if (post) {
      postPicture = post.post_picture
      postPictureId = post.post_picture
      postPictureArray = post.post_picture_array
      if (postPictureArray) {
        postPicturesLength = postPictureArray.length
        picturesClass = "onePicture"
        if (postPicturesLength === 2) picturesClass = "twoPictures"
        if (postPicturesLength === 3) picturesClass = "threePictures"
      }
    }
    const postImageUrl =
        !extendedView
            ? (postPicture ? postPicture.file : null)
            : (postPictureId ? (fileList[postPictureId] ? fileList[postPictureId].file : null) : null)

    return (
        <React.Fragment>
          {postImageUrl
              ? <div className='post-image-container'>
                <div
                    className={pictureLoaded === true ? 'post-image-loading-effect' : 'post-image-loading'}>
                  <DefaultImage className='default-image'/>
                  {
                    pictureLoaded === false ?
                        <div className='post-retry-image'>
                          مشکل در بارگذاری عکس.
                          <span className='post-retry-image-click'
                                onClick={this.handleRetry}> تلاش مجدد </span>
                        </div>
                        :
                        <div className='bright-line'/>
                  }
                </div>
                <img src={postImageUrl} width={'100%'} alt='عکس پست'
                     className={pictureLoaded === true ? 'post-image-effect' : 'post-image'}/>
              </div>
              : null
          }

          {postPictureArray && postPicturesLength > 0
              ? <div className={extendedView && postPicturesLength === 1 ? 'post-image-container' : ("pictures-section " + picturesClass)}>
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
                        <img src={postPictureElement.file} alt='عکس پست'
                             className={pictureArrayLoaded[i] === true ? 'post-image-effect' : 'post-image'}/>
                      </div>

                      {/*<img src={postPictureElement.file} alt={"عکس پست" + i}/>*/}
                    </div>
                ))}
              </div>
              : null
          }
        </React.Fragment>
    )
  }
}

export default PostImage
